// ============================================================
// TEST: Full Integration — FireBeetle 2 ESP32-E
// ============================================================
// Simulates one complete wake cycle of the golden master:
//   1. Read HX711 (weight)
//   2. Read DS18B20 x2 (hive + enclosure temps)
//   3. Read battery ADC
//   4. Display readings on OLED
//   5. Connect Wi-Fi (static IP)
//   6. POST to HiveTelemetryIngest Logic App
//   7. Show result on OLED
//   8. Deep sleep (30s for testing, button wake enabled)
//
// Pin Map (FireBeetle 2 ESP32-E):
//   OLED SDA    → GPIO 21 (bottom edge)
//   OLED SCL    → GPIO 22 (bottom edge)
//   HX711 DAT   → GPIO 25 / D2 (top edge)
//   HX711 CLK   → GPIO 26 / D3 (top edge)
//   DS18B20     → GPIO 13 / D7 (top edge)
//   Battery ADC → GPIO 34 (built-in)
//   Button      → GPIO 14 / D6 (top edge, ext0 wake)
//
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-integration
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
#include "config.h"

// ─── Pin Definitions ───────────────────────────────────────
constexpr int HX711_DT_PIN  = 25;   // D2
constexpr int HX711_SCK_PIN = 26;   // D3
constexpr int DS18B20_PIN   = 13;   // D7
constexpr int BATTERY_PIN   = 34;   // Built-in divider
constexpr int BUTTON_PIN    = 14;   // D6
constexpr int OLED_SDA      = 21;
constexpr int OLED_SCL      = 22;
constexpr int OLED_WIDTH    = 128;
constexpr int OLED_HEIGHT   = 64;

// ─── Sensor Objects ────────────────────────────────────────
HX711 scale;
OneWire oneWire(DS18B20_PIN);
DallasTemperature tempSensors(&oneWire);
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

// ─── DS18B20 Addresses (from test_ds18b20 enumeration) ────
DeviceAddress SENSOR_ENCLOSURE = {0x28, 0x80, 0xFE, 0x24, 0x00, 0x00, 0x00, 0x8E};
DeviceAddress SENSOR_HIVE     = {0x28, 0x93, 0x3E, 0x80, 0x00, 0x00, 0x00, 0x09};

// ─── Device Identity ──────────────────────────────────────
constexpr uint8_t DEVICE_IP[4] = {192, 168, 1, 75};
char deviceMAC[18] = {0};

// ─── Constants ─────────────────────────────────────────────
constexpr float DEFAULT_CAL_FACTOR = -22050.0;
constexpr int HX711_SAMPLES = 10;
constexpr float DIVIDER_RATIO = 2.0;
constexpr float ADC_REF_VOLTAGE = 3.3;
constexpr int ADC_MAX = 4095;
constexpr uint64_t SLEEP_DURATION_US = 30ULL * 1000000ULL;  // 30s for testing

// ─── RTC Memory ───────────────────────────────────────────
RTC_DATA_ATTR int bootCount = 0;

