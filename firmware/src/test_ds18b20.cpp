// ============================================================
// TEST: Dual DS18B20 Temperature Sensors — FireBeetle 2 ESP32-E
// ============================================================
// Wiring:  DATA → GPIO 13 (D7), shared 1-Wire bus
//          VCC → 3V3 (via lever nut hub),  GND → GND hub
//          4.7kΩ pull-up on terminal block (built-in)
// Sensors: #1 Waterproof probe (hive internal)
//          #2 Bare TO-92 chip (enclosure temp)
// Board:   DFRobot FireBeetle 2 ESP32-E (DFR0654)
// PlatformIO env: fb-test-ds18b20
//
// What this tests:
//   1. 1-Wire bus init on GPIO 13
//   2. Device enumeration (must find exactly 2 sensors)
//   3. Print 64-bit ROM addresses (needed for golden master)
//   4. Read temperature from each sensor by address
//   5. Live stream both sensors side-by-side
//   6. Sensor identification — warm one with your fingers
// ============================================================

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ----- Pin definition -----
constexpr int DS18B20_PIN = 13;  // D7 on FireBeetle

OneWire oneWire(DS18B20_PIN);
DallasTemperature sensors(&oneWire);

// Storage for discovered sensor addresses
DeviceAddress sensor1Addr, sensor2Addr;
int deviceCount = 0;

/// Print a DS18B20 64-bit ROM address in hex format.
void printAddress(DeviceAddress addr) {
    for (int i = 0; i < 8; i++) {
        if (addr[i] < 0x10) Serial.print("0");
        Serial.print(addr[i], HEX);
        if (i < 7) Serial.print(":");
    }
}

/// Print address as a C++ byte array initialiser for devices.h
void printAddressAsCode(const char* name, DeviceAddress addr) {
    Serial.printf("  // %s\n", name);
    Serial.print("  { ");
    for (int i = 0; i < 8; i++) {
        Serial.printf("0x%02X", addr[i]);
        if (i < 7) Serial.print(", ");
    }
    Serial.println(" }");
}

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("=========================================");
    Serial.println("  DS18B20 TEST — FireBeetle 2 ESP32-E");
    Serial.println("=========================================");
    Serial.printf("  DATA: GPIO %d (D7)\n", DS18B20_PIN);
    Serial.println("  Expected: 2 sensors on shared bus");
    Serial.println();

    // ----- Test 1: Init 1-Wire bus -----
    Serial.println("Test 1: 1-Wire bus init...");
    sensors.begin();
    deviceCount = sensors.getDeviceCount();

    Serial.printf("  Devices found: %d\n", deviceCount);

    if (deviceCount == 0) {
        Serial.println(">>> FAIL: No sensors found");
        Serial.println("    Check: DATA wire on D7 (GPIO 13)");
        Serial.println("    Check: 4.7k pull-up present on terminal block");
        Serial.println("    Check: VCC on 3V3 hub, GND on GND hub");
        Serial.println("    Check: TO-92 legs not swapped (GND/VCC)");
        while (true) delay(1000);
    }

    if (deviceCount == 1) {
        Serial.println("  WARNING: Only 1 sensor found");
        Serial.println("    The second sensor may be wired incorrectly");
        Serial.println("    or the TO-92 legs are swapped.");
        Serial.println("    Continuing with 1 sensor...\n");
    }

    if (deviceCount >= 2) {
        Serial.println(">>> PASS: Both sensors detected\n");
    }

    // ----- Test 2: Enumerate ROM addresses -----
    Serial.println("Test 2: ROM address enumeration...");
    Serial.println("  ┌─────────────────────────────────────┐");

    if (deviceCount >= 1 && sensors.getAddress(sensor1Addr, 0)) {
        Serial.print("  │ Sensor 0: ");
        printAddress(sensor1Addr);
        Serial.println(" │");
    }

    if (deviceCount >= 2 && sensors.getAddress(sensor2Addr, 1)) {
        Serial.print("  │ Sensor 1: ");
        printAddress(sensor2Addr);
        Serial.println(" │");
    }

    Serial.println("  └─────────────────────────────────────┘");
    Serial.println();

    // Print as C++ code for the golden master
    Serial.println("  Copy these addresses for the golden master:");
    Serial.println("  ──────────────────────────────────────────");
    if (deviceCount >= 1) printAddressAsCode("Sensor 0 (identify below)", sensor1Addr);
    if (deviceCount >= 2) printAddressAsCode("Sensor 1 (identify below)", sensor2Addr);
    Serial.println("  ──────────────────────────────────────────\n");

    // ----- Test 3: Set resolution and first read -----
    Serial.println("Test 3: Temperature read (12-bit)...");
    sensors.setResolution(12);
    sensors.setWaitForConversion(true);
    sensors.requestTemperatures();

    for (int i = 0; i < deviceCount && i < 2; i++) {
        float tempC = sensors.getTempCByIndex(i);
        Serial.printf("  Sensor %d: %.2f C", i, tempC);

        if (tempC == DEVICE_DISCONNECTED_C) {
            Serial.println(" — DISCONNECTED");
        } else if (tempC == 85.0) {
            Serial.println(" — power-on reset (normal on first boot)");
        } else {
            Serial.println(" — OK");
        }
    }
    Serial.println();

    // ----- Sensor identification -----
    Serial.println("=========================================");
    Serial.println("  SENSOR IDENTIFICATION");
    Serial.println("=========================================");
    Serial.println("  To identify which address is which:");
    Serial.println("  1. Pinch the BARE TO-92 chip between");
    Serial.println("     your fingers to warm it up.");
    Serial.println("  2. Watch which sensor's temp rises.");
    Serial.println("  3. That address = enclosure sensor.");
    Serial.println("  4. The other = waterproof hive probe.");
    Serial.println("=========================================\n");

    Serial.println("  Live stream starting... (every 2 sec)");
    Serial.println();
}

void loop() {
    sensors.requestTemperatures();

    Serial.print("  ");
    for (int i = 0; i < deviceCount && i < 2; i++) {
        float tempC = sensors.getTempCByIndex(i);
        if (i > 0) Serial.print("  |  ");
        Serial.printf("Sensor %d: %.2f C", i, tempC);
    }

    if (deviceCount >= 2) {
        float diff = sensors.getTempCByIndex(0) - sensors.getTempCByIndex(1);
        Serial.printf("  |  Delta: %.2f C", diff);
    }

    Serial.println();
    delay(2000);
}
