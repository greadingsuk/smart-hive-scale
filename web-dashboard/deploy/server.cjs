/**
 * server.js — Express server for Apiary AI dashboard.
 * 
 * 1. Serves the Vite-built static dashboard from /home/site/wwwroot/public/
 * 2. Provides /api/switchbot/:deviceId proxy with HMAC-SHA256 signing
 * 3. Provides /api/health endpoint
 */
const express = require('express');
const crypto = require('crypto');
const https = require('https');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// SwitchBot credentials from App Service environment variables
const SWITCHBOT_TOKEN = process.env.SWITCHBOT_TOKEN || '';
const SWITCHBOT_SECRET = process.env.SWITCHBOT_SECRET || '';

// ── SwitchBot API proxy ─────────────────────────────────────────────────────

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, res => {
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

function switchbotHeaders() {
  const t = Date.now().toString();
  const nonce = crypto.randomUUID();
  const data = SWITCHBOT_TOKEN + t + nonce;
  const sign = crypto.createHmac('sha256', SWITCHBOT_SECRET).update(data).digest('base64');
  return { 'Authorization': SWITCHBOT_TOKEN, 'sign': sign, 'nonce': nonce, 't': t, 'Content-Type': 'application/json' };
}

// GET /api/switchbot/:deviceId — proxy to SwitchBot Cloud API with HMAC signing
app.get('/api/switchbot/:deviceId', async (req, res) => {
  if (!SWITCHBOT_TOKEN || !SWITCHBOT_SECRET) {
    return res.status(503).json({ error: 'SwitchBot credentials not configured' });
  }
  try {
    const deviceId = req.params.deviceId.replace(/[^A-Fa-f0-9]/g, ''); // sanitize
    const url = `https://api.switch-bot.com/v1.1/devices/${deviceId}/status`;
    const result = await httpsGet(url, switchbotHeaders());
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/switchbot — list all devices
app.get('/api/switchbot', async (req, res) => {
  if (!SWITCHBOT_TOKEN || !SWITCHBOT_SECRET) {
    return res.status(503).json({ error: 'SwitchBot credentials not configured' });
  }
  try {
    const result = await httpsGet('https://api.switch-bot.com/v1.1/devices', switchbotHeaders());
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', switchbot: !!SWITCHBOT_TOKEN, timestamp: new Date().toISOString() });
});

// ── Static dashboard files ──────────────────────────────────────────────────
// Serve the Vite-built SPA from the 'public' subdirectory
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Apiary AI server listening on port ${PORT}`);
  console.log(`SwitchBot: ${SWITCHBOT_TOKEN ? 'configured' : 'NOT configured'}`);
});
