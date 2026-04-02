// ============================================================
// IoT Hive Stand — ESP32 Firmware
// ============================================================
// Sensor flow: Read HX711 → connect Wi-Fi → POST → deep sleep
// Battery strategy: read sensors BEFORE Wi-Fi (radios off)
// Multi-device: MAC-based auto-config from devices.h
// OTA: Pull-based — checks version URL, self-flashes if newer
// Offline: LittleFS caching with RTC time tracking
// ============================================================

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <esp_bt.h>
#include <esp_mac.h>
#include <esp_wifi.h>
#include <HX711.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Preferences.h>
#include <nvs_flash.h>
#include <LittleFS.h>
#include <Update.h>
#include "config.h"
#include "devices.h"

// ----- Firmware Version (for OTA) -----
#define FIRMWARE_VERSION "1.0.0"

// ----- Active Device (resolved from MAC at boot) -----
const DeviceConfig* activeDevice = nullptr;
char deviceMAC[18] = {0};  // "AA:BB:CC:DD:EE:FF"

// ----- Deep Sleep -----
constexpr uint64_t SLEEP_DURATION_US = 15ULL * 60ULL * 1000000ULL; // 15 minutes

// ----- Wi-Fi -----
constexpr unsigned long FAST_CONNECT_TIMEOUT_MS = 3000;  // 3s for cached BSSID/channel
constexpr unsigned long FULL_SCAN_TIMEOUT_MS    = 12000; // 12s for full scan fallback

// ----- HX711 Load Cell -----
constexpr int HX711_DT_PIN  = 16;
constexpr int HX711_SCK_PIN = 4;
constexpr float DEFAULT_CALIBRATION_FACTOR = -22050.0; // Calibrated 2026-04-01 with 1kg known weight
constexpr int HX711_SAMPLES = 10;         // Average 10 readings for stability

// ----- DS18B20 Temperature Sensor -----
constexpr int DS18B20_PIN = 5;
OneWire oneWire(DS18B20_PIN);
DallasTemperature tempSensor(&oneWire);

HX711 scale;

// ----- Battery Voltage (ADC via voltage divider) -----
constexpr int BATTERY_PIN = 34;
constexpr float DIVIDER_RATIO = 2.0;   // Two 100kΩ resistors = halves the voltage
constexpr float ADC_REF_VOLTAGE = 3.3; // ESP32 ADC reference
constexpr int ADC_MAX = 4095;          // 12-bit ADC

// ----- OLED Display (SSD1306, I2C, 128×64) -----
constexpr int OLED_WIDTH  = 128;
constexpr int OLED_HEIGHT = 64;
constexpr int OLED_SDA    = 21;
constexpr int OLED_SCL    = 22;
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

// ----- Button (GPIO 33, active LOW with internal pull-up) -----
constexpr int BUTTON_PIN = 33;
constexpr unsigned long DEBOUNCE_MS      = 50;
constexpr unsigned long DOUBLE_PRESS_MS  = 400;  // Max gap between presses for double-press
constexpr unsigned long LONG_PRESS_MS    = 2000;  // Hold duration for long-press

// ----- Calibration (NVS) -----
Preferences prefs;
float calibrationFactor = DEFAULT_CALIBRATION_FACTOR;
long tareOffset = 0;                              // HX711 raw offset (empty scale = 0 kg)
constexpr float KNOWN_WEIGHT_KG = 1.0;           // 1kg bag of sugar
constexpr float VERIFICATION_TOLERANCE_KG = 0.05; // ±50g pass threshold

// ----- Button press type enum -----
enum class PressType { NONE, SINGLE, DOUBLE, LONG };

// ----- RTC Memory (survives deep sleep) -----
RTC_DATA_ATTR int bootCount = 0;
RTC_DATA_ATTR uint8_t savedBSSID[6] = {0};   // Router MAC address
RTC_DATA_ATTR int32_t savedChannel  = 0;     // Wi-Fi channel (1-13)
RTC_DATA_ATTR bool    hasCachedAP   = false;  // True after first successful connect
RTC_DATA_ATTR time_t  lastKnownUTC  = 0;     // Last successful NTP/server time
RTC_DATA_ATTR int32_t missedCycles  = 0;     // Consecutive offline wake cycles

// ----- LittleFS Offline Cache -----
constexpr const char* CACHE_FILE = "/readings.jsonl";
constexpr int SLEEP_MINUTES = 15;

/// Kill Bluetooth radio immediately — saves ~50mA.
void killBluetooth() {
    btStop();
    esp_bt_controller_disable();
}

