/**
 * Weather API — uses Open-Meteo (free, no API key required).
 * Returns current conditions for given coordinates.
 */

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

let cachedWeather = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch current weather for given coordinates.
 * Returns { temp, conditions, humidity, windSpeed, icon }
 */
export async function fetchCurrentWeather(lat, lng) {
  // Return cached if fresh
  if (cachedWeather && (Date.now() - cacheTime) < CACHE_TTL) {
    return cachedWeather;
  }

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
