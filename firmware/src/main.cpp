// ============================================================
// IoT Hive Stand — ESP32 Firmware v2
// ============================================================
//
// WAKE LOGIC:
//   This device spends most of its life in Deep Sleep.
//   It wakes for two reasons:
//
//   1. TIMER (every 15 min) — "Silent" telemetry upload.
//      Read sensors → Wi-Fi → POST → sleep. No OLED. Fastest path.
//
//   2. BUTTON (Pin 17, EXT0) — "Interactive" inspection mode.
//      OLED on → Screen 1 (Hive data, 10s) → Screen 2 (Device health, 10s)
//      Wi-Fi + POST happens in the background during Screen 1.
//
// HARDWARE PINOUT:
//   OLED SSD1306 128x64  → I2C SDA=21, SCL=22 (ESP32 default)
//   DS18B20 temp sensor   → Pin 5 (OneWire, 4.7kΩ pull-up to 3.3V)
//   Wake button           → Pin 33 to GND (RTC GPIO, required for deep sleep EXT0)
//   Battery ADC           → Pin 34 (100kΩ/100kΩ divider from 18650)
//   HX711 load cell       → DT=16, SCK=4 (TODO: arriving soon)
//
// BATTERY MATH:
//   The 18650 outputs 3.3V–4.2V. A 100k/100k voltage divider halves
//   this to 1.65V–2.1V, safe for the ESP32 ADC (0–3.3V range).
//   Formula: trueBatteryV = adcReading * (3.3 / 4095.0) * 2.0
//   Percentage: map 3.3V→0%, 4.2V→100%, constrained 0–100.
//
// DEEP SLEEP NOTES:
//   - esp_sleep_enable_timer_wakeup() sets the 15-min timer source
//   - esp_sleep_enable_ext0_wakeup() sets Pin 33 as a second source
//     IMPORTANT: EXT0 requires an RTC-capable GPIO. Pin 17 is NOT RTC.
//     RTC GPIOs: 0,2,4,12-15,25-27,32-39. We use GPIO 33.
//   - BOTH sources are enabled simultaneously before each sleep
//   - esp_sleep_get_wakeup_cause() tells us which one fired
//   - RTC memory survives deep sleep (boot count, Wi-Fi cache)
//   - On first power-on, wakeup_cause = ESP_SLEEP_WAKEUP_UNDEFINED
//     which we treat the same as TIMER (silent upload)
//
// MULTI-DEVICE:
//   MAC-based auto-config from devices.h — one firmware for all stands.
// ============================================================

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <esp_bt.h>
#include <esp_mac.h>
#include <esp_wifi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "config.h"
#include "devices.h"

// ─── PIN DEFINITIONS ───────────────────────────────────────
constexpr int PIN_DS18B20     = 5;    // OneWire data
constexpr int PIN_WAKE_BUTTON = 33;   // Momentary switch to GND (MUST be RTC GPIO)
constexpr int PIN_BATTERY_ADC = 34;   // Center of voltage divider
constexpr int PIN_HX711_DT    = 16;   // HX711 data (future)
constexpr int PIN_HX711_SCK   = 4;    // HX711 clock (future)

// ─── OLED DISPLAY ──────────────────────────────────────────
constexpr int OLED_WIDTH  = 128;
constexpr int OLED_HEIGHT = 64;
Adafruit_SSD1306 oled(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);  // -1 = no reset pin

// ─── DS18B20 TEMPERATURE ──────────────────────────────────
OneWire oneWire(PIN_DS18B20);
DallasTemperature tempSensor(&oneWire);

// ─── BATTERY ADC CONSTANTS ─────────────────────────────────
// Voltage divider: 100kΩ top + 100kΩ bottom → ratio = 2.0
// ESP32 ADC: 12-bit (0–4095), 0–3.3V input range
// True battery voltage = ADC voltage × 2.0
constexpr float BATTERY_DIVIDER_RATIO = 2.0;
constexpr float ADC_VREF              = 3.3;
constexpr int   ADC_MAX               = 4095;
constexpr float BATTERY_FULL_V        = 4.2;   // Fully charged 18650
constexpr float BATTERY_EMPTY_V       = 3.3;   // Cutoff voltage

// ─── DEEP SLEEP ────────────────────────────────────────────
constexpr uint64_t SLEEP_DURATION_US = 15ULL * 60ULL * 1000000ULL; // 15 minutes

// ─── SCREEN TIMING ─────────────────────────────────────────
constexpr unsigned long SCREEN1_DURATION_MS = 10000;  // Hive data screen
constexpr unsigned long SCREEN2_DURATION_MS = 10000;  // Device health screen

