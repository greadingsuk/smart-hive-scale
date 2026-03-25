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

#endif // CONFIG_H
