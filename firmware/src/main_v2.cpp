// ============================================================
// IoT Hive Stand — Golden Master Firmware (FireBeetle 2)
// ============================================================
// Board: DFRobot FireBeetle 2 ESP32-E (DFR0654)
// Sensor flow: Read HX711 → DS18B20 x2 → Battery → Wi-Fi → POST → deep sleep
// Battery strategy: read sensors BEFORE Wi-Fi (radios off)
// Multi-device: MAC-based auto-config from devices.h
// OTA: DISABLED until golden build validated fleet-wide
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
#define FIRMWARE_VERSION "2.0.1"

// ----- Active Device (resolved from MAC at boot) -----
const DeviceConfig* activeDevice = nullptr;
char deviceMAC[18] = {0};  // "AA:BB:CC:DD:EE:FF"

// ----- Deep Sleep -----
constexpr uint64_t SLEEP_DURATION_US = 15ULL * 60ULL * 1000000ULL; // 15 minutes

// ----- Wi-Fi -----
constexpr unsigned long FAST_CONNECT_TIMEOUT_MS = 3000;
constexpr unsigned long FULL_SCAN_TIMEOUT_MS    = 12000;

// ----- HX711 Load Cell (FireBeetle pinout) -----
constexpr int HX711_DT_PIN  = 25;  // D2
constexpr int HX711_SCK_PIN = 26;  // D3
constexpr float DEFAULT_CALIBRATION_FACTOR = -22050.0;
constexpr int HX711_SAMPLES = 10;

// ----- DS18B20 Temperature Sensors (dual, shared 1-Wire bus) -----
constexpr int DS18B20_PIN = 13;  // D7
OneWire oneWire(DS18B20_PIN);
DallasTemperature tempSensors(&oneWire);

// DS18B20 ROM addresses (enumerated during component test)
// Enclosure = bare TO-92 chip inside IP65 box
// Hive = waterproof probe inserted into beehive
DeviceAddress SENSOR_ENCLOSURE = {0x28, 0x80, 0xFE, 0x24, 0x00, 0x00, 0x00, 0x8E};
DeviceAddress SENSOR_HIVE      = {0x28, 0x93, 0x3E, 0x80, 0x00, 0x00, 0x00, 0x09};

HX711 scale;

// ----- Battery Voltage (built-in divider on FireBeetle) -----
constexpr int BATTERY_PIN = 34;
constexpr float DIVIDER_RATIO = 2.0;
constexpr float ADC_REF_VOLTAGE = 3.3;
constexpr int ADC_MAX = 4095;

// ----- OLED Display (SSD1306, I2C, 128×64) -----
constexpr int OLED_WIDTH  = 128;
constexpr int OLED_HEIGHT = 64;
constexpr int OLED_SDA    = 21;
constexpr int OLED_SCL    = 22;
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

// ----- Button (GPIO 14/D6, active LOW with internal pull-up) -----
constexpr int BUTTON_PIN = 14;  // D6 — RTC-capable for ext0 wake
constexpr unsigned long DEBOUNCE_MS      = 50;
constexpr unsigned long DOUBLE_PRESS_MS  = 400;
constexpr unsigned long LONG_PRESS_MS    = 2000;

// ----- Calibration (NVS) -----
Preferences prefs;
float calibrationFactor = DEFAULT_CALIBRATION_FACTOR;
long tareOffset = 0;
constexpr float KNOWN_WEIGHT_KG = 1.0;
constexpr float VERIFICATION_TOLERANCE_KG = 0.05;

// ----- Button press type enum -----
enum class PressType { NONE, SINGLE, DOUBLE, LONG };

// ----- RTC Memory (survives deep sleep) -----
RTC_DATA_ATTR int bootCount = 0;
RTC_DATA_ATTR uint8_t savedBSSID[6] = {0};
RTC_DATA_ATTR int32_t savedChannel  = 0;
RTC_DATA_ATTR bool    hasCachedAP   = false;
RTC_DATA_ATTR time_t  lastKnownUTC  = 0;
RTC_DATA_ATTR int32_t missedCycles  = 0;

// ----- LittleFS Offline Cache -----
constexpr const char* CACHE_FILE = "/readings.jsonl";
constexpr int SLEEP_MINUTES = 15;