// ─── WI-FI ─────────────────────────────────────────────────
constexpr unsigned long FAST_CONNECT_TIMEOUT_MS = 3000;
constexpr unsigned long FULL_SCAN_TIMEOUT_MS    = 12000;

// ─── HX711 (PLACEHOLDER — enable when wired) ──────────────
constexpr float HX711_CALIBRATION_FACTOR = 1.0;
constexpr int   HX711_SAMPLES            = 10;

// ─── ACTIVE DEVICE (resolved from MAC at boot) ────────────
const DeviceConfig* activeDevice = nullptr;
char deviceMAC[18] = {0};

// ─── RTC MEMORY (survives deep sleep) ──────────────────────
RTC_DATA_ATTR int     bootCount   = 0;
RTC_DATA_ATTR uint8_t savedBSSID[6] = {0};
RTC_DATA_ATTR int32_t savedChannel  = 0;
RTC_DATA_ATTR bool    hasCachedAP   = false;

// ─── GLOBAL STATE (set during setup, used by screens) ──────
bool  g_oledReady     = false;  // True only if OLED was initialized
float g_tempC         = 0.0;
float g_weight        = 0.0;   // Dummy until HX711 arrives
float g_batteryV      = 0.0;
int   g_batteryPct    = 0;
int   g_wifiRSSI      = 0;
bool  g_wifiConnected = false;
bool  g_cloudSent     = false;
int   g_httpStatus    = 0;


// ════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════

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

/// Wait for Wi-Fi connection up to timeoutMs.
bool waitForConnect(unsigned long timeoutMs) {
    unsigned long deadline = millis() + timeoutMs;
    while (WiFi.status() != WL_CONNECTED) {
        if (millis() >= deadline) return false;
        delay(10);
    }
    return true;
}


// ════════════════════════════════════════════════════════════
//  SENSOR FUNCTIONS
// ════════════════════════════════════════════════════════════

/// Read temperature from DS18B20.
/// Returns the temperature in °C, or DEVICE_DISCONNECTED_C (-127) on failure.
float readTemperature() {
    tempSensor.begin();
    tempSensor.setResolution(12);   // 12-bit = 0.0625°C, ~750ms conversion
    tempSensor.requestTemperatures();
    float tempC = tempSensor.getTempCByIndex(0);

    if (tempC == DEVICE_DISCONNECTED_C) {
        Serial.println("DS18B20 NOT FOUND");
    } else {
        Serial.printf("DS18B20: %.2f°C\n", tempC);
    }
    return tempC;
}

/// Read weight from HX711.
/// TODO: Enable when HX711 load cell is wired. Currently returns dummy 0.0.
float readWeight() {
    // ──────────────────────────────────────────────────────
    // UNCOMMENT THIS BLOCK when HX711 is physically wired:
    //
    // #include <HX711.h>
    // static HX711 scale;
    // scale.begin(PIN_HX711_DT, PIN_HX711_SCK);
    // if (!scale.wait_ready_timeout(2000)) {
    //     Serial.println("HX711 NOT READY");
    //     scale.power_down();
    //     return 0.0;
    // }
    // scale.read();  // discard first reading
    // if (!scale.wait_ready_timeout(1000)) {
    //     Serial.println("HX711 NOT READY (2nd)");
    //     scale.power_down();
    //     return 0.0;
    // }
    // scale.set_scale(HX711_CALIBRATION_FACTOR);
    // float raw = scale.get_units(HX711_SAMPLES);
    // scale.power_down();
    // Serial.printf("HX711: %.1f (%d samples)\n", raw, HX711_SAMPLES);
    // return raw;
    // ──────────────────────────────────────────────────────

    Serial.println("HX711 not connected — returning dummy weight 0.0");
    return 0.0;
}

/// Read battery voltage and percentage from the ADC voltage divider.
///
/// BATTERY MATH:
///   1. ESP32 ADC reads 0–4095 for 0–3.3V on Pin 34
///   2. Voltage divider halves the battery voltage:
///      V_adc = V_battery × (100k / (100k + 100k)) = V_battery / 2
///   3. So: V_battery = V_adc × 2.0
///   4. Map 3.3V (empty) → 0%, 4.2V (full) → 100%
///   5. Constrain to 0–100 range
///
/// Takes 16 samples and averages to smooth ADC noise.
void readBattery(float &voltageOut, int &percentOut) {
    // Average 16 ADC samples to reduce noise
    long adcSum = 0;
    for (int i = 0; i < 16; i++) {
        adcSum += analogRead(PIN_BATTERY_ADC);
        delayMicroseconds(100);
    }
    float adcAvg = adcSum / 16.0;

    // Convert ADC value → true battery voltage
    //   Step 1: ADC counts → voltage at the ADC pin
    float adcVoltage = adcAvg * (ADC_VREF / ADC_MAX);
    //   Step 2: Compensate for the 1:2 voltage divider
    voltageOut = adcVoltage * BATTERY_DIVIDER_RATIO;

    // Map voltage to percentage (linear approximation)
    float pct = (voltageOut - BATTERY_EMPTY_V) / (BATTERY_FULL_V - BATTERY_EMPTY_V) * 100.0;
    percentOut = constrain((int)pct, 0, 100);

    Serial.printf("Battery: %.2fV → %d%% (ADC avg: %.0f)\n", voltageOut, percentOut, adcAvg);
}


