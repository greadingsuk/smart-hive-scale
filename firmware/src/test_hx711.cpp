// ============================================================
// TEST: HX711 + Load Cell — FireBeetle 2 ESP32-E
// ============================================================
// Wiring:  DAT → GPIO 25 (D2),  CLK → GPIO 26 (D3)
//          VCC → 3V3 (via lever nut hub),  GND → GND hub
// Load cell: NA4 single-point (non-standard wiring)
//   E+ = Red,  E- = Green,  A+ = White,  A- = Black
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-hx711
//
// What this tests:
//   1. HX711 powers up and responds (ready check)
//   2. Raw ADC value is sane (not zero, not saturated)
//   3. Stable readings (10-sample average, check noise)
//   4. Tare (set zero with nothing on scale)
//   5. Live weight stream (add/remove objects to confirm)
// ============================================================

#include <Arduino.h>
#include <HX711.h>

// ----- Pin definitions (FireBeetle D2/D3) -----
constexpr int HX711_DT_PIN  = 25;  // D2 on FireBeetle
constexpr int HX711_SCK_PIN = 26;  // D3 on FireBeetle

HX711 scale;

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=========================================");
    Serial.println("  HX711 TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  DAT: GPIO %d (D2)\n", HX711_DT_PIN);
    Serial.printf("  CLK: GPIO %d (D3)\n", HX711_SCK_PIN);
    Serial.println();

    // ----- Test 1: Init and ready check -----
    Serial.println("Test 1: HX711 init + ready check...");
    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);

    if (!scale.wait_ready_timeout(3000)) {
        Serial.println(">>> FAIL: HX711 not responding");
        Serial.println("    Check: DAT on D2 (GPIO 25)");
        Serial.println("    Check: CLK on D3 (GPIO 26)");
        Serial.println("    Check: VCC on 3V3 hub");
        Serial.println("    Check: Load cell wires seated in HX711 terminals");
        while (true) delay(1000);  // Halt
    }
    Serial.println(">>> PASS: HX711 is ready\n");

    // ----- Test 2: Raw ADC value check -----
    Serial.println("Test 2: Raw ADC reading...");

    // Discard first reading (settle after power-up)
    scale.read();
    delay(100);

    long raw = scale.read();
    Serial.printf("  Raw ADC value: %ld\n", raw);

    if (raw == 0) {
        Serial.println("  WARNING: Raw = 0 — load cell may not be connected");
    } else if (raw >= 8388607 || raw <= -8388608) {
        Serial.println("  WARNING: Saturated — check load cell wiring (E+/E-/A+/A-)");
    } else {
        Serial.println(">>> PASS: Raw value is sane\n");
    }

    // ----- Test 3: Stability check (10 samples) -----
    Serial.println("Test 3: Stability (10 raw samples)...");

    long samples[10];
    long sum = 0;
    for (int i = 0; i < 10; i++) {
        if (!scale.wait_ready_timeout(1000)) {
            Serial.printf("  Sample %d: TIMEOUT\n", i);
            samples[i] = 0;
        } else {
            samples[i] = scale.read();
            sum += samples[i];
        }
        Serial.printf("  [%d] %ld\n", i, samples[i]);
        delay(50);
    }

    float avg = sum / 10.0;
    long minVal = samples[0], maxVal = samples[0];
    for (int i = 1; i < 10; i++) {
        if (samples[i] < minVal) minVal = samples[i];
        if (samples[i] > maxVal) maxVal = samples[i];
    }
    long spread = maxVal - minVal;

    Serial.printf("  Average: %.0f\n", avg);
    Serial.printf("  Min: %ld  Max: %ld  Spread: %ld\n", minVal, maxVal, spread);

    if (spread < 1000) {
        Serial.println(">>> PASS: Very stable (spread < 1000)\n");
    } else if (spread < 5000) {
        Serial.println(">>> PASS: Acceptable (spread < 5000)\n");
    } else {
        Serial.println("  WARNING: Noisy — check wiring and connections\n");
    }

    // ----- Test 4: Tare -----
    Serial.println("Test 4: Tare (zeroing with current load)...");
    Serial.println("  Ensure nothing extra is on the load cell.");
    delay(2000);

    scale.set_scale();   // No calibration factor — raw units
    scale.tare(20);      // Average 20 readings for stable zero

    long offset = scale.get_offset();
    Serial.printf("  Tare offset: %ld\n", offset);
    Serial.println(">>> PASS: Tare complete\n");

    // ----- Test 5: Live stream -----
    Serial.println("=========================================");
    Serial.println("  Test 5: LIVE WEIGHT STREAM");
    Serial.println("  Place objects on / remove from the cell.");
    Serial.println("  Raw units (no calibration factor yet).");
    Serial.println("  Values should change when you add weight.");
    Serial.println("  Ctrl+C to stop.");
    Serial.println("=========================================\n");
}

void loop() {
    if (scale.wait_ready_timeout(1000)) {
        long reading = scale.get_value(5);  // 5-sample average, tared
        float raw_units = scale.get_units(5);
        Serial.printf("Tared: %ld  |  Units: %.1f\n", reading, raw_units);
    } else {
        Serial.println("HX711 not ready");
    }
    delay(500);
}
