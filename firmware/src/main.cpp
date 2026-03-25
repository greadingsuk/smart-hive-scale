// ============================================================
// IoT Hive Stand — ESP32 Firmware
// ============================================================
// Sensor flow: Read HX711 → connect Wi-Fi → POST → deep sleep
// Battery strategy: read sensors BEFORE Wi-Fi (radios off)
// Multi-device: MAC-based auto-config from devices.h
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
#include "config.h"
#include "devices.h"

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
constexpr float CALIBRATION_FACTOR = 1.0; // Raw units — calibrate later with known weight
constexpr int HX711_SAMPLES = 10;         // Average 10 readings for stability

// ----- DS18B20 Temperature Sensor -----
constexpr int DS18B20_PIN = 17;
OneWire oneWire(DS18B20_PIN);
DallasTemperature tempSensor(&oneWire);

HX711 scale;

// ----- RTC Memory (survives deep sleep) -----
RTC_DATA_ATTR int bootCount = 0;
RTC_DATA_ATTR uint8_t savedBSSID[6] = {0};   // Router MAC address
RTC_DATA_ATTR int32_t savedChannel  = 0;     // Wi-Fi channel (1-13)
RTC_DATA_ATTR bool    hasCachedAP   = false;  // True after first successful connect

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

    scale.set_scale(CALIBRATION_FACTOR);
    float raw = scale.get_units(HX711_SAMPLES);
    scale.power_down();

    // Guard against saturation
    if (raw <= -8388600.0 || raw >= 8388600.0) {
        Serial.printf("HX711 saturated: %.0f — returning 0\n", raw);
        return 0.0;
    }

    Serial.printf("HX711 raw: %.1f (%d samples)\n", raw, HX711_SAMPLES);
    return raw;
}

/// Read temperature from DS18B20. Returns DEVICE_DISCONNECTED_C (-127) on failure.
float readTemperature() {
    tempSensor.begin();
    tempSensor.setResolution(12);           // 12-bit = 0.0625°C precision, ~750ms conversion
    tempSensor.requestTemperatures();
    float tempC = tempSensor.getTempCByIndex(0);

    if (tempC == DEVICE_DISCONNECTED_C) {
        Serial.println("DS18B20 NOT FOUND");
    } else {
        Serial.printf("DS18B20: %.2f°C\n", tempC);
    }
    return tempC;
}

/// Build JSON payload with sensor data and device identity.
String buildPayload(float weight, float tempC) {
    JsonDocument doc;
    doc["Weight"]         = weight;
    doc["InternalTemp"]   = (tempC != DEVICE_DISCONNECTED_C) ? tempC : 0.0;
    doc["BatteryVoltage"] = 0.0;
    doc["HiveHum"]        = 0;
    doc["LegTemp"]        = 0.0;
    doc["HiveId"]         = activeDevice->hiveId;
    doc["DeviceMAC"]      = deviceMAC;
    doc["DeviceName"]     = activeDevice->deviceName;

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

/// Kill all radios and enter deep sleep.
void enterDeepSleep() {
    Serial.flush();
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
    esp_wifi_stop();

    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
    esp_deep_sleep_start();
}

void setup() {
    unsigned long wakeTime = millis();

    // Kill Bluetooth immediately — before it has a chance to initialise
    killBluetooth();

    Serial.begin(115200);

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
        // Blink built-in LED rapidly to indicate unregistered
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

    // Step 1: Read sensors (radios still off — saves power)
    float weight = readWeight();
    float tempC  = readTemperature();

    // Step 2: Connect to Wi-Fi (fast path if cached)
    if (connectWiFi()) {
        // Step 3: Build and send payload
        String payload = buildPayload(weight, tempC);
        int status = sendToCloud(payload);

        if (status >= 200 && status < 300) {
            Serial.println("OK — Data reached Dataverse.");
        } else {
            Serial.println("WARN — Non-success response.");
        }
    } else {
        Serial.println("WARN — No Wi-Fi. Will cache to flash later.");
    }

    // Step 3: Report total awake time, then sleep
    Serial.printf("Awake %lums. Sleeping %llum.\n", millis() - wakeTime, SLEEP_DURATION_US / 60000000ULL);

    enterDeepSleep();
}

void loop() {
    // Never reached — deep sleep resets through setup() on each wake.
}