// ============================================================
// Core Functions
// ============================================================

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
bool connectWiFi() {
    unsigned long t0 = millis();

    WiFi.mode(WIFI_STA);
    configureStaticIP();

    if (hasCachedAP) {
        Serial.printf("Fast (ch%d)...", savedChannel);
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD, savedChannel, savedBSSID, true);

        if (waitForConnect(FAST_CONNECT_TIMEOUT_MS)) {
            Serial.printf(" OK %s (%lums)\n", WiFi.localIP().toString().c_str(), millis() - t0);
            return true;
        }

        Serial.printf(" stale (%lums). ", millis() - t0);
        hasCachedAP = false;
        WiFi.disconnect(true);
        delay(50);
    }

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

    if (!scale.wait_ready_timeout(2000)) {
        Serial.println("HX711 NOT READY");
        scale.power_down();
        return 0.0;
    }

    scale.read();  // Discard first reading

    if (!scale.wait_ready_timeout(1000)) {
        Serial.println("HX711 NOT READY (2nd)");
        scale.power_down();
        return 0.0;
    }

    scale.set_scale(calibrationFactor);
    if (tareOffset != 0) scale.set_offset(tareOffset);
    float raw = scale.get_units(HX711_SAMPLES);
    scale.power_down();

    if (raw <= -8388600.0 || raw >= 8388600.0) {
        Serial.printf("HX711 saturated: %.0f — returning 0\n", raw);
        return 0.0;
    }

    Serial.printf("HX711: %.2f kg (%d samples)\n", raw, HX711_SAMPLES);
    return raw;
}

/// Read temperatures from both DS18B20 sensors by ROM address.
/// Returns hive temp via hiveTemp, enclosure temp via enclosureTemp.
void readTemperatures(float& hiveTemp, float& enclosureTemp) {
    tempSensors.begin();
    tempSensors.setResolution(12);
    tempSensors.setWaitForConversion(true);
    tempSensors.requestTemperatures();

    hiveTemp = tempSensors.getTempC(SENSOR_HIVE);
    enclosureTemp = tempSensors.getTempC(SENSOR_ENCLOSURE);

    // Filter 85.0°C (power-on reset) and -127°C (disconnected)
    if (hiveTemp == 85.0 || hiveTemp == DEVICE_DISCONNECTED_C) {
        Serial.println("DS18B20 Hive: power-on reset or disconnected");
        hiveTemp = 0.0;
    } else {
        Serial.printf("DS18B20 Hive: %.2f°C\n", hiveTemp);
    }

    if (enclosureTemp == 85.0 || enclosureTemp == DEVICE_DISCONNECTED_C) {
        Serial.println("DS18B20 Enclosure: power-on reset or disconnected");
        enclosureTemp = 0.0;
    } else {
        Serial.printf("DS18B20 Enclosure: %.2f°C\n", enclosureTemp);
    }
}

/// Read battery voltage via the built-in voltage divider on Pin 34.
float readBatteryVoltage() {
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

/// Convert battery voltage to percentage (18650 Li-ion curve).
int batteryPercentage(float voltage) {
    if (voltage >= 4.2) return 100;
    if (voltage <= 3.0) return 0;
    if (voltage >= 4.0) return 80 + (int)((voltage - 4.0) / 0.2 * 20);
    if (voltage >= 3.7) return 30 + (int)((voltage - 3.7) / 0.3 * 50);
    return (int)((voltage - 3.0) / 0.7 * 30);
}

/// Build JSON payload with sensor data and device identity.
String buildPayload(float weight, float hiveTemp, float enclosureTemp, float batteryV) {
    JsonDocument doc;
    doc["Weight"]          = weight;
    doc["InternalTemp"]    = hiveTemp;
    doc["BatteryVoltage"]  = batteryV;
    doc["HiveHum"]         = 0;
    doc["LegTemp"]         = enclosureTemp;
    doc["HiveId"]          = activeDevice->hiveId;
    doc["DeviceMAC"]       = deviceMAC;
    doc["DeviceName"]      = activeDevice->deviceName;
    doc["FirmwareVersion"] = FIRMWARE_VERSION;

    String json;
    serializeJson(doc, json);
    return json;
}

/// POST JSON payload to Logic App. Returns HTTP status code.
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
        http.getString();
    } else {
        Serial.printf("POST FAIL: %s (%lums)\n", http.errorToString(httpCode).c_str(), sendTime);
    }

    http.end();
    return httpCode;
}

// ============================================================
// LittleFS Offline Cache
// ============================================================

bool initLittleFS() {
    if (!LittleFS.begin(true)) {
        Serial.println("LittleFS mount FAILED");
        return false;
    }
    Serial.println("LittleFS ready");
    return true;
}

