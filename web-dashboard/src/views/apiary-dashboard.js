/**
 * Apiary Dashboard — sensor data comparison across all hives.
 * This replaces the old v1 single-hive dashboard with Chart.js charts.
 */
import { renderHeader } from '../components/ui.js';
import { fetchTelemetry } from '../api/dataverse.js';

export async function renderApiaryDashboard(app) {
  app.innerHTML = `
    ${renderHeader('Sensor Dashboard', true)}
    <main class="max-w-5xl mx-auto p-4 pb-20 md:pb-4 space-y-6">

      <!-- Time Range -->
      <div class="flex items-center gap-3">
        <select id="timeRange" class="input-field w-auto">
          <option value="6">Last 6 hours</option>
          <option value="24" selected>Last 24 hours</option>
          <option value="72">Last 3 days</option>
          <option value="168">Last 7 days</option>
          <option value="720">Last 30 days</option>
        </select>
        <button id="refreshBtn" class="btn-primary flex items-center gap-2">
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

      <!-- Charts -->
      <section class="card-surface">
        <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Weight</h3>
        <div id="weightSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="weightChart" class="w-full hidden"></canvas>
        <div id="weightEmpty" class="hidden text-center py-10">
          <svg class="w-10 h-10 mx-auto mb-2 text-hive-muted opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <p class="text-sm text-hive-muted">No weight data yet</p>
          <p class="text-xs text-hive-muted mt-1">Connect your IoT scale to start recording</p>
        </div>
      </section>

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

  // Import Chart.js
  const { Chart, registerables } = await import('chart.js');
  const dateAdapter = await import('chartjs-adapter-date-fns');
  Chart.register(...registerables);

  const chartOpts = {
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
    scales: {
      x: { type: 'time', time: { tooltipFormat: 'dd MMM HH:mm' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', maxTicksLimit: 8 } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
    },
  };

  const ds = (label, color) => ({ label, borderColor: color, backgroundColor: color + '1a', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2, data: [] });

  const weightChart = new Chart(document.getElementById('weightChart'), { type: 'line', data: { datasets: [{ ...ds('Weight (kg)', '#f59e0b'), fill: true }] }, options: { ...chartOpts, scales: { ...chartOpts.scales, y: { ...chartOpts.scales.y, title: { display: true, text: 'kg', color: '#9ca3af' } } } } });
  const tempChart = new Chart(document.getElementById('tempChart'), { type: 'line', data: { datasets: [ds('Internal (°C)', '#ef4444'), ds('Leg (°C)', '#a78bfa')] }, options: { ...chartOpts, aspectRatio: 2, scales: { ...chartOpts.scales, y: { ...chartOpts.scales.y, title: { display: true, text: '°C', color: '#9ca3af' } } } } });
  const envChart = new Chart(document.getElementById('envChart'), {
    type: 'line', data: { datasets: [{ ...ds('Humidity (%)', '#3b82f6'), yAxisID: 'yHum' }, { ...ds('Battery (V)', '#22c55e'), yAxisID: 'yBat' }] },
    options: { ...chartOpts, aspectRatio: 2, scales: { x: chartOpts.scales.x, yHum: { type: 'linear', position: 'left', grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#3b82f6' }, title: { display: true, text: '%', color: '#3b82f6' } }, yBat: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#22c55e' }, title: { display: true, text: 'V', color: '#22c55e' } } } },
  });

  async function refresh() {
    const hours = parseInt(document.getElementById('timeRange').value, 10);
    const cutoff = new Date(Date.now() - hours * 3600 * 1000);

    // Hide skeletons helper
    const hideSkeleton = (id) => { const el = document.getElementById(id); if (el) el.classList.add('hidden'); };
    const showCanvas = (id) => { const el = document.getElementById(id); if (el) el.classList.remove('hidden'); };

    try {
      const data = await fetchTelemetry();
      document.getElementById('errorBanner').classList.add('hidden');

      const filtered = data.filter(r => new Date(r.timestamp) >= cutoff);

      // Remove skeletons, show charts
      hideSkeleton('weightSkeleton'); hideSkeleton('tempSkeleton'); hideSkeleton('envSkeleton');

      if (filtered.length > 0) {
        showCanvas('weightChart'); showCanvas('tempChart'); showCanvas('envChart');
        document.getElementById('weightEmpty')?.classList.add('hidden');

        const latest = filtered[filtered.length - 1];
        const setVal = (id, val, dec) => { document.getElementById(id).textContent = val != null ? Number(val).toFixed(dec) : '—'; };
        setVal('latestWeight', latest.weight, 1);
        setVal('latestTemp', latest.internalTemp, 1);
        setVal('latestHum', latest.hiveHum, 1);
        setVal('latestBat', latest.batteryVoltage, 2);
        setVal('latestLeg', latest.legTemp, 1);

        const secs = Math.floor((Date.now() - new Date(latest.timestamp)) / 1000);
        document.getElementById('lastReading').textContent = secs < 60 ? `${secs}s ago` : secs < 3600 ? `${Math.floor(secs / 60)}m ago` : `${Math.floor(secs / 3600)}h ago`;
        document.getElementById('dataPoints').textContent = `${filtered.length} pts`;
      } else {
        // Show empty state for weight, still show (empty) charts for temp/env
        document.getElementById('weightEmpty')?.classList.remove('hidden');
        showCanvas('tempChart'); showCanvas('envChart');
      }

      const toPoint = (row, field) => ({ x: new Date(row.timestamp), y: row[field] });
      weightChart.data.datasets[0].data = filtered.map(r => toPoint(r, 'weight'));
      tempChart.data.datasets[0].data = filtered.map(r => toPoint(r, 'internalTemp'));
      tempChart.data.datasets[1].data = filtered.map(r => toPoint(r, 'legTemp'));
      envChart.data.datasets[0].data = filtered.map(r => toPoint(r, 'hiveHum'));
      envChart.data.datasets[1].data = filtered.map(r => toPoint(r, 'batteryVoltage'));
      weightChart.update('none'); tempChart.update('none'); envChart.update('none');
    } catch (err) {
      const banner = document.getElementById('errorBanner');
      banner.textContent = `Failed to load sensor data: ${err.message}`;
      banner.classList.remove('hidden');
    }
  }

  refresh();
  const timer = setInterval(refresh, 5 * 60 * 1000);

  document.getElementById('timeRange').addEventListener('change', refresh);
  document.getElementById('refreshBtn').addEventListener('click', refresh);

  // Return cleanup function
  return () => {
    clearInterval(timer);
    weightChart.destroy();
    tempChart.destroy();
    envChart.destroy();
  };
}
