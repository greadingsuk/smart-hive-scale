/**
 * Weather API — fetches from multiple sources:
 *   1. Bresser 7-in-1 weather station via AWEKAS API (Logic App proxy)
 *   2. Open-Meteo for forecast/conditions (free, no API key)
 */

const AWEKAS_URL = import.meta.env.VITE_AWEKAS_READ_URL || '';

// WMO Weather interpretation codes → descriptions
const WMO_CODES = {
  0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Rime Fog',
  51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
  61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
  71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
  77: 'Snow Grains', 80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
  85: 'Light Snow Showers', 86: 'Snow Showers',
  95: 'Thunderstorm', 96: 'Thunderstorm + Hail', 99: 'Thunderstorm + Heavy Hail',
};

// Wind direction degrees → compass
function windCompass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16] || '?';
}

let cachedWeather = null;
let cacheTime = 0;
let cachedStation = null;
let stationCacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch current weather for given coordinates (Open-Meteo).
 */
export async function fetchCurrentWeather(lat, lng) {
  if (cachedWeather && (Date.now() - cacheTime) < CACHE_TTL) return cachedWeather;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API: HTTP ${res.status}`);
  const data = await res.json();
  const current = data.current;
  const code = current.weather_code;

  cachedWeather = {
    temp: Math.round(current.temperature_2m),
    conditions: WMO_CODES[code] || `Code ${code}`,
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    icon: getWeatherIcon(code),
  };
  cacheTime = Date.now();
  return cachedWeather;
}

/**
 * Fetch live Bresser weather station data via AWEKAS Logic App proxy.
 * Returns normalized object with current + daily stats, or null if unavailable.
 */
export async function fetchStationWeather() {
  if (!AWEKAS_URL) return null;
  if (cachedStation && (Date.now() - stationCacheTime) < CACHE_TTL) return cachedStation;

  try {
    const res = await fetch(AWEKAS_URL);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error || !data.current) return null;

    const c = data.current;
    const d = data.day || {};

    cachedStation = {
      // Current readings
      outdoorTemp: c.temperature,
      humidity: c.humidity,
      dewpoint: c.dewpoint,
      windSpeed: c.windspeed,
      gustSpeed: c.gustspeed,
      windDir: c.winddirection,
      windCompass: windCompass(c.winddirection),
      rain: c.precipitation,
      rainRate: c.rainrate,
      isRaining: c.itsraining,
      uvIndex: c.uv,
      solar: c.solar,
      pressure: c.airpress_rel,
      indoorTemp: c.indoortemperature,
      indoorHumidity: c.indoorhumidity,
      dataAge: Math.round((Date.now() / 1000 - c.datatimestamp) / 60), // minutes ago
      // Daily stats
      tempMin: d.temp_min,
      tempMax: d.temp_max,
      windMax: d.windspeed_max,
      gustMax: d.gustspeed_max,
      rain24h: d.precipitation_24h,
      uvMax: d.uv_max,
    };
    stationCacheTime = Date.now();
    return cachedStation;
  } catch {
    return null;
  }
}

function getWeatherIcon(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}
