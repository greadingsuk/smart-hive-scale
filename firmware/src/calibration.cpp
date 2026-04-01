// ============================================================
// HX711 Calibration Sketch — ESP32
// ============================================================
// Wiring:  HX711 DT → GPIO 16,  HX711 SCK → GPIO 4
// Usage:   Upload this file (rename main.cpp temporarily),
//          open Serial Monitor at 115200 baud,
//          follow the on-screen instructions.
// ============================================================

#include <Arduino.h>
#include <HX711.h>

// ----- Pin definitions (must match your wiring) -----
constexpr int HX711_DT_PIN  = 16;
constexpr int HX711_SCK_PIN = 4;

// ----- Calibration state -----
float calibration_factor = -7050.0;  // Starting guess — will be adjusted
float step = 500.0;                  // Adjustment per keypress (press 's' to shrink)

HX711 scale;

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=============================================");
    Serial.println("  HX711 Calibration Sketch");
    Serial.println("=============================================");
    Serial.println();
    Serial.println("INSTRUCTIONS:");
    Serial.println("  1. Remove ALL weight from the scale.");
    Serial.println("  2. Wait for tare to complete (below).");
    Serial.println("  3. Place a KNOWN weight on the scale.");
    Serial.println("  4. Use Serial Monitor input to adjust:");
    Serial.println("       '+'  or  'a'  → increase factor");
    Serial.println("       '-'  or  'z'  → decrease factor");
    Serial.println("  5. Keep adjusting until the reading matches");
    Serial.println("     your known weight (in your desired unit).");
    Serial.println("  6. Note the final calibration_factor value.");
    Serial.println("=============================================");
    Serial.println();

    scale.begin(HX711_DT_PIN, HX711_SCK_PIN);

    Serial.println("Taring... ensure the scale is empty.");
    scale.set_scale();
    scale.tare(20);  // Average 20 readings for a stable zero
    Serial.println("Tare complete.");
    Serial.println();

    scale.set_scale(calibration_factor);

    Serial.print("Starting calibration_factor: ");
    Serial.println(calibration_factor, 1);
    Serial.println("Place your known weight now, then adjust with +/a or -/z.");
    Serial.println();
}

void loop() {
    // Read and display
    long raw = scale.read_average(5);   // Raw ADC value (no tare/calibration)
    float weight = scale.get_units(10); // Calibrated value
    Serial.print("RAW: ");
    Serial.print(raw);
    Serial.print("  |  Weight: ");
    Serial.print(weight, 2);
    Serial.print("  |  calibration_factor: ");
    Serial.println(calibration_factor, 1);

    // Check for serial input
    if (Serial.available()) {
        char c = Serial.read();
        switch (c) {
            case '+':
            case 'a':
                calibration_factor += step;
                break;
            case '-':
            case 'z':
                calibration_factor -= step;
                break;
            case 's':
                step = step / 10.0;
                if (step < 1.0) step = 1.0;
                Serial.print(">> Step size now: ");
                Serial.println(step, 1);
                break;
            case 't':
                Serial.println(">> Re-taring... remove all weight!");
                delay(2000);
                scale.tare(20);
                Serial.println(">> Tare complete.");
                break;
            default:
                break;
        }
        scale.set_scale(calibration_factor);
    }
}