// ════════════════════════════════════════════════════════════
//  WI-FI
// ════════════════════════════════════════════════════════════

/// Two-phase Wi-Fi connect:
///   Phase 1 (cached): BSSID + channel → 3s timeout
///   Phase 2 (fallback): full scan → 12s timeout
bool connectWiFi() {
    unsigned long t0 = millis();
    WiFi.mode(WIFI_STA);
    configureStaticIP();

    // Phase 1: Fast connect using cached AP
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

    // Phase 2: Full scan fallback
    unsigned long t1 = millis();
    Serial.print("Full scan...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    if (!waitForConnect(FULL_SCAN_TIMEOUT_MS)) {
        Serial.printf(" FAIL (%lums total)\n", millis() - t0);
        return false;
    }

    Serial.printf(" OK %s (%lums, scan %lums)\n",
        WiFi.localIP().toString().c_str(), millis() - t0, millis() - t1);

    // Cache for next boot
    memcpy(savedBSSID, WiFi.BSSID(), 6);
    savedChannel = WiFi.channel();
    hasCachedAP  = true;
    return true;
}


// ════════════════════════════════════════════════════════════
//  CLOUD UPLOAD
// ════════════════════════════════════════════════════════════

/// Build JSON payload with all sensor data and device identity.
String buildPayload(float weight, float tempC, float batteryV, int batteryPct) {
    JsonDocument doc;
    doc["Weight"]         = weight;
    doc["InternalTemp"]   = (tempC != DEVICE_DISCONNECTED_C) ? tempC : 0.0;
    doc["BatteryVoltage"] = batteryV;
    doc["HiveHum"]        = 0;
    doc["LegTemp"]        = 0.0;
    doc["HiveId"]         = activeDevice->hiveId;
    doc["DeviceMAC"]      = deviceMAC;
    doc["DeviceName"]     = activeDevice->deviceName;

    String json;
    serializeJson(doc, json);
    return json;
}