// ─── Helper: Read MAC ─────────────────────────────────────
void readMAC() {
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    snprintf(deviceMAC, sizeof(deviceMAC), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
}

// ─── Helper: Battery ──────────────────────────────────────
float readBatteryVoltage() {
    long sum = 0;
    for (int i = 0; i < 16; i++) {
        sum += analogRead(BATTERY_PIN);
        delay(2);
    }
    float avgAdc = sum / 16.0;
    return (avgAdc / ADC_MAX) * ADC_REF_VOLTAGE * DIVIDER_RATIO;
}

int batteryPercentage(float voltage) {
    if (voltage >= 4.2) return 100;
    if (voltage <= 3.0) return 0;
    if (voltage >= 4.0) return 80 + (int)((voltage - 4.0) / 0.2 * 20);
    if (voltage >= 3.7) return 30 + (int)((voltage - 3.7) / 0.3 * 50);
    return (int)((voltage - 3.0) / 0.7 * 30);
}

// ─── Helper: OLED ─────────────────────────────────────────
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

void oledShow(const char* title, const char* l1 = nullptr,
              const char* l2 = nullptr, const char* l3 = nullptr,
              const char* l4 = nullptr) {
    if (!oledReady) return;
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(0, 4);  display.println(title);
    if (l1) { display.setCursor(0, 18); display.println(l1); }
    if (l2) { display.setCursor(0, 30); display.println(l2); }
    if (l3) { display.setCursor(0, 42); display.println(l3); }
    if (l4) { display.setCursor(0, 54); display.println(l4); }
    display.display();
}

void oledOff() {
    if (!oledReady) return;
    display.clearDisplay();
    display.display();
    display.ssd1306_command(SSD1306_DISPLAYOFF);
}

// ─── Helper: Deep Sleep ───────────────────────────────────
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
void setup() {
    Serial.begin(115200);
    delay(500);

    bootCount++;
    btStop();
    esp_bt_controller_disable();
    readMAC();

    // Wake reason
    esp_sleep_wakeup_cause_t wakeReason = esp_sleep_get_wakeup_cause();
    const char* wakeStr = "POWER ON";
    if (wakeReason == ESP_SLEEP_WAKEUP_TIMER) wakeStr = "TIMER";
    if (wakeReason == ESP_SLEEP_WAKEUP_EXT0)  wakeStr = "BUTTON";

    Serial.println();
    Serial.println("=========================================");
    Serial.println("  INTEGRATION TEST — FireBeetle 2");
    Serial.printf("  Boot #%d | Wake: %s\n", bootCount, wakeStr);
    Serial.printf("  MAC: %s\n", deviceMAC);
    Serial.println("=========================================\n");

    // ─── OLED Init ─────────────────────────────────────────
    initOLED();
    char buf1[32], buf2[32], buf3[32], buf4[32];
    snprintf(buf1, sizeof(buf1), "Boot #%d  %s", bootCount, wakeStr);
    oledShow("READING SENSORS...", buf1);

    // ─── Step 1: HX711 Weight ──────────────────────────────
    Serial.println("Step 1: HX711...");
    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
    float weight = 0.0;

    if (scale.wait_ready_timeout(2000)) {
        scale.read();  // Discard first
        if (scale.wait_ready_timeout(1000)) {
            scale.set_scale(DEFAULT_CAL_FACTOR);
            weight = scale.get_units(HX711_SAMPLES);
            if (weight <= -8388600.0 || weight >= 8388600.0) weight = 0.0;
        }
    }
    scale.power_down();
    Serial.printf("  Weight: %.2f kg\n", weight);

    // ─── Step 2: DS18B20 Temperatures ──────────────────────
    Serial.println("Step 2: DS18B20...");
    tempSensors.begin();
    tempSensors.setResolution(12);
    tempSensors.setWaitForConversion(true);
    tempSensors.requestTemperatures();

    float hiveTemp = tempSensors.getTempC(SENSOR_HIVE);
    float enclosureTemp = tempSensors.getTempC(SENSOR_ENCLOSURE);

    // Filter 85.0 (power-on reset) and -127 (disconnected)
    if (hiveTemp == 85.0 || hiveTemp == DEVICE_DISCONNECTED_C) hiveTemp = 0.0;
    if (enclosureTemp == 85.0 || enclosureTemp == DEVICE_DISCONNECTED_C) enclosureTemp = 0.0;

    Serial.printf("  Hive temp:      %.2f C\n", hiveTemp);
    Serial.printf("  Enclosure temp: %.2f C\n", enclosureTemp);

    // ─── Step 3: Battery ───────────────────────────────────
    Serial.println("Step 3: Battery...");
    float battV = readBatteryVoltage();
    int battPct = batteryPercentage(battV);
    Serial.printf("  Battery: %.2fV (%d%%)\n", battV, battPct);

    // ─── Update OLED with readings ─────────────────────────
    snprintf(buf1, sizeof(buf1), "Wt: %.2f kg", weight);
    snprintf(buf2, sizeof(buf2), "Hive: %.1fC  Box: %.1fC", hiveTemp, enclosureTemp);
    snprintf(buf3, sizeof(buf3), "Bat: %.2fV  %d%%", battV, battPct);
    oledShow("SENSOR READINGS", buf1, buf2, buf3, "Connecting Wi-Fi...");

    // ─── Step 4: Wi-Fi ─────────────────────────────────────
    Serial.println("Step 4: Wi-Fi...");
    WiFi.mode(WIFI_STA);
    IPAddress ip(DEVICE_IP[0], DEVICE_IP[1], DEVICE_IP[2], DEVICE_IP[3]);
    IPAddress gateway(GATEWAY_IP);
    IPAddress subnet(SUBNET_MASK);
    IPAddress dns(DNS_IP);
    WiFi.config(ip, gateway, subnet, dns);

    unsigned long t0 = millis();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    bool wifiOk = false;
    while (millis() - t0 < 15000) {
        if (WiFi.status() == WL_CONNECTED) { wifiOk = true; break; }
        delay(100);
    }

    if (!wifiOk) {
        Serial.println("  Wi-Fi FAILED — sleeping");
        oledShow("WI-FI FAILED", "Sleeping 30s...");
        delay(3000);
        oledOff();
        enterDeepSleep();
    }

    unsigned long connectMs = millis() - t0;
    Serial.printf("  Connected: %s (%lums)\n", WiFi.localIP().toString().c_str(), connectMs);

    // ─── Step 5: POST to Logic App ─────────────────────────
    Serial.println("Step 5: POST...");
    oledShow("SENSOR READINGS", buf1, buf2, buf3, "POSTing to Azure...");

    JsonDocument doc;
    doc["Weight"]          = weight;
    doc["InternalTemp"]    = hiveTemp;
    doc["BatteryVoltage"]  = battV;
    doc["HiveHum"]         = 0;
    doc["LegTemp"]         = enclosureTemp;
    doc["HiveId"]          = "Hive1";
    doc["DeviceMAC"]       = deviceMAC;
    doc["DeviceName"]      = "IoT Hive Stand 1";
    doc["FirmwareVersion"] = "INTEGRATION-TEST";

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
    unsigned long postMs = millis() - postStart;

    if (httpCode >= 200 && httpCode < 300) {
        Serial.printf("  HTTP %d (%lums) — SUCCESS\n", httpCode, postMs);
        snprintf(buf4, sizeof(buf4), "POST OK %d (%lums)", httpCode, postMs);
    } else if (httpCode > 0) {
        Serial.printf("  HTTP %d (%lums) — NON-2XX\n", httpCode, postMs);
        snprintf(buf4, sizeof(buf4), "POST %d (%lums)", httpCode, postMs);
    } else {
        Serial.printf("  POST FAIL: %s (%lums)\n", http.errorToString(httpCode).c_str(), postMs);
        snprintf(buf4, sizeof(buf4), "POST FAIL (%lums)", postMs);
    }
    http.end();

    // ─── Final OLED ────────────────────────────────────────
    oledShow("CYCLE COMPLETE", buf1, buf2, buf3, buf4);
    delay(5000);

    // ─── Summary ───────────────────────────────────────────
    Serial.println();
    Serial.println("=========================================");
    Serial.println("  INTEGRATION CYCLE COMPLETE");
    Serial.println("=========================================");
    Serial.printf("  Boot:    #%d (%s)\n", bootCount, wakeStr);
    Serial.printf("  Weight:  %.2f kg\n", weight);
    Serial.printf("  Hive:    %.2f C\n", hiveTemp);
    Serial.printf("  Box:     %.2f C\n", enclosureTemp);
    Serial.printf("  Battery: %.2fV (%d%%)\n", battV, battPct);
    Serial.printf("  Wi-Fi:   %lums\n", connectMs);
    Serial.printf("  POST:    HTTP %d (%lums)\n", httpCode, postMs);
    Serial.println("=========================================");
    Serial.println("  Sleeping 30s (or press button to wake)");
    Serial.println("=========================================\n");

    // ─── Sleep ─────────────────────────────────────────────
    oledOff();
    enterDeepSleep();
}

void loop() {
    // Never reached
}