/// Configure static IP from the active device's registry entry.
void configureStaticIP() {
    IPAddress ip(activeDevice->ip[0], activeDevice->ip[1], activeDevice->ip[2], activeDevice->ip[3]);
    IPAddress gateway(GATEWAY_IP);
    IPAddress subnet(SUBNET_MASK);
    IPAddress dns(DNS_IP);
    WiFi.config(ip, gateway, subnet, dns);
}

/// Wait for Wi-Fi connection up to timeoutMs. Returns true if connected.
bool waitForConnect(unsigned long timeoutMs) {
    unsigned long deadline = millis() + timeoutMs;
    while (WiFi.status() != WL_CONNECTED) {
        if (millis() >= deadline) return false;
        delay(10);
    }
    return true;
}

/// Two-phase Wi-Fi connect:
///   Phase 1 (cached): BSSID + channel → 3s timeout
///   Phase 2 (fallback): full scan → 12s timeout
/// Always updates the cache on success. Returns true if connected.
bool connectWiFi() {
    unsigned long t0 = millis();

    WiFi.mode(WIFI_STA);
    configureStaticIP();

    // --- Phase 1: Fast connect using cached AP ---
    if (hasCachedAP) {
        Serial.printf("Fast (ch%d)...", savedChannel);
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD, savedChannel, savedBSSID, true);

        if (waitForConnect(FAST_CONNECT_TIMEOUT_MS)) {
            Serial.printf(" OK %s (%lums)\n", WiFi.localIP().toString().c_str(), millis() - t0);
            return true;
        }

        // Fast connect failed — router probably changed channel
        Serial.printf(" stale (%lums). ", millis() - t0);
        hasCachedAP = false;
        WiFi.disconnect(true);
        delay(50); // Brief settle before retry
    }

    // --- Phase 2: Full scan fallback ---
    unsigned long t1 = millis();
    Serial.print("Full scan...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    if (!waitForConnect(FULL_SCAN_TIMEOUT_MS)) {
        Serial.printf(" FAIL (%lums total)\n", millis() - t0);
        return false;
    }

    unsigned long connectTime = millis() - t0;
    Serial.printf(" OK %s (%lums, scan %lums)\n",
        WiFi.localIP().toString().c_str(), connectTime, millis() - t1);

    // Cache the new BSSID and channel for next boot
    memcpy(savedBSSID, WiFi.BSSID(), 6);
    savedChannel = WiFi.channel();
    hasCachedAP = true;
    Serial.printf("Cached AP: ch%d BSSID=%02X:%02X:%02X:%02X:%02X:%02X\n",
        savedChannel,
        savedBSSID[0], savedBSSID[1], savedBSSID[2],
        savedBSSID[3], savedBSSID[4], savedBSSID[5]);

    return true;
}

/// Read weight from HX711. Powers up sensor, reads, powers down.
float readWeight() {
    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);

    // Wait for first data ready
    if (!scale.wait_ready_timeout(2000)) {
        Serial.println("HX711 NOT READY");
        scale.power_down();
        return 0.0;
    }

    // Discard first reading — HX711 needs one read cycle to settle after power-up
    scale.read();

    // Wait for second (stable) data
    if (!scale.wait_ready_timeout(1000)) {
        Serial.println("HX711 NOT READY (2nd)");
        scale.power_down();
        return 0.0;
    }

    scale.set_scale(calibrationFactor);
    if (tareOffset != 0) scale.set_offset(tareOffset);
    float raw = scale.get_units(HX711_SAMPLES);
    scale.power_down();

    // Guard against saturation
    if (raw <= -8388600.0 || raw >= 8388600.0) {
        Serial.printf("HX711 saturated: %.0f — returning 0\n", raw);
        return 0.0;
    }

    Serial.printf("HX711: %.2f kg (%d samples)\n", raw, HX711_SAMPLES);
    return raw;
}

/// Read temperature from DS18B20. Returns DEVICE_DISCONNECTED_C (-127) on failure.
float readTemperature() {
    tempSensor.begin();
    tempSensor.setResolution(12);           // 12-bit = 0.0625°C precision, ~750ms conversion
    tempSensor.setWaitForConversion(true);  // Block until conversion complete
    tempSensor.requestTemperatures();
    float tempC = tempSensor.getTempCByIndex(0);

    if (tempC == DEVICE_DISCONNECTED_C) {
        Serial.println("DS18B20 NOT FOUND");
    } else {
        Serial.printf("DS18B20: %.2f°C\n", tempC);
    }
    return tempC;
}