/// POST JSON payload to the ingest endpoint. Returns HTTP status code.
int sendToCloud(const String& payload) {
    unsigned long t0 = millis();
    WiFiClientSecure client;
    client.setInsecure();               // Skip TLS cert verification (Power Automate URL)

    HTTPClient http;
    http.begin(client, INGEST_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(30000);

    int httpCode = http.POST(payload);
    unsigned long sendTime = millis() - t0;

    if (httpCode > 0) {
        Serial.printf("POST %d (%lums)\n", httpCode, sendTime);
        http.getString();               // Drain response body
    } else {
        Serial.printf("POST FAIL: %s (%lums)\n", http.errorToString(httpCode).c_str(), sendTime);
    }
    http.end();
    return httpCode;
}


// ════════════════════════════════════════════════════════════
//  OLED DISPLAY SCREENS
// ════════════════════════════════════════════════════════════

/// Initialize the OLED. Returns true if successful.
bool initOLED() {
    Wire.begin();  // Explicitly init I2C before OLED
    if (!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("OLED init FAILED");
        return false;
    }
    oled.clearDisplay();
    oled.setTextColor(SSD1306_WHITE);
    g_oledReady = true;
    return true;
}

/// Screen 1: Hive Data — temperature + weight in large text.
/// Shows Wi-Fi/cloud status in the bottom-right corner.
void drawScreen1_HiveData() {
    oled.clearDisplay();

    // Title bar
    oled.setTextSize(1);
    oled.setCursor(0, 0);
    oled.printf("%s", activeDevice->deviceName);

    // Divider line
    oled.drawLine(0, 10, OLED_WIDTH - 1, 10, SSD1306_WHITE);

    // Temperature — large
    oled.setTextSize(2);
    oled.setCursor(0, 16);
    if (g_tempC != DEVICE_DISCONNECTED_C) {
        oled.printf("%.1f", g_tempC);
        oled.setTextSize(1);
        oled.print(" C");
    } else {
        oled.print("-- C");
    }

    // Weight — large
    oled.setTextSize(2);
    oled.setCursor(0, 38);
    oled.printf("%.1fkg", g_weight);

    // Wi-Fi status indicator (bottom-right)
    oled.setTextSize(1);
    oled.setCursor(70, 56);
    if (g_cloudSent) {
        oled.print("WiFi:Sent!");
    } else if (g_wifiConnected) {
        oled.print("WiFi:OK");
    } else {
        oled.print("WiFi:...");
    }

    oled.display();
}

/// Screen 2: Device Health — battery, signal, IP.
void drawScreen2_DeviceHealth() {
    oled.clearDisplay();

    // Title bar
    oled.setTextSize(1);
    oled.setCursor(0, 0);
    oled.print("Device Health");
    oled.drawLine(0, 10, OLED_WIDTH - 1, 10, SSD1306_WHITE);

    oled.setTextSize(1);

    // Battery percentage + voltage
    oled.setCursor(0, 16);
    oled.printf("Battery: %d%%  %.2fV", g_batteryPct, g_batteryV);

    // Battery bar (visual)
    int barWidth = map(g_batteryPct, 0, 100, 0, 80);
    oled.drawRect(0, 28, 84, 8, SSD1306_WHITE);       // Outline
    oled.fillRect(2, 30, barWidth, 4, SSD1306_WHITE);  // Fill

    // Wi-Fi RSSI
    oled.setCursor(0, 40);
    if (g_wifiConnected) {
        oled.printf("RSSI: %d dBm", g_wifiRSSI);
    } else {
        oled.print("RSSI: N/A");
    }

    // IP Address
    oled.setCursor(0, 52);
    if (g_wifiConnected) {
        oled.printf("IP: %s", WiFi.localIP().toString().c_str());
    } else {
        oled.printf("IP: %d.%d.%d.%d (cfg)",
            activeDevice->ip[0], activeDevice->ip[1],
            activeDevice->ip[2], activeDevice->ip[3]);
    }

    oled.display();
}


// ════════════════════════════════════════════════════════════
//  DEEP SLEEP MANAGEMENT
// ════════════════════════════════════════════════════════════

/// Configure both wake sources and enter deep sleep.
///
/// DEEP SLEEP WAKE SOURCES (both active simultaneously):
///   1. Timer — fires after SLEEP_DURATION_US (15 minutes)
///   2. EXT0  — fires immediately when Pin 17 is pulled LOW (button press)
///
/// On next boot, esp_sleep_get_wakeup_cause() returns which one fired.
void enterDeepSleep() {
    Serial.println("Entering deep sleep...");
    Serial.flush();

    // Turn off OLED only if it was initialized this boot
    if (g_oledReady) {
        oled.ssd1306_command(SSD1306_DISPLAYOFF);
    }

    // Kill radios
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
    esp_wifi_stop();

    // ─── Configure BOTH wake sources ───
    // Source 1: Timer (15 minutes)
    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);

    // Source 2: Button on Pin 17 — wake when LOW (button pulls to GND)
    // EXT0 uses RTC GPIO so the pin stays monitored during deep sleep
    esp_sleep_enable_ext0_wakeup((gpio_num_t)PIN_WAKE_BUTTON, 0);  // 0 = wake on LOW

    esp_deep_sleep_start();
    // Execution never reaches here — CPU resets on wake
}


// ════════════════════════════════════════════════════════════
//  DEVICE IDENTIFICATION
// ════════════════════════════════════════════════════════════

