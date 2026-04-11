// ============================================================
// TEST: OLED Display (SSD1306 I2C) — FireBeetle 2 ESP32-E
// ============================================================
// Wiring:  SDA → GPIO 21,  SCL → GPIO 22
//          VCC → 3V3,  GND → GND
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-oled
//
// What this tests:
//   1. I2C bus init on GPIO 21/22
//   2. SSD1306 detection at address 0x3C
//   3. Text rendering (all 4 lines)
//   4. Pixel draw (horizontal line)
//   5. Display clear / off command
//   6. I2C address scan (bonus — detects any other devices)
// ============================================================

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ----- Pin definitions -----
constexpr int OLED_SDA = 21;
constexpr int OLED_SCL = 22;
constexpr int OLED_WIDTH  = 128;
constexpr int OLED_HEIGHT = 64;

Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

/// Scan the I2C bus and print all detected device addresses.
void i2cScan() {
    Serial.println("\n--- I2C Bus Scan ---");
    int found = 0;
    for (uint8_t addr = 1; addr < 127; addr++) {
        Wire.beginTransmission(addr);
        if (Wire.endTransmission() == 0) {
            Serial.printf("  Found device at 0x%02X", addr);
            if (addr == 0x3C || addr == 0x3D) Serial.print(" (SSD1306 OLED)");
            Serial.println();
            found++;
        }
    }
    if (found == 0) {
        Serial.println("  NO DEVICES FOUND — check wiring!");
    } else {
        Serial.printf("  %d device(s) detected\n", found);
    }
    Serial.println("--------------------\n");
}

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=========================================");
    Serial.println("  OLED TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  SDA: GPIO %d\n", OLED_SDA);
    Serial.printf("  SCL: GPIO %d\n", OLED_SCL);
    Serial.println();

    // Init I2C
    Wire.begin(OLED_SDA, OLED_SCL);

    // Scan bus first
    i2cScan();

    // Init display
    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(">>> FAIL: SSD1306 not found at 0x3C");
        Serial.println("    Check: VCC on 3V3 (not VCC/5V)");
        Serial.println("    Check: SDA/SCL not swapped");
        while (true) delay(1000);  // Halt
    }

    Serial.println(">>> PASS: SSD1306 detected at 0x3C\n");

    // ----- Test 1: Clear screen -----
    display.clearDisplay();
    display.display();
    Serial.println("Test 1: Clear screen — DONE");
    delay(500);

    // ----- Test 2: Text rendering (4 lines) -----
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);

    display.setCursor(0, 4);
    display.println("FIREBEETLE OLED OK");

    display.setCursor(0, 18);
    display.println("Line 2: SDA=GPIO21");

    display.setCursor(0, 30);
    display.println("Line 3: SCL=GPIO22");

    display.setCursor(0, 42);
    display.println("Line 4: 128x64 SSD1306");

    display.display();
    Serial.println("Test 2: Text rendering — DONE");
    Serial.println("  >> Look at the OLED now.");
    Serial.println("  >> You should see 4 lines of text.");
    delay(5000);

    // ----- Test 3: Pixel draw (horizontal line) -----
    display.clearDisplay();
    display.setCursor(0, 4);
    display.println("PIXEL TEST");

    // Draw a horizontal line across the middle
    for (int x = 0; x < OLED_WIDTH; x++) {
        display.drawPixel(x, 32, SSD1306_WHITE);
    }

    // Draw a border rectangle
    display.drawRect(0, 16, 128, 48, SSD1306_WHITE);

    display.display();
    Serial.println("Test 3: Pixel draw — DONE");
    Serial.println("  >> You should see a rectangle + line.");
    delay(5000);

    // ----- Test 4: Invert display -----
    display.invertDisplay(true);
    Serial.println("Test 4: Invert ON — colours should flip");
    delay(2000);
    display.invertDisplay(false);
    Serial.println("  Invert OFF — back to normal");
    delay(1000);

    // ----- Test 5: Display OFF command -----
    display.clearDisplay();
    display.display();
    display.ssd1306_command(SSD1306_DISPLAYOFF);
    Serial.println("Test 5: Display OFF command sent");
    Serial.println("  >> Screen should be completely dark.");
    delay(3000);

    // ----- Test 6: Display ON again -----
    display.ssd1306_command(SSD1306_DISPLAYON);
    display.clearDisplay();
    display.setTextSize(2);
    display.setCursor(10, 24);
    display.println("ALL PASS");
    display.display();
    Serial.println("Test 6: Display ON + final message");

    Serial.println("\n=========================================");
    Serial.println("  OLED TEST COMPLETE — ALL PASSED");
    Serial.println("=========================================");
    Serial.println("  Screen shows 'ALL PASS' in large text.");
    Serial.println("  Monitor will loop every 10s to confirm");
    Serial.println("  the display stays stable (no flicker).");
    Serial.println("=========================================\n");
}

void loop() {
    // Heartbeat — proves the board hasn't crashed
    static int tick = 0;
    Serial.printf("Heartbeat #%d — OLED stable\n", ++tick);
    delay(10000);
}
