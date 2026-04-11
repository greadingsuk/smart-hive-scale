// ============================================================
// TEST: Button (Momentary Push) — FireBeetle 2 ESP32-E
// ============================================================
// Wiring:  One leg → GPIO 14 (D6), other leg → GND hub
//          Uses internal pull-up (reads HIGH normally, LOW pressed)
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-button
//
// What this tests:
//   1. GPIO 14 reads HIGH with internal pull-up (button open)
//   2. GPIO 14 reads LOW when button pressed
//   3. Debounce and press detection
//   4. Single press detection
//   5. Double press detection (two taps within 400ms)
//   6. Long press detection (hold 2+ seconds)
// ============================================================

#include <Arduino.h>

// ----- Pin definition -----
constexpr int BUTTON_PIN = 14;  // D6 on FireBeetle

// ----- Timing constants -----
constexpr unsigned long DEBOUNCE_MS     = 50;
constexpr unsigned long DOUBLE_PRESS_MS = 400;
constexpr unsigned long LONG_PRESS_MS   = 2000;

enum class PressType { NONE, SINGLE, DOUBLE, LONG };

/// Detect button press type. Blocks until press sequence resolves.
PressType detectPress() {
    // Wait for button press (LOW)
    while (digitalRead(BUTTON_PIN) == HIGH) delay(5);
    delay(DEBOUNCE_MS);

    // Measure hold duration
    unsigned long pressStart = millis();
    while (digitalRead(BUTTON_PIN) == LOW) {
        if (millis() - pressStart >= LONG_PRESS_MS) {
            // Wait for release
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

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=========================================");
    Serial.println("  BUTTON TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  Pin: GPIO %d (D6)\n", BUTTON_PIN);
    Serial.println("  Mode: INPUT_PULLUP (HIGH=open, LOW=pressed)");
    Serial.println();

    pinMode(BUTTON_PIN, INPUT_PULLUP);
    delay(100);

    // ----- Test 1: Pull-up state -----
    int state = digitalRead(BUTTON_PIN);
    Serial.printf("Test 1: Idle state = %s\n", state == HIGH ? "HIGH (correct)" : "LOW (PROBLEM!)");

    if (state == LOW) {
        Serial.println(">>> FAIL: Pin reads LOW without pressing");
        Serial.println("    Check: button GND wire connected?");
        Serial.println("    Check: button stuck/shorted?");
        while (true) delay(1000);
    }
    Serial.println(">>> PASS: Pull-up working\n");

    // ----- Test 2: Press detection -----
    Serial.println("Test 2: Press the button now...");
    while (digitalRead(BUTTON_PIN) == HIGH) delay(10);
    delay(DEBOUNCE_MS);
    Serial.println("  Button press detected!");
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    Serial.println("  Button released!");
    Serial.println(">>> PASS: Press/release cycle works\n");

    delay(500);

    // ----- Test 3: Press type detection -----
    Serial.println("=========================================");
    Serial.println("  PRESS TYPE DETECTION");
    Serial.println("=========================================");
    Serial.println("  Try each press type:");
    Serial.println("    - Quick tap     = SINGLE");
    Serial.println("    - Two quick taps = DOUBLE");
    Serial.println("    - Hold 2+ sec   = LONG");
    Serial.println("  Results print after each press.");
    Serial.println("=========================================\n");
}

void loop() {
    Serial.println("  Waiting for press...");
    PressType press = detectPress();

    switch (press) {
        case PressType::SINGLE:
            Serial.println("  >>> SINGLE press detected");
            break;
        case PressType::DOUBLE:
            Serial.println("  >>> DOUBLE press detected");
            break;
        case PressType::LONG:
            Serial.println("  >>> LONG press detected (2s+)");
            break;
        default:
            Serial.println("  >>> NONE");
            break;
    }
    Serial.println();
    delay(200);
}