/// Read MAC, look up device config. Returns false if unregistered.
bool identifyDevice() {
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    snprintf(deviceMAC, sizeof(deviceMAC), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

    activeDevice = findDeviceByMAC(mac);

    if (!activeDevice) {
        Serial.println("\n========================================");
        Serial.println("  UNREGISTERED DEVICE");
        Serial.printf("  MAC: %s\n", deviceMAC);
        Serial.println("  Add this MAC to devices.h and reflash.");
        Serial.println("========================================\n");
        pinMode(2, OUTPUT);
        for (int i = 0; i < 30; i++) {
            digitalWrite(2, !digitalRead(2));
            delay(200);
        }
        return false;
    }
    return true;
}


// ════════════════════════════════════════════════════════════
//  WAKE HANDLERS
// ════════════════════════════════════════════════════════════

/// TIMER WAKE — silent telemetry upload, no OLED.
/// Goal: minimise awake time and power consumption.
void handleTimerWake() {
    Serial.println("Wake: TIMER — silent upload");

    // Step 1: Read sensors (radios still off)
    g_tempC  = readTemperature();
    g_weight = readWeight();
    readBattery(g_batteryV, g_batteryPct);

    // Step 2: Connect and upload
    if (connectWiFi()) {
        String payload = buildPayload(g_weight, g_tempC, g_batteryV, g_batteryPct);
        int status = sendToCloud(payload);
        Serial.printf("Upload: HTTP %d\n", status);
    } else {
        Serial.println("WARN — No Wi-Fi.");
    }

    // Step 3: Sleep immediately
}

/// BUTTON WAKE — interactive mode with OLED screens.
/// Screen 1: Hive data (10s) — Wi-Fi connects in background.
/// Screen 2: Device health (10s) — battery, signal, IP.
void handleButtonWake() {
    Serial.println("Wake: BUTTON — interactive mode");

    // Step 1: Read sensors (radios still off)
    g_tempC  = readTemperature();
    g_weight = readWeight();
    readBattery(g_batteryV, g_batteryPct);

    // Step 2: Init OLED and show Screen 1
    if (!initOLED()) {
        // OLED failed — fall back to silent upload
        handleTimerWake();
        return;
    }

    // Draw initial Screen 1 (wifi status will say "WiFi:...")
    drawScreen1_HiveData();

    // Step 3: Connect Wi-Fi while Screen 1 is visible
    unsigned long screen1Start = millis();

    g_wifiConnected = connectWiFi();
    if (g_wifiConnected) {
        g_wifiRSSI = WiFi.RSSI();

        // Send data
        String payload = buildPayload(g_weight, g_tempC, g_batteryV, g_batteryPct);
        g_httpStatus = sendToCloud(payload);
        g_cloudSent  = (g_httpStatus >= 200 && g_httpStatus < 300);

        // Update Screen 1 with Wi-Fi status
        drawScreen1_HiveData();
    }

    // Wait for remainder of Screen 1 duration (10s total)
    unsigned long elapsed = millis() - screen1Start;
    if (elapsed < SCREEN1_DURATION_MS) {
        delay(SCREEN1_DURATION_MS - elapsed);
    }

    // Step 4: Screen 2 — Device Health
    drawScreen2_DeviceHealth();
    delay(SCREEN2_DURATION_MS);

    // Step 5: Turn off OLED (enterDeepSleep handles this too, belt & braces)
    oled.clearDisplay();
    oled.display();
}


// ════════════════════════════════════════════════════════════
//  SETUP (runs on every wake from deep sleep)
// ════════════════════════════════════════════════════════════

void setup() {
    unsigned long wakeTime = millis();

    // Kill Bluetooth immediately — before it initialises (~50mA saved)
    killBluetooth();

    Serial.begin(115200);

    // Configure button pin with internal pull-up (HIGH when not pressed)
    pinMode(PIN_WAKE_BUTTON, INPUT_PULLUP);

    // ─── Identify this device by MAC ───
    bootCount++;
    Serial.printf("\n--- IoT Hive Stand | Boot #%d ---\n", bootCount);

    if (!identifyDevice()) {
        enterDeepSleep();
        return;
    }

    Serial.printf("Device: %s | Hive: %s | IP: %d.%d.%d.%d\n",
                  activeDevice->deviceName, activeDevice->hiveId,
                  activeDevice->ip[0], activeDevice->ip[1],
                  activeDevice->ip[2], activeDevice->ip[3]);

    // ─── Determine WHY we woke up ───
    // esp_sleep_get_wakeup_cause() returns:
    //   ESP_SLEEP_WAKEUP_TIMER     — the 15-min timer expired
    //   ESP_SLEEP_WAKEUP_EXT0      — the button on Pin 17 was pressed
    //   ESP_SLEEP_WAKEUP_UNDEFINED — first power-on (no previous sleep)
    //
    // We treat UNDEFINED (cold boot) the same as TIMER — do a silent upload.
    esp_sleep_wakeup_cause_t wakeReason = esp_sleep_get_wakeup_cause();

    switch (wakeReason) {
        case ESP_SLEEP_WAKEUP_EXT0:
            handleButtonWake();
            break;

        case ESP_SLEEP_WAKEUP_TIMER:
        default:
            // TIMER wake or first power-on — silent telemetry, no OLED
            handleTimerWake();
            break;
    }

    // ─── Report awake time and sleep ───
    Serial.printf("Awake %lums. Sleeping %llum.\n",
                  millis() - wakeTime, SLEEP_DURATION_US / 60000000ULL);

    enterDeepSleep();
}

void loop() {
    // Never reached — deep sleep resets through setup() on each wake.
}
