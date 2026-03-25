/**
 * Hive Dashboard — weight chart with IoT sensor + manual inspection data,
 * plus temperature & environment charts.
 *
 * Weight data sources:
 *   1. IoT telemetry (15-min intervals from Azure Table Storage)
 *   2. Manual inspection weights (weightTotal from Dataverse inspections)
 *
 * Data is downsampled client-side per time range to keep ~60-180 points:
 *   24h  → raw 15min       | x-axis: hour
 *   7d   → 1h averages     | x-axis: hour
 *   14d  → 2h averages     | x-axis: day
 *   1m   → 6h averages     | x-axis: day
 *   3m   → 1 day averages  | x-axis: day
 *   6m   → 1 day averages  | x-axis: week
 *   1y   → 1 week averages | x-axis: month
 *   2y   → 1 week averages | x-axis: month
 *   5y   → 1 month averages| x-axis: month
 */
import { renderHeader } from '../components/ui.js';
import { fetchTelemetry, getAllActivity, getActiveHives } from '../api/dataverse.js';

// ── Time range configuration ────────────────────────────────────────────────
const TIME_RANGES = [
  { key: '24h',  label: '24 hours', hours: 24,       bucketMs: 0,                   xUnit: 'hour',  xFormat: 'HH:mm',        tooltipFmt: 'dd MMM HH:mm' },
  { key: '7d',   label: '7 days',   hours: 168,      bucketMs: 3600000,             xUnit: 'hour',  xFormat: 'dd MMM HH:mm', tooltipFmt: 'dd MMM HH:mm' },
  { key: '14d',  label: '14 days',  hours: 336,      bucketMs: 7200000,             xUnit: 'day',   xFormat: 'dd MMM',       tooltipFmt: 'dd MMM HH:mm' },
  { key: '1m',   label: '1 month',  hours: 730,      bucketMs: 21600000,            xUnit: 'day',   xFormat: 'dd MMM',       tooltipFmt: 'dd MMM HH:mm' },
  { key: '3m',   label: '3 months', hours: 2190,     bucketMs: 86400000,            xUnit: 'day',   xFormat: 'dd MMM',       tooltipFmt: 'dd MMM yyyy' },
  { key: '6m',   label: '6 months', hours: 4380,     bucketMs: 86400000,            xUnit: 'week',  xFormat: 'dd MMM',       tooltipFmt: 'dd MMM yyyy' },
  { key: '1y',   label: '1 year',   hours: 8760,     bucketMs: 604800000,           xUnit: 'month', xFormat: 'MMM yyyy',     tooltipFmt: 'dd MMM yyyy' },
  { key: '2y',   label: '2 years',  hours: 17520,    bucketMs: 604800000,           xUnit: 'month', xFormat: 'MMM yyyy',     tooltipFmt: 'dd MMM yyyy' },
  { key: '5y',   label: '5 years',  hours: 43800,    bucketMs: 2592000000,          xUnit: 'month', xFormat: 'MMM yyyy',     tooltipFmt: 'MMM yyyy' },
];
const DEFAULT_RANGE = '3m';

// ── Downsampling ────────────────────────────────────────────────────────────
function downsample(points, bucketMs) {
  if (!bucketMs || points.length <= 200) return points;
  const buckets = new Map();
  for (const p of points) {
    const key = Math.floor(p.x.getTime() / bucketMs) * bucketMs;
    if (!buckets.has(key)) buckets.set(key, { sum: 0, count: 0 });
    const b = buckets.get(key);
    b.sum += p.y;
    b.count++;
  }
  return Array.from(buckets.entries())
    .map(([ts, b]) => ({ x: new Date(ts + bucketMs / 2), y: +(b.sum / b.count).toFixed(2) }))
    .sort((a, b) => a.x - b.x);
}

