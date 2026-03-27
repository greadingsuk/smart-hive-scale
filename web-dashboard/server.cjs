/**
 * server.cjs — Zero-dependency Node.js server for Apiary AI dashboard.
 * 
 * Uses ONLY built-in Node.js modules — no Express, no node_modules.
 * This ensures instant cold starts on Azure F1 Free tier.
 *
 * 1. Serves Vite-built static files from ./public/
 * 2. /api/switchbot/:deviceId — proxy with HMAC-SHA256 signing
 * 3. /api/switchbot — list all devices
 * 4. /api/health — health check
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const SWITCHBOT_TOKEN = process.env.SWITCHBOT_TOKEN || '';
const SWITCHBOT_SECRET = process.env.SWITCHBOT_SECRET || '';
const PUBLIC_DIR = path.join(__dirname, 'public');

// ── MIME types for static files ─────────────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.map': 'application/json',
};

// ── HTTPS GET helper ────────────────────────────────────────────────────────
function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve({ raw: data }); } });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ── SwitchBot HMAC headers ──────────────────────────────────────────────────
function switchbotHeaders() {
  const t = Date.now().toString();
  const nonce = crypto.randomUUID();
  const sign = crypto.createHmac('sha256', SWITCHBOT_SECRET)
    .update(SWITCHBOT_TOKEN + t + nonce).digest('base64');
  return { 'Authorization': SWITCHBOT_TOKEN, 'sign': sign, 'nonce': nonce, 't': t, 'Content-Type': 'application/json' };
}

// ── Send JSON response ──────────────────────────────────────────────────────
function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

// ── Serve static file ───────────────────────────────────────────────────────
function serveStatic(res, urlPath) {
  let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);
  // Security: prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end(); return; }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA fallback — serve index.html for non-API routes
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { res.writeHead(404); res.end('Not found'); });
    stream.on('open', () => { res.writeHead(200, { 'Content-Type': contentType }); });
    stream.pipe(res);
  });
}

// ── HTTP Server ─────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // API: Health check
  if (pathname === '/api/health') {
    return json(res, 200, { status: 'ok', switchbot: !!SWITCHBOT_TOKEN, timestamp: new Date().toISOString() });
  }

  // API: SwitchBot device status
  const deviceMatch = pathname.match(/^\/api\/switchbot\/([A-Fa-f0-9]+)$/);
  if (deviceMatch) {
    if (!SWITCHBOT_TOKEN || !SWITCHBOT_SECRET) return json(res, 503, { error: 'SwitchBot not configured' });
    try {
      const result = await httpsGet(`https://api.switch-bot.com/v1.1/devices/${deviceMatch[1]}/status`, switchbotHeaders());
      return json(res, 200, result);
    } catch (e) { return json(res, 502, { error: e.message }); }
  }

  // API: SwitchBot list devices
  if (pathname === '/api/switchbot') {
    if (!SWITCHBOT_TOKEN || !SWITCHBOT_SECRET) return json(res, 503, { error: 'SwitchBot not configured' });
    try {
      const result = await httpsGet('https://api.switch-bot.com/v1.1/devices', switchbotHeaders());
      return json(res, 200, result);
    } catch (e) { return json(res, 502, { error: e.message }); }
  }

  // API: 404 for unknown API routes
  if (pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });

  // Static files + SPA fallback
  serveStatic(res, pathname);
});

server.listen(PORT, () => {
  console.log(`Apiary AI server on port ${PORT} (zero-dependency)`);
  console.log(`SwitchBot: ${SWITCHBOT_TOKEN ? 'configured' : 'NOT configured'}`);
});
