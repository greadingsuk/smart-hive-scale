// ============================================================
// TEST: Deep Sleep + Wake — FireBeetle 2 ESP32-E
// ============================================================
// Tests:
//   1. RTC memory survives deep sleep (boot counter)
//   2. Timer wake (10 second sleep — short for testing)
//   3. Button wake (ext0 on GPIO 14/D6, active LOW)
//   4. Wake reason detection
//   5. Serial re-init after wake
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-sleep
//
// Flow:
//   Boot → print info → wait 5s (so you can read serial)
//   → enter deep sleep with timer (10s) + button (GPIO 14) wake
//   → wake → repeat
//
// To test button wake: press button DURING the sleep period.
// To test timer wake: just wait 10 seconds.
// ============================================================

#include <Arduino.h>
#include <esp_wifi.h>
#include <esp_bt.h>

// ----- Pin definition -----
constexpr int BUTTON_PIN = 14;  // D6 on FireBeetle

// ----- Sleep duration (short for testing) -----
constexpr uint64_t SLEEP_DURATION_US = 10ULL * 1000000ULL;  // 10 seconds

// ----- RTC Memory (survives deep sleep) -----
RTC_DATA_ATTR int bootCount = 0;
RTC_DATA_ATTR int timerWakes = 0;
RTC_DATA_ATTR int buttonWakes = 0;

/// Get human-readable wake reason string.
const char* getWakeReason() {
    esp_sleep_wakeup_cause_t reason = esp_sleep_get_wakeup_cause();
    switch (reason) {
        case ESP_SLEEP_WAKEUP_TIMER:    timerWakes++;  return "TIMER (10s expired)";
        case ESP_SLEEP_WAKEUP_EXT0:     buttonWakes++; return "BUTTON (GPIO 14 / D6)";
        case ESP_SLEEP_WAKEUP_EXT1:     return "EXT1";
        case ESP_SLEEP_WAKEUP_TOUCHPAD: return "TOUCHPAD";
        case ESP_SLEEP_WAKEUP_ULP:      return "ULP";
        default:                        return "POWER ON / RESET";
    }
}

void setup() {
    Serial.begin(115200);
    delay(500);  // Brief settle for serial

    bootCount++;
    const char* reason = getWakeReason();

    Serial.println();
    Serial.println("=========================================");
    Serial.println("  DEEP SLEEP TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  Boot #%d\n", bootCount);
    Serial.printf("  Wake reason: %s\n", reason);
    Serial.printf("  Timer wakes:  %d\n", timerWakes);
    Serial.printf("  Button wakes: %d\n", buttonWakes);
    Serial.println("=========================================");

    if (bootCount == 1) {
        Serial.println();
        Serial.println("  FIRST BOOT — Power-on or reset.");
        Serial.println("  RTC memory initialised.");
        Serial.println();
        Serial.println("  TEST PLAN:");
        Serial.println("  1. Board will sleep for 10 seconds");
        Serial.println("     → should auto-wake (TIMER)");
        Serial.println("  2. On next sleep, press the button");
        Serial.println("     → should wake early (BUTTON)");
        Serial.println("  3. Watch boot count increment each wake");
        Serial.println("     → proves RTC memory survives sleep");
    }

    Serial.println();
    Serial.printf("  Sleeping in 5 seconds...\n");
    Serial.printf("  Press button during sleep to test wake.\n");
    Serial.println("=========================================");
    Serial.println();

    // Countdown so user can read the output
    for (int i = 5; i > 0; i--) {
        Serial.printf("  %d...\n", i);
        delay(1000);
    }

    Serial.println("  Entering deep sleep NOW");
    Serial.flush();

    // Kill radios
    btStop();
    esp_bt_controller_disable();

    // Configure wake sources
    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
    esp_sleep_enable_ext0_wakeup((gpio_num_t)BUTTON_PIN, 0);  // 0 = wake on LOW

    // Enter deep sleep
    esp_deep_sleep_start();
}

void loop() {
    // Never reached — deep sleep restarts from setup()
}
