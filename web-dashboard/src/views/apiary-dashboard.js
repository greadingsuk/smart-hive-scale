/**
 * Apiary Dashboard — multi-hive IoT telemetry charts + weather station.
 *
 * Data sources:
 *   1. ESP32 telemetry per hive (weight, temp, battery) via Dataverse
 *   2. Manual inspection weights from Dataverse
 *   3. Bresser weather station via AWEKAS (snapshot on apiary home, not here)
 *
 * Charts:
 *   - Weight: per-hive IoT lines + manual inspection dots
 *   - Temperature: per-hive DS18B20 lines
 *   - Battery: per-hive voltage lines
 *
 * Filtering:
 *   - Excludes -127°C (DS18B20 disconnected)
 *   - Excludes all-zero payloads (no sensors connected)
 */
import { renderHeader } from '../components/ui.js';
import { fetchTelemetry, getAllActivity, getActiveHives, refreshDataStore } from '../api/dataverse.js';
import { fetchStationWeather } from '../api/weather.js';

const TIME_RANGES = [
  { key: '24h',  label: '24h',      hours: 24,    bucketMs: 0,         xUnit: 'hour',  tooltipFmt: 'dd MMM HH:mm' },
  { key: '7d',   label: '7d',       hours: 168,   bucketMs: 3600000,   xUnit: 'hour',  tooltipFmt: 'dd MMM HH:mm' },
  { key: '14d',  label: '14d',      hours: 336,   bucketMs: 7200000,   xUnit: 'day',   tooltipFmt: 'dd MMM HH:mm' },
  { key: '1m',   label: '1m',       hours: 730,   bucketMs: 21600000,  xUnit: 'day',   tooltipFmt: 'dd MMM HH:mm' },
  { key: '3m',   label: '3m',       hours: 2190,  bucketMs: 86400000,  xUnit: 'day',   tooltipFmt: 'dd MMM yyyy' },
  { key: '6m',   label: '6m',       hours: 4380,  bucketMs: 86400000,  xUnit: 'week',  tooltipFmt: 'dd MMM yyyy' },
  { key: '1y',   label: '1y',       hours: 8760,  bucketMs: 604800000, xUnit: 'month', tooltipFmt: 'dd MMM yyyy' },
];
const DEFAULT_RANGE = '7d';

// Hive-specific colours (from Dataverse hive data)
const FALLBACK_COLORS = ['#f59e0b','#ef4444','#3b82f6','#22c55e','#a78bfa','#ec4899','#06b6d4','#f97316'];

function downsample(points, bucketMs) {
  if (!bucketMs || points.length <= 200) return points;
  const buckets = new Map();
  for (const p of points) {
    const key = Math.floor(p.x.getTime() / bucketMs) * bucketMs;
    if (!buckets.has(key)) buckets.set(key, { sum: 0, count: 0 });
    const b = buckets.get(key);
    b.sum += p.y; b.count++;
  }
  return Array.from(buckets.entries())
    .map(([ts, b]) => ({ x: new Date(ts + bucketMs / 2), y: +(b.sum / b.count).toFixed(2) }))
    .sort((a, b) => a.x - b.x);
}

function getManualWeightsByHive(cutoff) {
  const byHive = new Map();
  for (const a of getAllActivity()) {
    if (!a.date || !a.hive) continue;
    const d = new Date(a.date);
    if (d < cutoff) continue;
    const w = a.weightTotal;
    if (w != null && w > 0) {
      if (!byHive.has(a.hive)) byHive.set(a.hive, []);
      byHive.get(a.hive).push({ x: d, y: +Number(w).toFixed(2) });
    }
  }
  for (const [, pts] of byHive) pts.sort((a, b) => a.x - b.x);
  return byHive;
}

