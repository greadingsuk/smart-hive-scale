// ============================================================
// TEST: Battery ADC — FireBeetle 2 ESP32-E
// ============================================================
// No external wiring — FireBeetle has a built-in voltage
// divider on GPIO 34 connected to the battery rail.
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-battery
//
// What this tests:
//   1. ADC reads on GPIO 34 (built-in battery divider)
//   2. Voltage calculation with FireBeetle divider ratio
//   3. Stability (16-sample average)
//   4. Battery percentage estimation (18650 curve)
//   5. Live stream — insert battery to see real values
//
// NOTE: On USB power with no battery, readings will be
//       noisy/floating. This is expected. Insert the 18650
//       during the live stream to see real voltage.
// ============================================================

#include <Arduino.h>

// ----- Pin definition -----
constexpr int BATTERY_PIN = 34;  // Built-in voltage divider on FireBeetle

// FireBeetle 2 ESP32-E built-in divider ratio
// The schematic shows a voltage divider that halves the battery voltage
constexpr float DIVIDER_RATIO = 2.0;
constexpr float ADC_REF_VOLTAGE = 3.3;
constexpr int ADC_MAX = 4095;  // 12-bit ADC

/// Read battery voltage — 16-sample average for noise reduction.
float readBatteryVoltage() {
    long sum = 0;
    for (int i = 0; i < 16; i++) {
        sum += analogRead(BATTERY_PIN);
        delay(2);
    }
    float avgAdc = sum / 16.0;
    float voltage = (avgAdc / ADC_MAX) * ADC_REF_VOLTAGE * DIVIDER_RATIO;
    return voltage;
}

/// Convert battery voltage to percentage (18650 Li-ion curve).
/// 4.2V = 100%, 3.0V = 0%.
int batteryPercentage(float voltage) {
    if (voltage >= 4.2) return 100;
    if (voltage <= 3.0) return 0;
    if (voltage >= 4.0) return 80 + (int)((voltage - 4.0) / 0.2 * 20);
    if (voltage >= 3.7) return 30 + (int)((voltage - 3.7) / 0.3 * 50);
    return (int)((voltage - 3.0) / 0.7 * 30);
}

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=========================================");
    Serial.println("  BATTERY ADC TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  ADC Pin: GPIO %d (built-in divider)\n", BATTERY_PIN);
    Serial.println();

    // ----- Test 1: Raw ADC reading -----
    Serial.println("Test 1: Raw ADC value...");
    int raw = analogRead(BATTERY_PIN);
    Serial.printf("  Single raw read: %d (range 0–4095)\n", raw);

    if (raw == 0) {
        Serial.println("  INFO: ADC = 0 — no battery connected (expected on USB)");
    } else if (raw >= 4090) {
        Serial.println("  WARNING: ADC near max — possible short to VCC");
    } else {
        Serial.println(">>> PASS: ADC responding\n");
    }

    // ----- Test 2: Voltage calculation -----
    Serial.println("Test 2: Voltage calculation (16-sample avg)...");
    float voltage = readBatteryVoltage();
    int percent = batteryPercentage(voltage);

    Serial.printf("  Voltage: %.2fV\n", voltage);
    Serial.printf("  Percentage: %d%%\n", percent);

    if (voltage < 0.5) {
        Serial.println("  INFO: Low/no voltage — no battery (expected on USB)\n");
    } else if (voltage >= 3.0 && voltage <= 4.3) {
        Serial.println(">>> PASS: Voltage in valid 18650 range\n");
    } else if (voltage > 4.3) {
        Serial.println("  WARNING: Above 4.3V — check divider ratio\n");
    } else {
        Serial.printf("  INFO: %.2fV — possible USB backfeed or weak battery\n\n", voltage);
    }

    // ----- Test 3: Stability (10 consecutive reads) -----
    Serial.println("Test 3: Stability (10 averaged reads)...");
    float readings[10];
    float sum = 0;
    for (int i = 0; i < 10; i++) {
        readings[i] = readBatteryVoltage();
        sum += readings[i];
        Serial.printf("  [%d] %.3fV\n", i, readings[i]);
        delay(100);
    }

    float avg = sum / 10.0;
    float minV = readings[0], maxV = readings[0];
    for (int i = 1; i < 10; i++) {
        if (readings[i] < minV) minV = readings[i];
        if (readings[i] > maxV) maxV = readings[i];
    }
    float spread = maxV - minV;

    Serial.printf("  Average: %.3fV\n", avg);
    Serial.printf("  Min: %.3fV  Max: %.3fV  Spread: %.3fV\n", minV, maxV, spread);

    if (spread < 0.05) {
        Serial.println(">>> PASS: Very stable\n");
    } else if (spread < 0.2) {
        Serial.println(">>> PASS: Acceptable noise\n");
    } else {
        Serial.println("  WARNING: Noisy — normal without battery\n");
    }

    // ----- Live stream -----
    Serial.println("=========================================");
    Serial.println("  LIVE BATTERY STREAM (every 2 sec)");
    Serial.println("  Insert 18650 to see real voltage.");
    Serial.println("  Should read 3.0V–4.2V with battery.");
    Serial.println("=========================================\n");
}

void loop() {
    float voltage = readBatteryVoltage();
    int percent = batteryPercentage(voltage);
    int raw = analogRead(BATTERY_PIN);

    Serial.printf("  ADC: %d  |  %.2fV  |  %d%%", raw, voltage, percent);

    if (voltage < 0.5) {
        Serial.print("  [NO BATTERY]");
    } else if (voltage < 3.0) {
        Serial.print("  [CRITICAL]");
    } else if (voltage < 3.3) {
        Serial.print("  [LOW]");
    } else if (voltage < 3.7) {
        Serial.print("  [FAIR]");
    } else if (voltage < 4.0) {
        Serial.print("  [GOOD]");
    } else {
        Serial.print("  [FULL]");
    }

    Serial.println();
    delay(2000);
}
