// ============================================================
// config.example.h — Template for config.h (safe to commit)
// Copy this file to config.h and fill in your real values.
// ============================================================

#ifndef CONFIG_H
#define CONFIG_H

#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// ----- Network (shared across all devices) -----
// Per-device static IPs are defined in devices.h
#define GATEWAY_IP     192, 168, 1, 1     // Your router's IP
#define SUBNET_MASK    255, 255, 255, 0
#define DNS_IP         192, 168, 1, 1     // Usually same as gateway

#define INGEST_URL "YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL_HERE"

// ----- OTA Firmware Update (optional) -----
// Uncomment and set these to enable pull-based OTA updates.
// Version file should contain a single integer (e.g. "2")
// Binary file is the compiled .bin from PlatformIO build output.
// #define OTA_VERSION_URL "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/master/firmware/version.txt"
// #define OTA_BINARY_URL  "https://github.com/YOUR_USER/YOUR_REPO/releases/latest/download/firmware.bin"

#endif // CONFIG_H