String buildTimestampedPayload(float weight, float hiveTemp, float enclosureTemp, float batteryV) {
    JsonDocument doc;
    doc["Weight"]          = weight;
    doc["InternalTemp"]    = hiveTemp;
    doc["BatteryVoltage"]  = batteryV;
    doc["HiveHum"]         = 0;
    doc["LegTemp"]         = enclosureTemp;
    doc["HiveId"]          = activeDevice->hiveId;
    doc["DeviceMAC"]       = deviceMAC;
    doc["DeviceName"]      = activeDevice->deviceName;
    doc["FirmwareVersion"] = FIRMWARE_VERSION;

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

void saveReadingToFlash(float weight, float hiveTemp, float enclosureTemp, float batteryV) {
    File f = LittleFS.open(CACHE_FILE, FILE_APPEND);
    if (!f) {
        Serial.println("CACHE: Failed to open file for append");
        return;
    }
    String line = buildTimestampedPayload(weight, hiveTemp, enclosureTemp, batteryV);
    f.println(line);
    f.close();
    missedCycles++;
    Serial.printf("CACHE: Saved to flash (%d cached)\n", missedCycles);
}

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
        delay(500);
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
// OTA Firmware Update (Pull-based) — DISABLED until v2.1.0
// ============================================================

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

void checkOTA() {
#ifdef OTA_VERSION_URL
    Serial.printf("OTA: Checking for updates (current v%s)...\n", FIRMWARE_VERSION);

    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient http;

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

    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
    esp_sleep_enable_ext0_wakeup((gpio_num_t)BUTTON_PIN, 0);
    esp_deep_sleep_start();
}

// ============================================================
// NVS Calibration Helpers
// ============================================================

void loadCalibration() {
    nvs_flash_init();
    prefs.begin("hivescale", false);
    calibrationFactor = prefs.getFloat("calFactor", DEFAULT_CALIBRATION_FACTOR);
    tareOffset = prefs.getLong("tareOffset", 0);
    prefs.end();
    Serial.printf("Cal factor: %.1f | Tare offset: %ld\n", calibrationFactor, tareOffset);
}

void saveCalibration(float newFactor) {
    prefs.begin("hivescale", false);
    prefs.putFloat("calFactor", newFactor);
    prefs.end();
    calibrationFactor = newFactor;
    Serial.printf("Calibration saved: %.1f\n", newFactor);
}

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

void oledShow(const char* title, const char* line1 = nullptr,
              const char* line2 = nullptr, const char* line3 = nullptr,
              const char* line4 = nullptr) {
    if (!oledReady) return;
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(0, 4);
    display.println(title);
    if (line1) { display.setCursor(0, 18); display.println(line1); }
    if (line2) { display.setCursor(0, 30); display.println(line2); }
    if (line3) { display.setCursor(0, 42); display.println(line3); }
    if (line4) { display.setCursor(0, 54); display.println(line4); }
    display.display();
}

void oledOff() {
    if (!oledReady) return;
    display.clearDisplay();
    display.display();
    display.ssd1306_command(SSD1306_DISPLAYOFF);
}

// ============================================================
// Button Press Detection
// ============================================================

PressType detectPress(unsigned long timeoutMs = 5000) {
    if (digitalRead(BUTTON_PIN) == LOW) {
        unsigned long holdStart = millis();
        while (digitalRead(BUTTON_PIN) == LOW) {
            if (millis() - holdStart >= LONG_PRESS_MS) {
                while (digitalRead(BUTTON_PIN) == LOW) delay(10);
                return PressType::LONG;
            }
            delay(5);
        }
        delay(DEBOUNCE_MS);
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

    unsigned long deadline = millis() + timeoutMs;
    while (digitalRead(BUTTON_PIN) == HIGH) {
        if (millis() >= deadline) return PressType::NONE;
        delay(5);
    }
    delay(DEBOUNCE_MS);

    unsigned long pressStart = millis();
    while (digitalRead(BUTTON_PIN) == LOW) {
        if (millis() - pressStart >= LONG_PRESS_MS) {
            while (digitalRead(BUTTON_PIN) == LOW) delay(10);
            return PressType::LONG;
        }
        delay(5);
    }

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

void waitForButtonPress() {
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    delay(DEBOUNCE_MS);
    while (digitalRead(BUTTON_PIN) == HIGH) delay(10);
    delay(DEBOUNCE_MS);
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    delay(DEBOUNCE_MS);
}

// ============================================================
// Read weight helper (non-destructive, no power_down)
// ============================================================

float readWeightLive() {
    if (!scale.wait_ready_timeout(1000)) return 0.0;
    scale.set_scale(calibrationFactor);
    if (tareOffset != 0) scale.set_offset(tareOffset);
    return scale.get_units(HX711_SAMPLES);
}

// ============================================================
// Mode: Status Display (Single Press)
// ============================================================

void modeStatusDisplay() {
    Serial.println("MODE: Status Display");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();

    char line1[32], line2[32], line3[32], line4[32];

    unsigned long startTime = millis();
    unsigned long endTime = startTime + 30000;
    int currentPage = 0;

    while (millis() < endTime) {
        int page = (millis() - startTime < 10000) ? 0 : 1;

        if (page == 0) {
            float w = readWeightLive();
            float hiveT = 0, boxT = 0;
            readTemperatures(hiveT, boxT);
            float bv = readBatteryVoltage();
            int bp = batteryPercentage(bv);

            snprintf(line1, sizeof(line1), "Weight: %.2f kg", w);
            snprintf(line2, sizeof(line2), "H:%.1fC  B:%.1fC", hiveT, boxT);
            snprintf(line3, sizeof(line3), "Bat:    %.2fV  %d%%", bv, bp);
            snprintf(line4, sizeof(line4), "Boot #%d", bootCount);

            oledShow("HIVE STATUS", line1, line2, line3, line4);
        } else {
            if (page != currentPage) {
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

void modeVerification() {
    Serial.println("MODE: Verification");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();

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

    oledShow("VERIFY SCALE", baseStr, "", "Place 1kg sugar on", "Press button when done");
    Serial.printf("Verification baseline: %.2f kg\n", baseline);
    waitForButtonPress();

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

void modeRecalibration() {
    Serial.println("MODE: Recalibration");

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    if (scale.wait_ready_timeout(2000)) scale.read();

    char curStr[32];
    snprintf(curStr, sizeof(curStr), "Current: %.1f", calibrationFactor);

    oledShow("RECALIBRATE", curStr, "", "Empty the scale.", "Press button when done");
    waitForButtonPress();

    oledShow("RECALIBRATE", "Reading baseline...", "Do NOT touch hive");
    delay(2000);

    scale.set_scale(1.0);
    long baselineRaw = 0;
    for (int i = 0; i < 5; i++) {
        baselineRaw += scale.read_average(5);
        delay(200);
    }
    baselineRaw /= 5;

    char baseStr[32];
    snprintf(baseStr, sizeof(baseStr), "Raw base: %ld", baselineRaw);

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

    long rawDelta = loadedRaw - baselineRaw;
    if (rawDelta == 0) {
        oledShow("ERROR", "No weight change", "detected!", "Check load cell.", "Press to exit");
        waitForButtonPress();
        scale.power_down();
        oledOff();
        return;
    }

    float newFactor = (float)rawDelta / KNOWN_WEIGHT_KG;

    scale.set_scale(newFactor);
    scale.set_offset(baselineRaw);
    delay(500);
    float verification = scale.get_units(10);

    char oldStr[32], newStr[32], verStr[32];
    snprintf(oldStr, sizeof(oldStr), "Old: %.1f", calibrationFactor);
    snprintf(newStr, sizeof(newStr), "New: %.1f", newFactor);
    snprintf(verStr, sizeof(verStr), "Reads: %.2f kg", verification);

    oledShow("SAVE?", oldStr, newStr, verStr, "Press=Save  Wait=Cancel");

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

// ============================================================
// setup() — Main Entry Point
// ============================================================

void setup() {
    unsigned long wakeTime = millis();

    killBluetooth();
    Serial.begin(115200);

    pinMode(BUTTON_PIN, INPUT_PULLUP);
    loadCalibration();
    initOLED();

    // Identify device by MAC
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    snprintf(deviceMAC, sizeof(deviceMAC), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

    activeDevice = findDeviceByMAC(mac);

    bootCount++;
    Serial.printf("\n--- IoT Hive Stand v%s | Boot #%d ---\n", FIRMWARE_VERSION, bootCount);
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

    // Check if woken by button press
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

    // Normal timer wake: read sensors and transmit
    initLittleFS();

    float weight = readWeight();
    float hiveTemp = 0, enclosureTemp = 0;
    readTemperatures(hiveTemp, enclosureTemp);
    float batteryV = readBatteryVoltage();

    if (connectWiFi()) {
        int cached = getCachedCount();
        if (cached > 0) {
            Serial.printf("CACHE: %d offline readings to upload\n", cached);
            uploadCachedReadings();
        }

        String payload = buildPayload(weight, hiveTemp, enclosureTemp, batteryV);
        int status = sendToCloud(payload);

        if (status >= 200 && status < 300) {
            Serial.println("OK — Data reached Dataverse.");
            lastKnownUTC = time(nullptr);
            if (lastKnownUTC < 1000000000) {
                if (lastKnownUTC == 0) lastKnownUTC = 1743552000;
                lastKnownUTC += SLEEP_MINUTES * 60;
            }
            missedCycles = 0;
        } else {
            Serial.println("WARN — Non-success response.");
        }

        // OTA: Check for firmware updates after successful POST
        checkOTA();
    } else {
        Serial.println("WARN — No Wi-Fi. Caching to flash.");
        saveReadingToFlash(weight, hiveTemp, enclosureTemp, batteryV);
    }

    Serial.printf("Awake %lums. Sleeping %llum.\n", millis() - wakeTime, SLEEP_DURATION_US / 60000000ULL);

    enterDeepSleep();
}

void loop() {
    // Never reached — deep sleep resets through setup() on each wake.
}