// ── Manual weight extraction from inspections ───────────────────────────────
// Returns a Map of hiveName → [{ x: Date, y: number }]
function getManualWeightsByHive(cutoff) {
  const activity = getAllActivity();
  const byHive = new Map();
  for (const a of activity) {
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

export async function renderApiaryDashboard(app) {
  const hives = getActiveHives();
  const hiveColorMap = {};
  for (const h of hives) hiveColorMap[h.hiveName] = h.color || '#f59e0b';
  const enabledHives = new Set(hives.map(h => h.hiveName));

  app.innerHTML = `
    ${renderHeader('Hive Dashboard', true)}
    <main class="max-w-5xl mx-auto p-4 pb-20 md:pb-4 space-y-6">

      <!-- Time Range -->
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex gap-1.5 overflow-x-auto no-scrollbar" id="rangeChips">
          ${TIME_RANGES.map(r => `
            <button data-range="${r.key}" class="range-chip flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${r.key === DEFAULT_RANGE ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}" style="border:1px solid ${r.key === DEFAULT_RANGE ? 'var(--hive-gold)' : 'var(--hive-border)'}">${r.label}</button>
          `).join('')}
        </div>
        <button id="refreshBtn" class="btn-primary flex items-center gap-2 ml-auto">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Refresh
        </button>
      </div>

      <!-- Summary Cards -->
      <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="summaryCards">
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Weight</div>
          <div class="text-xl font-bold mt-1" id="latestWeight">—</div>
          <div class="text-xs text-hive-muted">kg</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Internal Temp</div>
          <div class="text-xl font-bold mt-1" id="latestTemp">—</div>
          <div class="text-xs text-hive-muted">°C</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Humidity</div>
          <div class="text-xl font-bold mt-1" id="latestHum">—</div>
          <div class="text-xs text-hive-muted">%</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Battery</div>
          <div class="text-xl font-bold mt-1" id="latestBat">—</div>
          <div class="text-xs text-hive-muted">V</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Leg Temp</div>
          <div class="text-xl font-bold mt-1" id="latestLeg">—</div>
          <div class="text-xs text-hive-muted">°C</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Last Reading</div>
          <div class="text-sm font-medium mt-1 text-hive-muted" id="lastReading">—</div>
          <div class="text-xs text-hive-muted" id="dataPoints">0 pts</div>
        </div>
      </section>

      <!-- Weight Chart -->
      <section class="card-surface">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider">Weight</h3>
        </div>
        <!-- Hive Filter Toggles -->
        <div class="flex gap-2 mb-4 overflow-x-auto no-scrollbar" id="hiveFilters">
          ${hives.map(h => `
            <button data-hive="${h.hiveName}" class="hive-toggle flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all" style="border:2px solid ${h.color};background:${h.color}1a;color:${h.color}">
              <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${h.color}"></span>
              ${h.hiveName.replace(/^Hive \d+ - |^Nuc \d+ - /, '')}
            </button>
          `).join('')}
        </div>
        <div id="weightSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="weightChart" class="w-full hidden"></canvas>
        <div id="weightEmpty" class="hidden text-center py-10">
          <svg class="w-10 h-10 mx-auto mb-2 text-hive-muted opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <p class="text-sm text-hive-muted">No weight data yet</p>
          <p class="text-xs text-hive-muted mt-1">Connect your IoT scale or record an inspection with weight</p>
        </div>
      </section>

      <!-- Temperature & Environment -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Temperature</h3>
          <div id="tempSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
          <canvas id="tempChart" class="w-full hidden"></canvas>
        </div>
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Humidity & Battery</h3>
          <div id="envSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
          <canvas id="envChart" class="w-full hidden"></canvas>
        </div>
      </section>

      <div id="errorBanner" class="hidden bg-hive-red/10 border border-hive-red text-hive-red p-3 rounded-xl text-center text-sm"></div>
    </main>
  `;

  // ── Chart.js setup ──────────────────────────────────────────────────────
  const { Chart, registerables } = await import('chart.js');
  await import('chartjs-adapter-date-fns');
  Chart.register(...registerables);

  let activeRange = TIME_RANGES.find(r => r.key === DEFAULT_RANGE);

  function buildScaleX(range) {
    const now = new Date();
    const min = new Date(now.getTime() - range.hours * 3600 * 1000);
    return {
      type: 'time',
      min: min.toISOString(),
      max: now.toISOString(),
      time: {
        unit: range.xUnit,
        displayFormats: {
          hour: 'HH:mm',
          day: 'dd MMM',
          week: 'dd MMM',
          month: 'MMM yyyy',
        },
        tooltipFormat: range.tooltipFmt,
      },
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#9ca3af', maxTicksLimit: 10, autoSkip: true, maxRotation: 0 },
    };
  }

  const baseOpts = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { labels: { color: '#9ca3af', usePointStyle: true, padding: 12 } },
      tooltip: {
        backgroundColor: '#1a1d27', borderColor: '#2a2e3e', borderWidth: 1,
        titleColor: '#e4e4e7', bodyColor: '#e4e4e7', padding: 10,
        callbacks: { title: items => new Date(items[0].parsed.x).toLocaleString() },
      },
    },
  };

  // Weight chart — datasets built dynamically per hive
  const weightChart = new Chart(document.getElementById('weightChart'), {
    type: 'line',
    data: { datasets: [] },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        legend: { display: false }, // We use our own hive filter toggles
        tooltip: {
          ...baseOpts.plugins.tooltip,
          callbacks: {
            title: items => new Date(items[0].parsed.x).toLocaleString(),
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} kg`,
          },
        },
      },
      scales: {
        x: buildScaleX(activeRange),
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'kg', color: '#9ca3af' } },
      },
    },
  });

  const ds = (label, color) => ({ label, borderColor: color, backgroundColor: color + '1a', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2, data: [] });

  const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: { datasets: [ds('Internal (°C)', '#ef4444'), ds('Leg (°C)', '#a78bfa')] },
    options: { ...baseOpts, aspectRatio: 2, scales: { x: buildScaleX(activeRange), y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: '°C', color: '#9ca3af' } } } },
  });

  const envChart = new Chart(document.getElementById('envChart'), {
    type: 'line',
    data: { datasets: [{ ...ds('Humidity (%)', '#3b82f6'), yAxisID: 'yHum' }, { ...ds('Battery (V)', '#22c55e'), yAxisID: 'yBat' }] },
    options: {
      ...baseOpts, aspectRatio: 2,
      scales: {
        x: buildScaleX(activeRange),
        yHum: { type: 'linear', position: 'left', grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#3b82f6' }, title: { display: true, text: '%', color: '#3b82f6' } },
        yBat: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#22c55e' }, title: { display: true, text: 'V', color: '#22c55e' } },
      },
    },
  });

  // ── Refresh logic ─────────────────────────────────────────────────────
  async function refresh() {
    const cutoff = new Date(Date.now() - activeRange.hours * 3600 * 1000);

    const hide = id => document.getElementById(id)?.classList.add('hidden');
    const show = id => document.getElementById(id)?.classList.remove('hidden');

    // Update x-axis for all charts
    const newX = buildScaleX(activeRange);
    weightChart.options.scales.x = newX;
    tempChart.options.scales.x = newX;
    envChart.options.scales.x = newX;

    try {
      const data = await fetchTelemetry();
      hide('errorBanner');

      const filtered = data.filter(r => new Date(r.timestamp) >= cutoff);
      // Filter out zero/null sensor readings (no real IoT data yet)
      const validSensor = filtered.filter(r => r.weight > 0 || r.internalTemp > 0 || r.hiveHum > 0);
      const manualByHive = getManualWeightsByHive(cutoff);
      const totalManual = Array.from(manualByHive.values()).reduce((s, pts) => s + pts.length, 0);

      hide('weightSkeleton'); hide('tempSkeleton'); hide('envSkeleton');

      const hasIoT = validSensor.length > 0;
      const hasManual = totalManual > 0;

      if (hasIoT || hasManual) {
        show('weightChart'); show('tempChart'); show('envChart');
        hide('weightEmpty');

        if (hasIoT) {
          const latest = validSensor[validSensor.length - 1];
          const setVal = (id, val, dec) => { document.getElementById(id).textContent = val != null ? Number(val).toFixed(dec) : '—'; };
          setVal('latestWeight', latest.weight, 1);
          setVal('latestTemp', latest.internalTemp, 1);
          setVal('latestHum', latest.hiveHum, 1);
          setVal('latestBat', latest.batteryVoltage, 2);
          setVal('latestLeg', latest.legTemp, 1);

          const secs = Math.floor((Date.now() - new Date(latest.timestamp)) / 1000);
          document.getElementById('lastReading').textContent = secs < 60 ? `${secs}s ago` : secs < 3600 ? `${Math.floor(secs / 60)}m ago` : `${Math.floor(secs / 3600)}h ago`;
          document.getElementById('dataPoints').textContent = `${validSensor.length} sensor + ${totalManual} manual`;
        } else if (hasManual) {
          document.getElementById('dataPoints').textContent = `${totalManual} manual`;
        }
      } else {
        show('weightEmpty');
        show('tempChart'); show('envChart');
      }

      // ── Build per-hive weight datasets ──────────────────────────────
      const datasets = [];
      // IoT scale line (single scale, not per-hive yet)
      const rawWeight = validSensor.filter(r => r.weight != null && r.weight > 0).map(r => ({ x: new Date(r.timestamp), y: r.weight }));
      if (rawWeight.length > 0) {
        datasets.push({
          label: 'IoT Scale',
          borderColor: '#9ca3af',
          backgroundColor: '#9ca3af1a',
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
          borderDash: [4, 2],
          data: downsample(rawWeight, activeRange.bucketMs),
          order: 10,
        });
      }
      // Per-hive manual weight datasets
      for (const [hiveName, points] of manualByHive) {
        if (!enabledHives.has(hiveName)) continue;
        const color = hiveColorMap[hiveName] || '#9ca3af';
        datasets.push({
          label: hiveName,
          borderColor: color,
          backgroundColor: color,
          pointBackgroundColor: color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointStyle: 'circle',
          borderWidth: 2,
          tension: 0.3,
          showLine: true,
          fill: false,
          data: points,
          order: 1,
        });
      }
      weightChart.data.datasets = datasets;

      // Temp & env — downsample too
      const rawInternal = validSensor.filter(r => r.internalTemp != null && r.internalTemp > 0).map(r => ({ x: new Date(r.timestamp), y: r.internalTemp }));
      const rawLeg = validSensor.filter(r => r.legTemp != null && r.legTemp > 0).map(r => ({ x: new Date(r.timestamp), y: r.legTemp }));
      const rawHum = validSensor.filter(r => r.hiveHum != null && r.hiveHum > 0).map(r => ({ x: new Date(r.timestamp), y: r.hiveHum }));
      const rawBat = validSensor.filter(r => r.batteryVoltage != null && r.batteryVoltage > 0).map(r => ({ x: new Date(r.timestamp), y: r.batteryVoltage }));

      tempChart.data.datasets[0].data = downsample(rawInternal, activeRange.bucketMs);
      tempChart.data.datasets[1].data = downsample(rawLeg, activeRange.bucketMs);
      envChart.data.datasets[0].data = downsample(rawHum, activeRange.bucketMs);
      envChart.data.datasets[1].data = downsample(rawBat, activeRange.bucketMs);

      weightChart.update('none'); tempChart.update('none'); envChart.update('none');
    } catch (err) {
      const banner = document.getElementById('errorBanner');
      banner.textContent = `Failed to load sensor data: ${err.message}`;
      show('errorBanner');
    }
  }

  // ── Range chip handlers ───────────────────────────────────────────────
  document.getElementById('rangeChips').addEventListener('click', e => {
    const btn = e.target.closest('[data-range]');
    if (!btn) return;
    const range = TIME_RANGES.find(r => r.key === btn.dataset.range);
    if (!range) return;
    activeRange = range;
    // Update chip styles
    document.querySelectorAll('.range-chip').forEach(c => {
      const isActive = c.dataset.range === range.key;
      c.className = `range-chip flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${isActive ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}`;
      c.style.borderColor = isActive ? 'var(--hive-gold)' : 'var(--hive-border)';
    });
    refresh();
  });

  // ── Hive filter toggle handlers ───────────────────────────────────────
  document.getElementById('hiveFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-hive]');
    if (!btn) return;
    const hiveName = btn.dataset.hive;
    const color = hiveColorMap[hiveName] || '#9ca3af';
    if (enabledHives.has(hiveName)) {
      enabledHives.delete(hiveName);
      btn.style.background = 'transparent';
      btn.style.borderColor = 'var(--hive-border)';
      btn.style.color = 'var(--hive-muted)';
      btn.style.opacity = '0.5';
    } else {
      enabledHives.add(hiveName);
      btn.style.background = color + '1a';
      btn.style.borderColor = color;
      btn.style.color = color;
      btn.style.opacity = '1';
    }
    refresh();
  });

  refresh();
  const timer = setInterval(refresh, 5 * 60 * 1000);
  document.getElementById('refreshBtn').addEventListener('click', refresh);

  return () => {
    clearInterval(timer);
    weightChart.destroy();
    tempChart.destroy();
    envChart.destroy();
  };
}
