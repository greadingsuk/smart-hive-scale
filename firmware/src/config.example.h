// ============================================================
// config.example.h — Template for config.h (safe to commit)
// Copy this file to config.h and fill in your real values.
// ============================================================

#ifndef CONFIG_H
#define CONFIG_H

#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// ----- Static IP (bypasses DHCP) -----
#define STATIC_IP      192, 168, 1, 75
#define GATEWAY_IP     192, 168, 1, 1     // Your router's IP
#define SUBNET_MASK    255, 255, 255, 0
#define DNS_IP         192, 168, 1, 1     // Usually same as gateway

#define INGEST_URL "YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL_HERE"

#define HIVE_ID "Hive1"

#endif // CONFIG_H
