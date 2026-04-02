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
    const uint8_t mac[6];       // Wi-Fi station MAC (printed at boot)
    const char*   hiveId;       // Fallback hive ID (overridden by Dataverse assignment)
    const char*   deviceName;   // Friendly label for serial output
    const uint8_t ip[4];        // Static IP address on local network
};

// ─── Device Registry ───────────────────────────────────────
// Add one entry per physical ESP32.
// MAC address: read from serial output on first boot.
// Static IPs must be reserved on your router (DHCP reservation).
//
// IMPORTANT: Update DEVICE_COUNT when adding/removing entries.

constexpr int DEVICE_COUNT = 2;

constexpr DeviceConfig DEVICES[DEVICE_COUNT] = {
    // Device 1 — Original ESP32 (Hive 1)
    // MAC: D4:E9:F4:8B:94:C0
    { {0xD4, 0xE9, 0xF4, 0x8B, 0x94, 0xC0}, "Hive1", "IoT Hive Stand 1", {192, 168, 1, 75} },

    // Device 2 — Replacement ESP32 WEMOS (Hive 2)
    // MAC: D4:E9:F4:BD:81:10
    { {0xD4, 0xE9, 0xF4, 0xBD, 0x81, 0x10}, "Hive2", "IoT Hive Stand 2", {192, 168, 1, 76} },
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