/// Read battery voltage via the voltage divider on Pin 34.
/// Returns the actual battery voltage (before the divider).
float readBatteryVoltage() {
    // Take multiple samples and average to reduce ADC noise
    long sum = 0;
    for (int i = 0; i < 16; i++) {
        sum += analogRead(BATTERY_PIN);
        delay(2);
    }
    float avgAdc = sum / 16.0;
    float voltage = (avgAdc / ADC_MAX) * ADC_REF_VOLTAGE * DIVIDER_RATIO;
    Serial.printf("Battery: %.2fV (ADC avg: %.0f)\n", voltage, avgAdc);
    return voltage;
}

/// Convert battery voltage to percentage (18650 LiPo curve).
/// 4.2V = 100%, 3.0V = 0%, non-linear approximation.
int batteryPercentage(float voltage) {
    if (voltage >= 4.2) return 100;
    if (voltage <= 3.0) return 0;
    // Simplified piecewise approximation for 18650
    if (voltage >= 4.0) return 80 + (int)((voltage - 4.0) / 0.2 * 20);
    if (voltage >= 3.7) return 30 + (int)((voltage - 3.7) / 0.3 * 50);
    return (int)((voltage - 3.0) / 0.7 * 30);
}

/// Build JSON payload with sensor data and device identity.
String buildPayload(float weight, float tempC, float batteryV) {
    JsonDocument doc;
    doc["Weight"]         = weight;
    doc["InternalTemp"]   = (tempC != DEVICE_DISCONNECTED_C) ? tempC : 0.0;
    doc["BatteryVoltage"] = batteryV;
    doc["HiveHum"]        = 0;
    doc["LegTemp"]        = 0.0;
    doc["HiveId"]         = activeDevice->hiveId;
    doc["DeviceMAC"]      = deviceMAC;
    doc["DeviceName"]     = activeDevice->deviceName;
    doc["FirmwareVersion"] = FIRMWARE_VERSION;

    String json;
    serializeJson(doc, json);
    return json;
}

