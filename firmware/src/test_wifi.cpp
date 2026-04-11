// ============================================================
// TEST: Wi-Fi + HTTP POST — FireBeetle 2 ESP32-E
// ============================================================
// Tests:
//   1. Static IP configuration (192.168.1.75 — Scale 1)
//   2. Wi-Fi connection to home network
//   3. RSSI signal strength
//   4. NTP time sync
//   5. HTTP POST to HiveTelemetryIngest Logic App
//   6. Response code validation
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-wifi
// ============================================================

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <esp_bt.h>
#include "config.h"

// ----- Static IP for Scale 1 -----
constexpr uint8_t DEVICE_IP[4] = {192, 168, 1, 75};

// ----- Device identity -----
const char* DEVICE_MAC_STR = nullptr;
char macBuf[18] = {0};

/// Get MAC address as string.
void readMAC() {
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    snprintf(macBuf, sizeof(macBuf), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    DEVICE_MAC_STR = macBuf;
}

/// Configure static IP.
void configureStaticIP() {
    IPAddress ip(DEVICE_IP[0], DEVICE_IP[1], DEVICE_IP[2], DEVICE_IP[3]);
    IPAddress gateway(GATEWAY_IP);
    IPAddress subnet(SUBNET_MASK);
    IPAddress dns(DNS_IP);
    WiFi.config(ip, gateway, subnet, dns);
}

void setup() {
    Serial.begin(115200);
    delay(1000);

    // Kill Bluetooth
    btStop();
    esp_bt_controller_disable();

    readMAC();

    Serial.println("=========================================");
    Serial.println("  WI-FI TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  MAC: %s\n", DEVICE_MAC_STR);
    Serial.printf("  Target IP: %d.%d.%d.%d\n",
                  DEVICE_IP[0], DEVICE_IP[1], DEVICE_IP[2], DEVICE_IP[3]);
    Serial.println();

    // ----- Test 1: Wi-Fi connect with static IP -----
    Serial.println("Test 1: Wi-Fi connect...");
    WiFi.mode(WIFI_STA);
    configureStaticIP();

    unsigned long t0 = millis();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int dots = 0;
    while (WiFi.status() != WL_CONNECTED) {
        delay(250);
        Serial.print(".");
        dots++;
        if (dots > 60) {  // 15 second timeout
            Serial.println();
            Serial.println(">>> FAIL: Wi-Fi connection timeout");
            Serial.println("    Check: SSID and password in config.h");
            Serial.println("    Check: Router is on and in range");
            while (true) delay(1000);
        }
    }

    unsigned long connectTime = millis() - t0;
    Serial.println();
    Serial.printf("  Connected in %lums\n", connectTime);
    Serial.printf("  IP:   %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("  GW:   %s\n", WiFi.gatewayIP().toString().c_str());
    Serial.printf("  DNS:  %s\n", WiFi.dnsIP().toString().c_str());

    // Verify static IP was assigned correctly
    if (WiFi.localIP() == IPAddress(DEVICE_IP[0], DEVICE_IP[1], DEVICE_IP[2], DEVICE_IP[3])) {
        Serial.println(">>> PASS: Static IP matches\n");
    } else {
        Serial.println("  WARNING: IP doesn't match — DHCP may have overridden.\n");
    }

    // ----- Test 2: Signal strength -----
    Serial.println("Test 2: Signal strength...");
    int rssi = WiFi.RSSI();
    const char* strength = (rssi > -50) ? "Excellent" :
                           (rssi > -60) ? "Good" :
                           (rssi > -70) ? "Fair" : "Weak";
    Serial.printf("  RSSI: %d dBm (%s)\n", rssi, strength);
    Serial.printf("  Channel: %d\n", WiFi.channel());
    Serial.printf("  BSSID: %s\n", WiFi.BSSIDstr().c_str());
    Serial.println(">>> PASS\n");

    // ----- Test 3: NTP time sync -----
    Serial.println("Test 3: NTP time sync...");
    configTime(0, 0, "pool.ntp.org", "time.nist.gov");

    struct tm timeinfo;
    int ntpRetries = 0;
    while (!getLocalTime(&timeinfo) && ntpRetries < 10) {
        delay(500);
        ntpRetries++;
    }

    if (ntpRetries < 10) {
        char timeBuf[30];
        strftime(timeBuf, sizeof(timeBuf), "%Y-%m-%d %H:%M:%S UTC", &timeinfo);
        Serial.printf("  Time: %s\n", timeBuf);
        Serial.println(">>> PASS\n");
    } else {
        Serial.println("  WARNING: NTP sync failed (non-critical)\n");
    }

    // ----- Test 4: HTTP POST to Logic App -----
    Serial.println("Test 4: HTTP POST to HiveTelemetryIngest...");

    JsonDocument doc;
    doc["Weight"]          = 0.0;
    doc["InternalTemp"]    = 0.0;
    doc["BatteryVoltage"]  = 0.0;
    doc["HiveHum"]         = 0;
    doc["LegTemp"]         = 0.0;
    doc["HiveId"]          = "Hive1";
    doc["DeviceMAC"]       = DEVICE_MAC_STR;
    doc["DeviceName"]      = "FireBeetle Test - Scale 1";
    doc["FirmwareVersion"] = "TEST-0.0.0";

    String payload;
    serializeJson(doc, payload);

    Serial.printf("  Payload: %s\n", payload.c_str());

    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient http;
    http.begin(client, INGEST_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(30000);

    unsigned long postStart = millis();
    int httpCode = http.POST(payload);
    unsigned long postTime = millis() - postStart;

    if (httpCode > 0) {
        String response = http.getString();
        Serial.printf("  HTTP %d (%lums)\n", httpCode, postTime);
        Serial.printf("  Response: %s\n", response.substring(0, 200).c_str());

        if (httpCode >= 200 && httpCode < 300) {
            Serial.println(">>> PASS: Data reached Dataverse!\n");
        } else {
            Serial.printf("  WARNING: Non-2xx response (%d)\n\n", httpCode);
        }
    } else {
        Serial.printf(">>> FAIL: %s (%lums)\n\n", http.errorToString(httpCode).c_str(), postTime);
    }

    http.end();

    // ----- Summary -----
    Serial.println("=========================================");
    Serial.println("  WI-FI TEST COMPLETE");
    Serial.println("=========================================");
    Serial.printf("  MAC:     %s\n", DEVICE_MAC_STR);
    Serial.printf("  IP:      %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("  RSSI:    %d dBm\n", rssi);
    Serial.printf("  Connect: %lums\n", connectTime);
    Serial.printf("  POST:    HTTP %d (%lums)\n", httpCode, postTime);
    Serial.println("=========================================\n");

    // Disconnect
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);

    Serial.println("  Wi-Fi off. Test complete.");
    Serial.println("  Check Dataverse for a test reading from");
    Serial.printf("  '%s' with FirmwareVersion 'TEST-0.0.0'\n", DEVICE_MAC_STR);
}

void loop() {
    delay(10000);
}
