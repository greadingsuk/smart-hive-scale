// ============================================================
// devices.h — Device Registry (MAC → Config)
// ============================================================
// Each ESP32 has a unique MAC address burned into silicon.
// At boot, the firmware reads its MAC and looks up its config here.
//
// HIVE ASSIGNMENT: The hiveId here is a FALLBACK only.
// The Logic App resolves the actual hive from the gr_device
// table in Dataverse (Assigned Hive dropdown in the web app).
// To move a scale to a different hive, change the dropdown —
// no firmware reflash needed.
//
// FLEET MIGRATION: All scales standardised to DFRobot FireBeetle 2
// ESP32-E (DFR0654) as of v2.0.0. Old Wemos boards are retired.
//
// To add a new device:
//   1. Flash the firmware — it will print its MAC to serial and halt
//   2. Copy the MAC into a new entry below
//   3. Assign a static IP and friendly name
//   4. Reflash — it will self-configure on next boot
//   5. Register the device in the web app (Device Health page)
//   6. Set the Assigned Hive in the web app dropdown
// ============================================================

#ifndef DEVICES_H
#define DEVICES_H

#include <stdint.h>

struct DeviceConfig {
    const uint8_t mac[6];           // Wi-Fi station MAC (printed at boot)
    const char*   hiveId;           // Fallback hive ID (overridden by Dataverse assignment)
    const char*   deviceName;       // Friendly label for serial output
    const uint8_t ip[4];            // Static IP address on local network
    const char*   boardType;        // Hardware generation for fleet tracking
    const uint8_t sensorHive[8];    // DS18B20 ROM address — waterproof hive probe
    const uint8_t sensorEnclosure[8]; // DS18B20 ROM address — bare TO-92 in enclosure
};

// ─── Device Registry ───────────────────────────────────────
// Add one entry per physical ESP32.
// MAC address: read from serial output on first boot.
// DS18B20 addresses: read from fb-test-ds18b20 enumeration test.
// Static IPs must be reserved on your router (DHCP reservation).
//
// IMPORTANT: Update DEVICE_COUNT when adding/removing entries.

constexpr int DEVICE_COUNT = 2;

constexpr DeviceConfig DEVICES[DEVICE_COUNT] = {
    // Scale 1 — FireBeetle 2 ESP32-E (commissioned 2026-04-11)
    // MAC: 14:33:5C:58:C4:8C
    { {0x14, 0x33, 0x5C, 0x58, 0xC4, 0x8C}, "Hive1", "IoT Hive Stand 1", {192, 168, 1, 75}, "FireBeetle2",
      {0x28, 0x93, 0x3E, 0x80, 0x00, 0x00, 0x00, 0x09},   // Hive probe
      {0x28, 0x80, 0xFE, 0x24, 0x00, 0x00, 0x00, 0x8E} },  // Enclosure TO-92

    // Scale 2 — FireBeetle 2 ESP32-E (commissioned 2026-04-13)
    // MAC: 14:33:5C:3E:22:68
    { {0x14, 0x33, 0x5C, 0x3E, 0x22, 0x68}, "Hive2", "IoT Hive Stand 2", {192, 168, 1, 76}, "FireBeetle2",
      {0x28, 0xA6, 0xFA, 0xC8, 0x00, 0x00, 0x00, 0xCE},   // Hive probe
      {0x28, 0x35, 0x6F, 0x80, 0x00, 0x00, 0x00, 0xBF} },  // Enclosure TO-92
};

// ─── Lookup Function ───────────────────────────────────────
// Returns pointer to matching DeviceConfig, or nullptr if MAC not registered.
inline const DeviceConfig* findDeviceByMAC(const uint8_t mac[6]) {
    for (int i = 0; i < DEVICE_COUNT; i++) {
        bool match = true;
        for (int b = 0; b < 6; b++) {
            if (DEVICES[i].mac[b] != mac[b]) { match = false; break; }
        }
        if (match) return &DEVICES[i];
    }
    return nullptr;
}

#endif // DEVICES_H