/// POST JSON payload to Power Automate. Returns HTTP status code.
int sendToCloud(const String& payload) {
    unsigned long t0 = millis();

    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient http;
    http.begin(client, INGEST_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(30000);

    int httpCode = http.POST(payload);
    unsigned long sendTime = millis() - t0;

    if (httpCode > 0) {
        Serial.printf("POST %d (%lums)\n", httpCode, sendTime);
        http.getString(); // Drain response
    } else {
        Serial.printf("POST FAIL: %s (%lums)\n", http.errorToString(httpCode).c_str(), sendTime);
    }

    http.end();
    return httpCode;
}

// ============================================================
// LittleFS Offline Cache
// ============================================================

/// Initialise LittleFS. Call once in setup().
bool initLittleFS() {
    if (!LittleFS.begin(true)) {  // true = format on first use
        Serial.println("LittleFS mount FAILED");
        return false;
    }
    Serial.println("LittleFS ready");
    return true;
}

/// Build a JSON payload with an estimated timestamp for offline caching.
String buildTimestampedPayload(float weight, float tempC, float batteryV) {
    JsonDocument doc;
    doc["Weight"]         = weight;
    doc["InternalTemp"]   = (tempC != DEVICE_DISCONNECTED_C) ? tempC : 0.0;
    doc["BatteryVoltage"] = batteryV;
    doc["HiveHum"]        = 0;
    doc["LegTemp"]        = 0.0;
    doc["HiveId"]         = activeDevice->hiveId;
    doc["DeviceMAC"]      = deviceMAC;
    doc["DeviceName"]     = activeDevice->deviceName;
    doc["FirmwareVersion"] = FIRMWARE_VERSION;

    // Estimate timestamp from last known UTC + missed cycles
    if (lastKnownUTC > 0) {
        time_t estimated = lastKnownUTC + ((missedCycles + 1) * SLEEP_MINUTES * 60);
        char isoTime[25];
        struct tm* t = gmtime(&estimated);
        strftime(isoTime, sizeof(isoTime), "%Y-%m-%dT%H:%M:%SZ", t);
        doc["Timestamp"] = isoTime;
    }

    String json;
    serializeJson(doc, json);
    return json;
}

/// Save a reading to LittleFS when Wi-Fi is unavailable.
void saveReadingToFlash(float weight, float tempC, float batteryV) {
    File f = LittleFS.open(CACHE_FILE, FILE_APPEND);
    if (!f) {
        Serial.println("CACHE: Failed to open file for append");
        return;
    }
    String line = buildTimestampedPayload(weight, tempC, batteryV);
    f.println(line);
    f.close();
    missedCycles++;
    Serial.printf("CACHE: Saved to flash (%d cached)\n", missedCycles);
}

/// Upload all cached readings from LittleFS, then delete the cache file.
/// Returns the number of successfully uploaded readings.
int uploadCachedReadings() {
    if (!LittleFS.exists(CACHE_FILE)) return 0;

    File f = LittleFS.open(CACHE_FILE, FILE_READ);
    if (!f) return 0;

    int total = 0, success = 0;
    while (f.available()) {
        String line = f.readStringUntil('\n');
        line.trim();
        if (line.length() == 0) continue;
        total++;

        int status = sendToCloud(line);
        if (status >= 200 && status < 300) {
            success++;
        } else {
            Serial.printf("CACHE: Failed to upload reading %d (HTTP %d)\n", total, status);
        }
        delay(500);  // Brief pause between POSTs to avoid throttling
    }
    f.close();

    if (success == total) {
        LittleFS.remove(CACHE_FILE);
        Serial.printf("CACHE: All %d readings uploaded, file deleted\n", success);
    } else {
        Serial.printf("CACHE: %d/%d uploaded — keeping file for retry\n", success, total);
    }

    missedCycles = 0;
    return success;
}

/// Get the count of cached readings (for display/serial reporting).
int getCachedCount() {
    if (!LittleFS.exists(CACHE_FILE)) return 0;
    File f = LittleFS.open(CACHE_FILE, FILE_READ);
    if (!f) return 0;
    int count = 0;
    while (f.available()) {
        String line = f.readStringUntil('\n');
        line.trim();
        if (line.length() > 0) count++;
    }
    f.close();
    return count;
}

// ============================================================
// OTA Firmware Update (Pull-based)
// ============================================================

/// Compare two semver strings (e.g. "1.2.3"). Returns:
///   -1 if a < b, 0 if equal, 1 if a > b.
int compareSemver(const char* a, const char* b) {
    int aMaj = 0, aMin = 0, aPat = 0;
    int bMaj = 0, bMin = 0, bPat = 0;
    sscanf(a, "%d.%d.%d", &aMaj, &aMin, &aPat);
    sscanf(b, "%d.%d.%d", &bMaj, &bMin, &bPat);
    if (aMaj != bMaj) return (aMaj < bMaj) ? -1 : 1;
    if (aMin != bMin) return (aMin < bMin) ? -1 : 1;
    if (aPat != bPat) return (aPat < bPat) ? -1 : 1;
    return 0;
}

/// Check for a newer firmware version and self-update if available.
/// Call only when Wi-Fi is connected.
void checkOTA() {
#ifdef OTA_VERSION_URL
    Serial.printf("OTA: Checking for updates (current v%s)...\n", FIRMWARE_VERSION);

    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient http;

    // Step 1: Fetch remote version string
    http.begin(client, OTA_VERSION_URL);
    http.setTimeout(10000);
    int code = http.GET();
    if (code != 200) {
        Serial.printf("OTA: Version check failed (HTTP %d)\n", code);
        http.end();
        return;
    }
    String remoteVer = http.getString();
    remoteVer.trim();
    http.end();

    if (compareSemver(remoteVer.c_str(), FIRMWARE_VERSION) <= 0) {
        Serial.printf("OTA: Up to date (remote v%s)\n", remoteVer.c_str());
        return;
    }

    Serial.printf("OTA: New version v%s available! Downloading...\n", remoteVer.c_str());

    // Step 2: Download and flash the binary
    http.begin(client, OTA_BINARY_URL);
    http.setTimeout(60000);
    code = http.GET();
    if (code != 200) {
        Serial.printf("OTA: Binary download failed (HTTP %d)\n", code);
        http.end();
        return;
    }

    int contentLength = http.getSize();
    if (contentLength <= 0) {
        Serial.println("OTA: Invalid content length");
        http.end();
        return;
    }

    if (!Update.begin(contentLength)) {
        Serial.printf("OTA: Not enough space (%d bytes needed)\n", contentLength);
        http.end();
        return;
    }

    WiFiClient* stream = http.getStreamPtr();
    size_t written = Update.writeStream(*stream);
    http.end();

    if (written != (size_t)contentLength) {
        Serial.printf("OTA: Write mismatch (%d/%d)\n", written, contentLength);
        Update.abort();
        return;
    }

    if (!Update.end()) {
        Serial.printf("OTA: Finalize failed: %s\n", Update.errorString());
        return;
    }

    Serial.printf("OTA: Success! v%s -> v%s. Rebooting...\n", FIRMWARE_VERSION, remoteVer.c_str());
    delay(500);
    ESP.restart();
#endif
}

/// Kill all radios and enter deep sleep.
void enterDeepSleep() {
    Serial.flush();
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
    esp_wifi_stop();

    // Wake on timer OR button press (GPIO 33, active LOW)
    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
    esp_sleep_enable_ext0_wakeup((gpio_num_t)BUTTON_PIN, 0);  // 0 = wake on LOW
    esp_deep_sleep_start();
}

// ============================================================
// NVS Calibration Helpers
// ============================================================

/// Load calibration factor and tare offset from NVS.
void loadCalibration() {
    nvs_flash_init();
    prefs.begin("hivescale", false);  // read-write to create namespace if needed
    calibrationFactor = prefs.getFloat("calFactor", DEFAULT_CALIBRATION_FACTOR);
    tareOffset = prefs.getLong("tareOffset", 0);
    prefs.end();
    Serial.printf("Cal factor: %.1f | Tare offset: %ld\n", calibrationFactor, tareOffset);
}

/// Save calibration factor to NVS (persists across reboots).
void saveCalibration(float newFactor) {
    prefs.begin("hivescale", false);
    prefs.putFloat("calFactor", newFactor);
    prefs.end();
    calibrationFactor = newFactor;
    Serial.printf("Calibration saved: %.1f\n", newFactor);
}

/// Save tare offset to NVS (persists across reboots).
void saveTareOffset(long offset) {
    prefs.begin("hivescale", false);
    prefs.putLong("tareOffset", offset);
    prefs.end();
    tareOffset = offset;
    Serial.printf("Tare offset saved: %ld\n", offset);
}

// ============================================================
// OLED Display Helpers
// ============================================================

bool oledReady = false;

/// Initialise the OLED display. Call once.
void initOLED() {
    Wire.begin(OLED_SDA, OLED_SCL);
    if (display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        oledReady = true;
        display.clearDisplay();
        display.setTextColor(SSD1306_WHITE);
        display.display();
    } else {
        Serial.println("OLED init failed");
    }
}

/// Show a title line (yellow zone) and up to 4 content lines (blue zone).
/// Yellow band = rows 0–15, Blue band = rows 16–63.
void oledShow(const char* title, const char* line1 = nullptr,
              const char* line2 = nullptr, const char* line3 = nullptr,
              const char* line4 = nullptr) {
    if (!oledReady) return;
    display.clearDisplay();
    display.setTextSize(1);
    // Title in yellow band (centered vertically in 16px zone)
    display.setCursor(0, 4);
    display.println(title);
    // Content in blue band (starts at row 18, 12px line spacing)
    if (line1) { display.setCursor(0, 18); display.println(line1); }
    if (line2) { display.setCursor(0, 30); display.println(line2); }
    if (line3) { display.setCursor(0, 42); display.println(line3); }
    if (line4) { display.setCursor(0, 54); display.println(line4); }
    display.display();
}

/// Turn off the OLED display.
void oledOff() {
    if (!oledReady) return;
    display.clearDisplay();
    display.display();
    display.ssd1306_command(SSD1306_DISPLAYOFF);
}

// ============================================================
// Button Press Detection
// ============================================================

/// Detect button press type. Blocks until press sequence is resolved.
/// Returns NONE if no press within timeoutMs.
PressType detectPress(unsigned long timeoutMs = 5000) {
    // If button is still held from wake, wait for release first
    if (digitalRead(BUTTON_PIN) == LOW) {
        unsigned long holdStart = millis();
        while (digitalRead(BUTTON_PIN) == LOW) {
            if (millis() - holdStart >= LONG_PRESS_MS) {
                // User held the wake button for 2s+ = LONG press
                while (digitalRead(BUTTON_PIN) == LOW) delay(10);
                return PressType::LONG;
            }
            delay(5);
        }
        delay(DEBOUNCE_MS);
        // Wake button was a short press — check for double-press
        unsigned long releaseTime = millis();
        while (millis() - releaseTime < DOUBLE_PRESS_MS) {
            if (digitalRead(BUTTON_PIN) == LOW) {
                delay(DEBOUNCE_MS);
                while (digitalRead(BUTTON_PIN) == LOW) delay(10);
                return PressType::DOUBLE;
            }
            delay(5);
        }
        return PressType::SINGLE;
    }

    // Button already released — wait for a new press
    unsigned long deadline = millis() + timeoutMs;
    while (digitalRead(BUTTON_PIN) == HIGH) {
        if (millis() >= deadline) return PressType::NONE;
        delay(5);
    }
    delay(DEBOUNCE_MS);

    // Measure hold duration
    unsigned long pressStart = millis();
    while (digitalRead(BUTTON_PIN) == LOW) {
        if (millis() - pressStart >= LONG_PRESS_MS) {
            while (digitalRead(BUTTON_PIN) == LOW) delay(10);
            return PressType::LONG;
        }
        delay(5);
    }

    // Short press released — wait for possible second press
    unsigned long releaseTime = millis();
    while (millis() - releaseTime < DOUBLE_PRESS_MS) {
        if (digitalRead(BUTTON_PIN) == LOW) {
            delay(DEBOUNCE_MS);
            while (digitalRead(BUTTON_PIN) == LOW) delay(10);
            return PressType::DOUBLE;
        }
        delay(5);
    }

    return PressType::SINGLE;
}

/// Wait for a single button press (blocking). Used within modes.
void waitForButtonPress() {
    // Wait for release if already pressed
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    delay(DEBOUNCE_MS);
    // Wait for press
    while (digitalRead(BUTTON_PIN) == HIGH) delay(10);
    delay(DEBOUNCE_MS);
    // Wait for release
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    delay(DEBOUNCE_MS);
}

// ============================================================
// Read weight helper (non-destructive, no power_down)
// ============================================================

/// Read current weight using the active calibration factor.
/// Scale must already be initialised. Does NOT power down.
float readWeightLive() {
    if (!scale.wait_ready_timeout(1000)) return 0.0;
    scale.set_scale(calibrationFactor);
    if (tareOffset != 0) scale.set_offset(tareOffset);
    return scale.get_units(HX711_SAMPLES);
}

// ============================================================
// Mode: Status Display (Single Press)
// ============================================================

/// Show current readings on OLED for 30 seconds, then return.
/// Page 1 (0-10s): Weight, Temp, Battery
/// Page 2 (10-30s): IP, Wi-Fi RSSI, Boot count, Cal factor
void modeStatusDisplay() {
    Serial.println("MODE: Status Display");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();  // Discard first

    char line1[32], line2[32], line3[32], line4[32];

    unsigned long startTime = millis();
    unsigned long endTime = startTime + 30000;
    int currentPage = 0;

    while (millis() < endTime) {
        int page = (millis() - startTime < 10000) ? 0 : 1;

        if (page == 0) {
            float w = readWeightLive();
            tempSensor.begin();
            tempSensor.setWaitForConversion(true);
            tempSensor.requestTemperatures();
            float t = tempSensor.getTempCByIndex(0);
            float bv = readBatteryVoltage();
            int bp = batteryPercentage(bv);

            snprintf(line1, sizeof(line1), "Weight: %.2f kg", w);
            snprintf(line2, sizeof(line2), "Temp:   %.1f C", (t != DEVICE_DISCONNECTED_C) ? t : 0.0);
            snprintf(line3, sizeof(line3), "Bat:    %.2fV  %d%%", bv, bp);
            snprintf(line4, sizeof(line4), "Boot #%d", bootCount);

            oledShow("HIVE STATUS", line1, line2, line3, line4);
        } else {
            if (page != currentPage) {
                // Fetch Wi-Fi info once on page switch
                WiFi.mode(WIFI_STA);
                WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
                unsigned long wifiStart = millis();
                while (WiFi.status() != WL_CONNECTED && millis() - wifiStart < 5000) delay(50);
            }

            if (WiFi.status() == WL_CONNECTED) {
                int rssi = WiFi.RSSI();
                const char* strength = (rssi > -50) ? "Excellent" :
                                       (rssi > -60) ? "Good" :
                                       (rssi > -70) ? "Fair" : "Weak";
                snprintf(line1, sizeof(line1), "IP: %s", WiFi.localIP().toString().c_str());
                snprintf(line2, sizeof(line2), "Wi-Fi: %ddBm %s", rssi, strength);
            } else {
                snprintf(line1, sizeof(line1), "IP: Not connected");
                snprintf(line2, sizeof(line2), "Wi-Fi: No signal");
            }
            snprintf(line3, sizeof(line3), "%s", deviceMAC);
            snprintf(line4, sizeof(line4), "Cal: %.1f", calibrationFactor);

            oledShow("DEVICE INFO", line1, line2, line3, line4);
        }
        currentPage = page;

        // Exit early on button press
        if (digitalRead(BUTTON_PIN) == LOW) {
            delay(DEBOUNCE_MS);
            while (digitalRead(BUTTON_PIN) == LOW) delay(10);
            break;
        }
        delay(500);
    }

    if (WiFi.status() == WL_CONNECTED) {
        WiFi.disconnect(true);
        WiFi.mode(WIFI_OFF);
    }
    scale.power_down();
    oledOff();
}

// ============================================================
// Mode: Verification (Double Press)
// ============================================================

/// Verify scale accuracy with a known 1kg weight.
void modeVerification() {
    Serial.println("MODE: Verification");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();  // Discard first

    // Step 1: Record baseline weight
    oledShow("VERIFY SCALE", "Recording baseline...", "Do NOT touch hive");
    delay(2000);

    float baseline = 0;
    for (int i = 0; i < 3; i++) {
        baseline += readWeightLive();
        delay(200);
    }
    baseline /= 3.0;

    char baseStr[32];
    snprintf(baseStr, sizeof(baseStr), "Baseline: %.2f kg", baseline);

    // Step 2: Prompt to add 1kg
    oledShow("VERIFY SCALE", baseStr, "", "Place 1kg sugar on", "Press button when done");
    Serial.printf("Verification baseline: %.2f kg\n", baseline);
    waitForButtonPress();

    // Step 3: Read new weight
    oledShow("VERIFY SCALE", "Reading...", "Do NOT touch hive");
    delay(1000);

    float loaded = 0;
    for (int i = 0; i < 3; i++) {
        loaded += readWeightLive();
        delay(200);
    }
    loaded /= 3.0;

    float delta = loaded - baseline;
    float error = delta - KNOWN_WEIGHT_KG;
    bool pass = (fabs(error) <= VERIFICATION_TOLERANCE_KG);

    char deltaStr[32], errorStr[32], resultStr[32];
    snprintf(deltaStr, sizeof(deltaStr), "Delta:  %.2f kg", delta);
    snprintf(errorStr, sizeof(errorStr), "Error:  %.3f kg", error);
    snprintf(resultStr, sizeof(resultStr), "%s (tol +/-%.0fg)", pass ? "** PASS **" : "** FAIL **", VERIFICATION_TOLERANCE_KG * 1000);

    oledShow("RESULT", deltaStr, errorStr, resultStr, "Press to exit");
    Serial.printf("Verification: delta=%.3f err=%.3f %s\n", delta, error, pass ? "PASS" : "FAIL");

    if (!pass) {
        // Show hint about long-press recalibration
        delay(3000);
        oledShow("RESULT", deltaStr, resultStr, "Long-press button to", "enter RECALIBRATION");
    }

    waitForButtonPress();
    scale.power_down();
    oledOff();
}

// ============================================================
// Mode: Recalibration (Long Press)
// ============================================================

/// Auto-recalibrate using a known 1kg weight.
void modeRecalibration() {
    Serial.println("MODE: Recalibration");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();

    char curStr[32];
    snprintf(curStr, sizeof(curStr), "Current: %.1f", calibrationFactor);

    // Step 1: Record raw baseline (no weight) — this becomes the tare
    oledShow("RECALIBRATE", curStr, "", "Empty the scale.", "Press button when done");
    waitForButtonPress();

    oledShow("RECALIBRATE", "Reading baseline...", "Do NOT touch hive");
    delay(2000);

    scale.set_scale(1.0);  // Read raw values (no scaling)
    long baselineRaw = 0;
    for (int i = 0; i < 5; i++) {
        baselineRaw += scale.read_average(5);
        delay(200);
    }
    baselineRaw /= 5;

    char baseStr[32];
    snprintf(baseStr, sizeof(baseStr), "Raw base: %ld", baselineRaw);

    // Step 2: Add known weight
    oledShow("RECALIBRATE", baseStr, "", "Place 1kg sugar on", "Press button when done");
    waitForButtonPress();

    oledShow("RECALIBRATE", "Reading with 1kg...", "Do NOT touch hive");
    delay(2000);

    long loadedRaw = 0;
    for (int i = 0; i < 5; i++) {
        loadedRaw += scale.read_average(5);
        delay(200);
    }
    loadedRaw /= 5;

    // Step 3: Calculate new factor
    // calibration_factor = (raw_delta) / known_weight
    long rawDelta = loadedRaw - baselineRaw;
    if (rawDelta == 0) {
        oledShow("ERROR", "No weight change", "detected!", "Check load cell.", "Press to exit");
        waitForButtonPress();
        scale.power_down();
        oledOff();
        return;
    }

    float newFactor = (float)rawDelta / KNOWN_WEIGHT_KG;

    // Step 4: Verify the new factor with the new tare
    scale.set_scale(newFactor);
    scale.set_offset(baselineRaw);
    delay(500);
    float verification = scale.get_units(10);

    char oldStr[32], newStr[32], verStr[32];
    snprintf(oldStr, sizeof(oldStr), "Old: %.1f", calibrationFactor);
    snprintf(newStr, sizeof(newStr), "New: %.1f", newFactor);
    snprintf(verStr, sizeof(verStr), "Reads: %.2f kg", verification);

    oledShow("SAVE?", oldStr, newStr, verStr, "Press=Save  Wait=Cancel");

    // Wait for press (save) or 15s timeout (cancel)
    unsigned long saveDeadline = millis() + 15000;
    bool saved = false;
    while (millis() < saveDeadline) {
        if (digitalRead(BUTTON_PIN) == LOW) {
            delay(DEBOUNCE_MS);
            while (digitalRead(BUTTON_PIN) == LOW) delay(10);
            saveCalibration(newFactor);
            saveTareOffset(baselineRaw);
            oledShow("SAVED!", newStr, "Tare + Cal stored", "in NVS", "Press to exit");
            saved = true;
            break;
        }
        delay(10);
    }

    if (!saved) {
        oledShow("CANCELLED", "Factor NOT changed", curStr, "", "Press to exit");
    }

    waitForButtonPress();
    scale.power_down();
    oledOff();
}

void setup() {
    unsigned long wakeTime = millis();

    // Kill Bluetooth immediately — before it has a chance to initialise
    killBluetooth();

    Serial.begin(115200);

    // ─── Button & OLED init ───
    pinMode(BUTTON_PIN, INPUT_PULLUP);
    loadCalibration();
    initOLED();

    // ─── Identify this device by MAC address ───
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    snprintf(deviceMAC, sizeof(deviceMAC), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

    activeDevice = findDeviceByMAC(mac);

    bootCount++;
    Serial.printf("\n--- IoT Hive Stand | Boot #%d ---\n", bootCount);
    Serial.printf("MAC: %s\n", deviceMAC);

    if (!activeDevice) {
        Serial.println("\n========================================");
        Serial.println("  UNREGISTERED DEVICE");
        Serial.printf("  MAC: %s\n", deviceMAC);
        Serial.println("  Add this MAC to devices.h and reflash.");
        Serial.println("========================================\n");
        oledShow("UNREGISTERED", "Add MAC to devices.h", deviceMAC);
        pinMode(2, OUTPUT);
        for (int i = 0; i < 30; i++) {
            digitalWrite(2, !digitalRead(2));
            delay(200);
        }
        enterDeepSleep();
        return;
    }

    Serial.printf("Device: %s | Hive: %s | IP: %d.%d.%d.%d\n",
                  activeDevice->deviceName, activeDevice->hiveId,
                  activeDevice->ip[0], activeDevice->ip[1],
                  activeDevice->ip[2], activeDevice->ip[3]);

    // ─── Check if woken by button press ───
    esp_sleep_wakeup_cause_t wakeReason = esp_sleep_get_wakeup_cause();
    if (wakeReason == ESP_SLEEP_WAKEUP_EXT0) {
        Serial.println("Wake: BUTTON PRESS");
        oledShow("BUTTON WAKE", "Quick tap = Status", "Tap twice  = Verify", "Hold 2sec  = Recal");

        PressType press = detectPress(5000);
        switch (press) {
            case PressType::SINGLE:
                modeStatusDisplay();
                enterDeepSleep();
                return;
            case PressType::DOUBLE:
                modeVerification();
                enterDeepSleep();
                return;
            case PressType::LONG:
                modeRecalibration();
                enterDeepSleep();
                return;
            case PressType::NONE:
                Serial.println("No follow-up press — returning to sleep");
                oledOff();
                enterDeepSleep();
                return;
        }
    }

    // ─── Normal timer wake: read sensors and transmit ───
    initLittleFS();

    float weight   = readWeight();
    float tempC    = readTemperature();
    float batteryV = readBatteryVoltage();

    // Step 2: Connect to Wi-Fi (fast path if cached)
    if (connectWiFi()) {
        // Step 2a: Upload any cached offline readings first
        int cached = getCachedCount();
        if (cached > 0) {
            Serial.printf("CACHE: %d offline readings to upload\n", cached);
            uploadCachedReadings();
        }

        // Step 2b: Send current reading
        String payload = buildPayload(weight, tempC, batteryV);
        int status = sendToCloud(payload);

        if (status >= 200 && status < 300) {
            Serial.println("OK — Data reached Dataverse.");
            // Update last known time from successful POST
            // (HTTP Date header or just use compile-time + boot count as approximation)
            lastKnownUTC = time(nullptr);
            if (lastKnownUTC < 1000000000) {
                // time() not synced — estimate from previous known time
                if (lastKnownUTC == 0) lastKnownUTC = 1743552000; // ~2025-04-02 fallback epoch
                lastKnownUTC += SLEEP_MINUTES * 60;
            }
            missedCycles = 0;
        } else {
            Serial.println("WARN — Non-success response.");
        }

        // Step 2c: Check for OTA firmware update
        checkOTA();
    } else {
        // Wi-Fi failed — cache reading to flash
        Serial.println("WARN — No Wi-Fi. Caching to flash.");
        saveReadingToFlash(weight, tempC, batteryV);
    }

    // Step 3: Report total awake time, then sleep
    Serial.printf("Awake %lums. Sleeping %llum.\n", millis() - wakeTime, SLEEP_DURATION_US / 60000000ULL);

    enterDeepSleep();
}

void loop() {
    // Never reached — deep sleep resets through setup() on each wake.
}
