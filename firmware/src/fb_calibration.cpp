// ============================================================
// HX711 Calibration Sketch — FireBeetle 2 ESP32-E
// ============================================================
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// Wiring:  HX711 DT → GPIO 25 (D2),  HX711 SCK → GPIO 26 (D3)
// Load:    4x 50kg half-bridge cells in Wheatstone bridge
//          via custom summing box → 4-core umbilical → HX711
// PlatformIO env: fb-calibration
//
// INSTRUCTIONS:
//   1. Upload this sketch and open Serial Monitor (115200)
//   2. Ensure the scale is EMPTY (no hive, nothing on it)
//   3. Wait for "Tare complete" message
//   4. Place your KNOWN weight (1kg bag of sugar) on the scale
//   5. Use serial input to adjust the calibration factor:
//        'a' or '+'  → increase factor (reading too low)
//        'z' or '-'  → decrease factor (reading too high)
//        's'         → shrink step size (500 → 50 → 5 → 1)
//        't'         → re-tare (remove all weight first!)
//        'r'         → print raw-only values (diagnostic)
//   6. Keep adjusting until "Weight" reads exactly 1.00
//   7. Note the final calibration_factor value
//   8. Long-press the button on the golden master to save it
//      via NVS, OR update DEFAULT_CALIBRATION_FACTOR in main_v2.cpp
// ============================================================

#include <Arduino.h>
#include <HX711.h>

// ----- Pin definitions (FireBeetle 2 ESP32-E) -----
constexpr int HX711_DT_PIN  = 25;  // D2
constexpr int HX711_SCK_PIN = 26;  // D3

// ----- Calibration state -----
float calibration_factor = -7050.0;  // Starting guess — will be adjusted
float step = 500.0;                  // Adjustment per keypress

HX711 scale;

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=============================================");
    Serial.println("  HX711 CALIBRATION — FireBeetle 2 ESP32-E");
    Serial.println("  4x 50kg Load Cell Array (Wheatstone Bridge)");
    Serial.println("=============================================");
    Serial.printf("  DT:  GPIO %d (D2)\n", HX711_DT_PIN);
    Serial.printf("  SCK: GPIO %d (D3)\n", HX711_SCK_PIN);
    Serial.println();
    Serial.println("CONTROLS:");
    Serial.println("  'a' / '+'  → increase factor");
    Serial.println("  'z' / '-'  → decrease factor");
    Serial.println("  's'        → shrink step (500→50→5→1)");
    Serial.println("  't'        → re-tare (empty scale first!)");
    Serial.println("  'r'        → raw diagnostic dump");
    Serial.println("=============================================");
    Serial.println();

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);

    if (!scale.wait_ready_timeout(3000)) {
        Serial.println("ERROR: HX711 not responding!");
        Serial.println("Check: DT on D2 (GPIO 25), SCK on D3 (GPIO 26)");
        Serial.println("Check: VCC on 3V3, GND connected");
        while (true) delay(1000);
    }

    Serial.println("HX711 detected. Taring...");
    Serial.println(">> Ensure the scale is COMPLETELY EMPTY <<");
    delay(2000);

    scale.set_scale();
    scale.tare(20);  // Average 20 readings for stable zero

    long tare_offset = scale.get_offset();
    Serial.printf("Tare complete. Offset: %ld\n", tare_offset);
    Serial.println();

    scale.set_scale(calibration_factor);

    Serial.printf("Starting factor: %.1f  |  Step: %.1f\n", calibration_factor, step);
    Serial.println("Place your 1kg known weight now, then adjust.");
    Serial.println();
}

void loop() {
    // Read and display
    long raw = scale.read_average(5);
    float weight = scale.get_units(10);

    Serial.printf("RAW: %ld  |  Weight: %.2f kg  |  Factor: %.1f  |  Step: %.1f\n",
                  raw, weight, calibration_factor, step);

    // Check for serial input
    if (Serial.available()) {
        String input = Serial.readStringUntil('\n');
        input.trim();
        
        if (input.length() == 0) {
            // skip
        } else if (input == "a" || input == "+") {
            calibration_factor += step;
            Serial.printf(">> Factor: %.1f (+%.1f)\n", calibration_factor, step);
        } else if (input == "z" || input == "-") {
            calibration_factor -= step;
            Serial.printf(">> Factor: %.1f (-%.1f)\n", calibration_factor, step);
        } else if (input == "s") {
            step = step / 10.0;
            if (step < 1.0) step = 1.0;
            Serial.printf(">> Step size now: %.1f\n", step);
        } else if (input == "S") {
            step = step * 10.0;
            if (step > 10000.0) step = 10000.0;
            Serial.printf(">> Step size now: %.1f\n", step);
        } else if (input == "t") {
            Serial.println(">> Re-taring... remove ALL weight!");
            delay(3000);
            scale.tare(20);
            Serial.printf(">> Tare complete. Offset: %ld\n", scale.get_offset());
        } else if (input == "r") {
            Serial.println(">> RAW DIAGNOSTIC (10 samples):");
            for (int i = 0; i < 10; i++) {
                long r = scale.read();
                Serial.printf("  [%d] %ld\n", i, r);
                delay(100);
            }
            long avg = scale.read_average(20);
            Serial.printf("  Average (20): %ld\n", avg);
        } else {
            // Try to parse as a number — direct factor entry
            float val = input.toFloat();
            if (val != 0.0) {
                calibration_factor = val;
                Serial.printf(">> Factor SET to: %.1f\n", calibration_factor);
            }
        }
        scale.set_scale(calibration_factor);
    }
}
