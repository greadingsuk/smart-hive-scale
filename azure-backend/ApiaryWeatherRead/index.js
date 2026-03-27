const crypto = require('crypto');
const https = require('https');

// Environment variables (set in Azure Function App Settings)
const AWEKAS_API_KEY = process.env.AWEKAS_API_KEY || '';
const SWITCHBOT_TOKEN = process.env.SWITCHBOT_TOKEN || '';
const SWITCHBOT_SECRET = process.env.SWITCHBOT_SECRET || '';

// SwitchBot device IDs — apiary sensors
const SWITCHBOT_DEVICES = {
    'F5FB699C849F': 'Outdoor Meter',
    'E57420633BDE': 'Hive 1',
    'ECD2097B9A2B': 'Wood Hive',
    'C03A0864727A': 'Boiler Room',
    'F4C4589C6A59': 'Orangery sensor',
    'FD246BA30D0E': 'Chicken coop'
};

// Default device to query if none specified
const DEFAULT_DEVICE = 'F5FB699C849F';

/**
 * Make an HTTPS GET request and return parsed JSON.
 */
function httpsGet(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch { resolve({ raw: data }); }
            });
        });
        req.on('error', reject);
        req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

/**
 * Generate SwitchBot API v1.1 authentication headers.
 */
function switchbotHeaders() {
    const t = Date.now().toString();
    const nonce = crypto.randomUUID();
    const data = SWITCHBOT_TOKEN + t + nonce;
    const sign = crypto
        .createHmac('sha256', SWITCHBOT_SECRET)
        .update(data)
        .digest('base64');

    return {
        'Authorization': SWITCHBOT_TOKEN,
        'sign': sign,
        'nonce': nonce,
        't': t,
        'Content-Type': 'application/json'
    };
}

/**
 * Fetch AWEKAS weather station data (Bresser 7-in-1).
 */
async function fetchAwekas() {
    if (!AWEKAS_API_KEY) return { error: 'AWEKAS_API_KEY not configured' };
    const url = `https://api.awekas.at/current.php?key=${encodeURIComponent(AWEKAS_API_KEY)}`;
    return await httpsGet(url);
}

/**
 * Fetch SwitchBot device status.
 */
async function fetchSwitchBot(deviceId) {
    if (!SWITCHBOT_TOKEN || !SWITCHBOT_SECRET) return { error: 'SwitchBot credentials not configured' };
    const url = `https://api.switch-bot.com/v1.1/devices/${deviceId}/status`;
    const headers = switchbotHeaders();
    return await httpsGet(url, headers);
}

module.exports = async function (context, req) {
    context.log("ApiaryWeatherRead triggered.");

    const deviceId = req.query.device || DEFAULT_DEVICE;

    // Fetch both in parallel
    const [awekas, switchbot] = await Promise.all([
        fetchAwekas().catch(err => ({ error: err.message })),
        fetchSwitchBot(deviceId).catch(err => ({ error: err.message }))
    ]);

    // Normalize AWEKAS data
    const weather = awekas.current ? {
        outdoorTemp: awekas.current.temperature,
        outdoorHumidity: awekas.current.humidity,
        dewpoint: awekas.current.dewpoint,
        windSpeed: awekas.current.windspeed,
        gustSpeed: awekas.current.gustspeed,
        windDirection: awekas.current.winddirection,
        rain: awekas.current.precipitation,
        rainRate: awekas.current.rainrate,
        isRaining: awekas.current.itsraining,
        uvIndex: awekas.current.uv,
        solarRadiation: awekas.current.solar,
        pressure: awekas.current.airpress_rel,
        indoorTemp: awekas.current.indoortemperature,
        indoorHumidity: awekas.current.indoorhumidity,
        dataTimestamp: awekas.current.datatimestamp
    } : { error: awekas.error || 'No AWEKAS data' };

    // Add daily stats
    const daily = awekas.day ? {
        tempMin: awekas.day.temp_min,
        tempMax: awekas.day.temp_max,
        windMax: awekas.day.windspeed_max,
        gustMax: awekas.day.gustspeed_max,
        rain24h: awekas.day.precipitation_24h,
        uvMax: awekas.day.uv_max,
        solarMax: awekas.day.solar_max
    } : null;

    // Normalize SwitchBot data
    const sensor = switchbot.body ? {
        temperature: switchbot.body.temperature,
        humidity: switchbot.body.humidity,
        battery: switchbot.body.battery,
        deviceId: switchbot.body.deviceId,
        deviceType: switchbot.body.deviceType
    } : { error: switchbot.error || switchbot.message || 'No SwitchBot data' };

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: {
            weather: weather,
            daily: daily,
            switchbot: sensor,
            availableDevices: SWITCHBOT_DEVICES,
            timestamp: new Date().toISOString()
        }
    };
};