/** Group telemetry readings by hiveId */
function groupByHive(readings) {
  const groups = {};
  for (const r of readings) {
    const key = r.hiveId || 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return groups;
}

export async function renderApiaryDashboard(app) {
  const hives = getActiveHives();
  const hiveColorMap = {};
  hives.forEach((h, i) => { hiveColorMap[h.hiveName] = h.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length]; });
  // Map HiveId (e.g. "Hive1") to hiveName (e.g. "Hive 1 - Obsidian")
  // For now, use hiveId directly if no match
  const hiveIdToName = {};
  const hiveIdToColor = {};
  hives.forEach((h, i) => {
    // The ESP32 sends HiveId like "Hive1", "Hive2" — try to match
    const possibleIds = [h.hiveName, h.id, `Hive${i+1}`];
    for (const pid of possibleIds) {
      hiveIdToName[pid] = h.hiveName;
      hiveIdToColor[pid] = h.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
    }
  });

  app.innerHTML = `
    ${renderHeader('Apiary Dashboard', true)}
    <main class="max-w-5xl mx-auto p-4 pb-20 md:pb-4 space-y-5">

      <!-- Weather Station Snapshot -->
      <section class="card-surface" id="weatherCard">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider">Weather Station</h3>
          <span class="text-[10px] text-hive-muted" id="wxAge">Loading...</span>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          <div><div class="text-hive-muted">Outdoor</div><div class="text-base font-bold" id="wxTemp">—</div><div class="text-hive-muted">°C</div></div>
          <div><div class="text-hive-muted">Humidity</div><div class="text-base font-bold" id="wxHum">—</div><div class="text-hive-muted">%</div></div>
          <div><div class="text-hive-muted">Wind</div><div class="text-base font-bold" id="wxWind">—</div><div class="text-hive-muted" id="wxWindDir">km/h</div></div>
          <div><div class="text-hive-muted">Rain 24h</div><div class="text-base font-bold" id="wxRain">—</div><div class="text-hive-muted">mm</div></div>
          <div><div class="text-hive-muted">UV</div><div class="text-base font-bold" id="wxUV">—</div><div class="text-hive-muted">index</div></div>
          <div><div class="text-hive-muted">Pressure</div><div class="text-base font-bold" id="wxPressure">—</div><div class="text-hive-muted">hPa</div></div>
        </div>
      </section>

      <!-- Time Range + Refresh -->
      <div class="flex items-center gap-2 flex-wrap">
        <div class="flex gap-1 overflow-x-auto no-scrollbar" id="rangeChips">
          ${TIME_RANGES.map(r => `
            <button data-range="${r.key}" class="range-chip flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${r.key === DEFAULT_RANGE ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}" style="border:1px solid ${r.key === DEFAULT_RANGE ? 'var(--hive-gold)' : 'var(--hive-border)'}">${r.label}</button>
          `).join('')}
        </div>
        <button id="refreshBtn" class="btn-primary flex items-center gap-1.5 ml-auto text-xs px-3 py-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Refresh
        </button>
      </div>

      <!-- Hive Filters -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar" id="hiveFilters">
        ${hives.map((h, i) => {
          const color = h.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
          return `<button data-hive="${h.hiveName}" class="hive-toggle flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style="border:2px solid ${color};background:${color}1a;color:${color}">
            <span class="w-2 h-2 rounded-full" style="background:${color}"></span>
            ${h.hiveName.replace(/^Hive \d+ - |^Nuc \d+ - /, '')}
          </button>`;
        }).join('')}
      </div>

      <!-- Weight Chart -->
      <section class="card-surface">
        <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Weight</h3>
        <div id="weightSkeleton" class="w-full h-[220px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="weightChart" class="w-full hidden"></canvas>
        <div id="weightEmpty" class="hidden text-center py-8">
          <p class="text-sm text-hive-muted">No weight data yet</p>
          <p class="text-xs text-hive-muted mt-1">HX711 load cells arriving soon — manual inspection weights shown as dots</p>
        </div>
      </section>

      <!-- Temperature Chart -->
      <section class="card-surface">
        <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Hive Temperature</h3>
        <div id="tempSkeleton" class="w-full h-[220px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="tempChart" class="w-full hidden"></canvas>
      </section>

      <!-- Battery Chart -->
      <section class="card-surface">
        <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Battery Voltage</h3>
        <div id="batSkeleton" class="w-full h-[180px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="batChart" class="w-full hidden"></canvas>
      </section>

      <div id="errorBanner" class="hidden bg-hive-red/10 border border-hive-red text-hive-red p-3 rounded-xl text-center text-sm"></div>
    </main>
  `;

  // ── Chart.js ────────────────────────────────────────────────────────
  const { Chart, registerables } = await import('chart.js');
  await import('chartjs-adapter-date-fns');
  Chart.register(...registerables);

  let activeRange = TIME_RANGES.find(r => r.key === DEFAULT_RANGE);
  const enabledHives = new Set(hives.map(h => h.hiveName));

  function buildScaleX(range) {
    const now = new Date();
    return {
      type: 'time', min: new Date(now - range.hours * 3600000).toISOString(), max: now.toISOString(),
      time: { unit: range.xUnit, tooltipFormat: range.tooltipFmt, displayFormats: { hour: 'HH:mm', day: 'dd MMM', week: 'dd MMM', month: 'MMM yyyy' } },
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#9ca3af', maxTicksLimit: 10, autoSkip: true, maxRotation: 0 },
    };
  }

  const baseOpts = {
    responsive: true, maintainAspectRatio: true, aspectRatio: 2.5,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { labels: { color: '#9ca3af', usePointStyle: true, padding: 10, boxWidth: 8 } },
      tooltip: { backgroundColor: '#1a1d27', borderColor: '#2a2e3e', borderWidth: 1, titleColor: '#e4e4e7', bodyColor: '#e4e4e7', padding: 8 },
    },
  };

  const weightChart = new Chart(document.getElementById('weightChart'), {
    type: 'line', data: { datasets: [] },
    options: { ...baseOpts, scales: { x: buildScaleX(activeRange), y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'kg', color: '#9ca3af' } } } },
  });

  const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line', data: { datasets: [] },
    options: { ...baseOpts, scales: { x: buildScaleX(activeRange), y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: '°C', color: '#9ca3af' } } } },
  });

  const batChart = new Chart(document.getElementById('batChart'), {
    type: 'line', data: { datasets: [] },
    options: { ...baseOpts, aspectRatio: 3, scales: { x: buildScaleX(activeRange), y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'V', color: '#9ca3af' }, min: 3.0, max: 4.5 } } },
  });

  // ── Refresh ─────────────────────────────────────────────────────────
  let isManualRefresh = false;

  async function refresh() {
    const cutoff = new Date(Date.now() - activeRange.hours * 3600000);
    const hide = id => document.getElementById(id)?.classList.add('hidden');
    const show = id => document.getElementById(id)?.classList.remove('hidden');

    if (isManualRefresh) {
      await refreshDataStore();
      hives.length = 0; hives.push(...getActiveHives());
      hives.forEach((h, i) => { hiveColorMap[h.hiveName] = h.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length]; });
      isManualRefresh = false;
    }

    const newX = buildScaleX(activeRange);
    weightChart.options.scales.x = newX;
    tempChart.options.scales.x = newX;
    batChart.options.scales.x = newX;

    try {
      const allData = await fetchTelemetry(null, activeRange.hours);
      hide('errorBanner');

      const filtered = allData.filter(r => new Date(r.timestamp) >= cutoff);
      const byHive = groupByHive(filtered);
      const manualByHive = getManualWeightsByHive(cutoff);

      hide('weightSkeleton'); hide('tempSkeleton'); hide('batSkeleton');

      // ── Weight datasets ────────────────────────────────────────
      const weightDatasets = [];

      // IoT weight per hive
      for (const [hiveId, readings] of Object.entries(byHive)) {
        const name = hiveIdToName[hiveId] || hiveId;
        if (!enabledHives.has(name) && !enabledHives.has(hiveId)) continue;
        const color = hiveIdToColor[hiveId] || hiveColorMap[name] || '#9ca3af';
        const pts = readings.filter(r => r.weight > 0).map(r => ({ x: new Date(r.timestamp), y: r.weight }));
        if (pts.length > 0) {
          weightDatasets.push({
            label: `${name} (IoT)`, borderColor: color, backgroundColor: color + '1a',
            fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2,
            data: downsample(pts, activeRange.bucketMs), order: 5,
          });
        }
      }

      // Manual inspection weights per hive
      for (const [hiveName, points] of manualByHive) {
        if (!enabledHives.has(hiveName)) continue;
        const color = hiveColorMap[hiveName] || '#9ca3af';
        weightDatasets.push({
          label: hiveName, borderColor: color, backgroundColor: color,
          pointBackgroundColor: color, pointBorderColor: '#fff', pointBorderWidth: 2,
          pointRadius: 5, pointHoverRadius: 7, borderWidth: 2, tension: 0.3,
          showLine: true, fill: false, data: points, order: 1,
        });
      }

      weightChart.data.datasets = weightDatasets;
      if (weightDatasets.length > 0) { show('weightChart'); hide('weightEmpty'); }
      else { show('weightEmpty'); hide('weightChart'); }

      // ── Temperature datasets (per-hive DS18B20) ────────────────
      const tempDatasets = [];
      for (const [hiveId, readings] of Object.entries(byHive)) {
        const name = hiveIdToName[hiveId] || hiveId;
        if (!enabledHives.has(name) && !enabledHives.has(hiveId)) continue;
        const color = hiveIdToColor[hiveId] || hiveColorMap[name] || '#9ca3af';
        const pts = readings
          .filter(r => r.internalTemp != null && r.internalTemp > -100)
          .map(r => ({ x: new Date(r.timestamp), y: r.internalTemp }));
        if (pts.length > 0) {
          tempDatasets.push({
            label: name, borderColor: color, backgroundColor: color + '1a',
            fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2,
            data: downsample(pts, activeRange.bucketMs),
          });
        }
      }
      tempChart.data.datasets = tempDatasets;
      show('tempChart');

      // ── Battery datasets (per-hive) ────────────────────────────
      const batDatasets = [];
      for (const [hiveId, readings] of Object.entries(byHive)) {
        const name = hiveIdToName[hiveId] || hiveId;
        if (!enabledHives.has(name) && !enabledHives.has(hiveId)) continue;
        const color = hiveIdToColor[hiveId] || hiveColorMap[name] || '#9ca3af';
        const pts = readings
          .filter(r => r.batteryVoltage > 0)
          .map(r => ({ x: new Date(r.timestamp), y: r.batteryVoltage }));
        if (pts.length > 0) {
          batDatasets.push({
            label: name, borderColor: color, backgroundColor: color + '1a',
            fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2,
            data: downsample(pts, activeRange.bucketMs),
          });
        }
      }
      batChart.data.datasets = batDatasets;
      show('batChart');

      weightChart.update('none'); tempChart.update('none'); batChart.update('none');
    } catch (err) {
      const banner = document.getElementById('errorBanner');
      if (banner) { banner.textContent = `Failed to load sensor data: ${err.message}`; }
      document.getElementById('errorBanner')?.classList.remove('hidden');
    }
  }

  // ── Weather station snapshot ──────────────────────────────────────
  fetchStationWeather().then(s => {
    if (!s) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('wxTemp', s.outdoorTemp?.toFixed(1) ?? '—');
    set('wxHum', s.humidity ?? '—');
    set('wxWind', s.windSpeed?.toFixed(1) ?? '—');
    set('wxWindDir', `${s.windCompass} km/h`);
    set('wxRain', s.rain24h?.toFixed(1) ?? '0');
    set('wxUV', s.uvIndex?.toFixed(1) ?? '—');
    set('wxPressure', s.pressure?.toFixed(0) ?? '—');
    set('wxAge', s.dataAge <= 1 ? 'Live' : `${s.dataAge}m ago`);
  }).catch(() => {});

  // ── Event handlers ────────────────────────────────────────────────
  document.getElementById('rangeChips').addEventListener('click', e => {
    const btn = e.target.closest('[data-range]');
    if (!btn) return;
    const range = TIME_RANGES.find(r => r.key === btn.dataset.range);
    if (!range) return;
    activeRange = range;
    document.querySelectorAll('.range-chip').forEach(c => {
      const active = c.dataset.range === range.key;
      c.className = `range-chip flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}`;
      c.style.borderColor = active ? 'var(--hive-gold)' : 'var(--hive-border)';
    });
    refresh();
  });

  document.getElementById('hiveFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-hive]');
    if (!btn) return;
    const name = btn.dataset.hive;
    const color = hiveColorMap[name] || '#9ca3af';
    if (enabledHives.has(name)) {
      enabledHives.delete(name);
      btn.style.background = 'transparent'; btn.style.borderColor = 'var(--hive-border)';
      btn.style.color = 'var(--hive-muted)'; btn.style.opacity = '0.5';
    } else {
      enabledHives.add(name);
      btn.style.background = color + '1a'; btn.style.borderColor = color;
      btn.style.color = color; btn.style.opacity = '1';
    }
    refresh();
  });

  refresh();
  const timer = setInterval(refresh, 5 * 60 * 1000);
  document.getElementById('refreshBtn').addEventListener('click', () => { isManualRefresh = true; refresh(); });

  return () => { clearInterval(timer); weightChart.destroy(); tempChart.destroy(); batChart.destroy(); };
}
