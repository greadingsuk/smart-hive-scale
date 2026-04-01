/**
 * Device Health page — ESP32 hive stand management + live telemetry status.
 */
import { renderHeader, formatDate } from '../components/ui.js';
import { getDevices, saveDevices, addDevice, removeDevice, getHives, fetchTelemetry } from '../api/dataverse.js';

export async function renderDevices(app) {
  const devices = getDevices();
  const hives = getHives();

  // Fetch latest telemetry to determine last-seen + battery per device MAC
  let telemetryByMAC = {};
  try {
    const all = await fetchTelemetry(null, 168); // last 7 days
    for (const r of all) {
      if (!r.deviceMAC) continue;
      const mac = r.deviceMAC.toUpperCase();
      if (!telemetryByMAC[mac] || new Date(r.timestamp) > new Date(telemetryByMAC[mac].timestamp)) {
        telemetryByMAC[mac] = r;
      }
    }
  } catch { /* telemetry unavailable — show dashes */ }

  function deviceStatus(mac) {
    const latest = telemetryByMAC[mac.toUpperCase()];
    if (!latest || !latest.timestamp) return { status: 'No Data', lastSeen: null, battery: null, weight: null, temp: null };
    const age = Date.now() - new Date(latest.timestamp).getTime();
    const mins = Math.floor(age / 60000);
    const status = mins <= 20 ? 'Online' : mins <= 120 ? 'Delayed' : 'Offline';
    return {
      status,
      lastSeen: latest.timestamp,
      battery: latest.batteryVoltage,
      weight: latest.weight,
      temp: latest.internalTemp,
    };
  }

  const enriched = devices.map(d => ({ ...d, ...deviceStatus(d.id) }));
  const onlineCount = enriched.filter(d => d.status === 'Online').length;
  const offlineCount = enriched.filter(d => d.status === 'Offline' || d.status === 'No Data').length;

  app.innerHTML = `
    ${renderHeader('Device Health', true)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Summary -->
      <section class="grid grid-cols-3 gap-3">
        <div class="card text-center">
          <div class="text-2xl font-bold text-hive-sage">${onlineCount}</div>
          <div class="text-xs text-hive-muted mt-1">Online</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl font-bold text-hive-red">${offlineCount}</div>
          <div class="text-xs text-hive-muted mt-1">Offline</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl font-bold text-hive-text">${devices.length}</div>
          <div class="text-xs text-hive-muted mt-1">Total</div>
        </div>
      </section>

      <!-- Device Cards -->
      <section class="space-y-4" id="deviceList">
        ${enriched.map((d, i) => {
          const statusColor = d.status === 'Online' ? 'pill-green' : d.status === 'Delayed' ? 'pill-amber' : 'pill-red';
          const statusDot = d.status === 'Online' ? 'bg-hive-sage' : d.status === 'Delayed' ? 'bg-hive-gold' : 'bg-hive-red';
          const batDisplay = d.battery != null ? `${d.battery.toFixed(2)}V` : '—';
          const batColor = d.battery >= 3.7 ? 'text-hive-sage' : d.battery >= 3.3 ? 'text-hive-gold' : d.battery != null ? 'text-hive-red' : 'text-hive-muted';
          return `
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center" style="background:rgba(245,197,24,0.1)">
                  <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M12 12h.008v.008H12V12zm-.25 0a.25.25 0 11.5 0 .25.25 0 01-.5 0z"/></svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-hive-text">${d.name}</div>
                  <div class="text-[11px] text-hive-muted font-mono">${d.id}</div>
                </div>
              </div>
              <span class="pill ${statusColor}">
                <span class="w-1.5 h-1.5 rounded-full ${statusDot} mr-1.5${d.status === 'Online' ? ' animate-pulse' : ''}"></span>
                ${d.status}
              </span>
            </div>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
              <div class="bg-hive-bg rounded-lg p-2.5">
                <div class="text-hive-muted mb-0.5">Last Seen</div>
                <div class="font-semibold text-hive-text">${d.lastSeen ? formatDate(d.lastSeen) : '—'}</div>
              </div>
              <div class="bg-hive-bg rounded-lg p-2.5">
                <div class="text-hive-muted mb-0.5">Battery</div>
                <div class="font-semibold ${batColor}">${batDisplay}</div>
              </div>
              <div class="bg-hive-bg rounded-lg p-2.5">
                <div class="text-hive-muted mb-0.5">Firmware</div>
                <div class="font-semibold text-hive-text">${d.firmware || '—'}</div>
              </div>
              <div class="bg-hive-bg rounded-lg p-2.5">
                <div class="text-hive-muted mb-0.5">IP Address</div>
                <div class="font-semibold text-hive-text font-mono text-[11px]">${d.ip || '—'}</div>
              </div>
            </div>

            <!-- Hive Assignment -->
            <div class="flex items-center justify-between bg-hive-bg rounded-lg p-3">
              <div class="text-xs text-hive-muted uppercase tracking-wider">Assigned Hive</div>
              <select data-device-idx="${i}" class="device-hive-select bg-hive-surface border border-hive-border rounded-lg px-3 py-1.5 text-sm text-hive-text focus:outline-none focus:border-hive-gold">
                <option value="">Unassigned</option>
                ${hives.map(h => `<option value="${h.hiveName}" ${d.hiveId === h.hiveName || d.hiveId === h.id ? 'selected' : ''}>${h.hiveName}</option>`).join('')}
              </select>
            </div>

            <!-- Remove Device -->
            <div class="mt-3 flex justify-end">
              <button data-remove-mac="${d.id}" class="text-[10px] text-hive-muted hover:text-hive-red uppercase tracking-wider transition-colors">Remove Device</button>
            </div>
          </div>`;
        }).join('')}
      </section>

      <!-- Add Device -->
      <section>
        <button id="addDeviceBtn" class="card w-full text-center group" style="border-style:dashed">
          <div class="flex items-center justify-center gap-2 py-2">
            <svg class="w-5 h-5 text-hive-muted group-hover:text-hive-gold transition-colors" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            <span class="text-sm text-hive-muted group-hover:text-hive-gold transition-colors">Add ESP32 Device</span>
          </div>
        </button>
      </section>

      <!-- Add Device Modal (hidden) -->
      <div id="addDeviceModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/60" id="deviceModalOverlay"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-md">
          <div class="card p-6 relative">
            <h2 class="font-serif text-lg font-medium text-hive-text mb-5">Add ESP32 Device</h2>
            <form id="addDeviceForm" class="space-y-4">
              <div>
                <label class="login-label">Device Name</label>
                <input type="text" id="devName" class="input-field" placeholder="e.g. IoT Hive Stand 3" required>
              </div>
              <div>
                <label class="login-label">MAC Address</label>
                <input type="text" id="devMAC" class="input-field font-mono" placeholder="e.g. D4:E9:F4:XX:XX:XX" required pattern="^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$">
              </div>
              <div>
                <label class="login-label">IP Address</label>
                <input type="text" id="devIP" class="input-field font-mono" placeholder="e.g. 192.168.1.77">
              </div>
              <div>
                <label class="login-label">Firmware Version</label>
                <input type="text" id="devFW" class="input-field" placeholder="e.g. v2.0.0" value="v2.0.0">
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" id="cancelDevice" class="btn-secondary flex-1">Cancel</button>
                <button type="submit" class="btn-primary flex-1">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Field Calibration Guide -->
      <section class="card">
        <button id="cal-toggle" class="w-full flex items-center justify-between text-left">
          <div class="section-subtitle">Field Calibration Guide</div>
          <svg id="cal-chevron" class="w-5 h-5 text-hive-muted transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="cal-guide" class="hidden mt-4 space-y-4 text-sm text-hive-text">

          <div class="bg-hive-bg rounded-lg p-4">
            <div class="font-semibold text-hive-gold mb-2">What You Need</div>
            <ul class="space-y-1 text-hive-muted text-xs list-disc list-inside">
              <li>1 kg bag of sugar (unopened, sealed)</li>
              <li>Access to the hive stand</li>
              <li>The button on the ESP32 unit</li>
            </ul>
          </div>

          <div class="bg-hive-bg rounded-lg p-4">
            <div class="font-semibold text-hive-sage mb-2">Verification (Accuracy Check)</div>
            <div class="text-xs text-hive-muted">Use this to confirm the scale is reading correctly, without changing any settings.</div>
            <ol class="mt-2 space-y-2 text-xs text-hive-muted list-decimal list-inside">
              <li><strong class="text-hive-text">Wake the device</strong> — press the button once to wake from sleep</li>
              <li><strong class="text-hive-text">Double-press</strong> the button within the 5-second menu</li>
              <li>The OLED will show <span class="font-mono text-hive-gold">VERIFY SCALE</span> and record the baseline weight</li>
              <li><strong class="text-hive-text">Place the 1 kg bag of sugar</strong> on top of the hive</li>
              <li><strong class="text-hive-text">Press the button</strong> to confirm</li>
              <li>The screen shows the delta and a <span class="font-mono text-hive-sage">PASS</span> or <span class="font-mono text-hive-red">FAIL</span> result (tolerance: ±50g)</li>
              <li>Press the button to exit</li>
            </ol>
          </div>

          <div class="bg-hive-bg rounded-lg p-4">
            <div class="font-semibold text-hive-red mb-2">Recalibration (Fix Accuracy)</div>
            <div class="text-xs text-hive-muted">Only use this if verification <strong>fails</strong>. This overwrites the stored calibration factor.</div>
            <ol class="mt-2 space-y-2 text-xs text-hive-muted list-decimal list-inside">
              <li><strong class="text-hive-text">Wake the device</strong> — press the button once to wake from sleep</li>
              <li><strong class="text-hive-text">Long-press</strong> the button (hold for 2 seconds) within the 5-second menu</li>
              <li>The OLED shows <span class="font-mono text-hive-gold">RECALIBRATE</span></li>
              <li><strong class="text-hive-text">Remove the sugar</strong> from the hive, then press the button</li>
              <li>Wait while the baseline is recorded (don't touch the hive)</li>
              <li><strong class="text-hive-text">Place the 1 kg sugar</strong> on the hive, then press the button</li>
              <li>The screen shows the old factor, new factor, and a verification reading</li>
              <li><strong class="text-hive-text">Press to save</strong> the new factor, or wait 15 seconds to cancel</li>
            </ol>
          </div>

          <div class="bg-hive-bg rounded-lg p-4">
            <div class="font-semibold text-hive-blue mb-2">Button Quick Reference</div>
            <div class="grid grid-cols-2 gap-2 text-xs mt-2">
              <div class="text-hive-muted">Single press</div>
              <div class="text-hive-text font-semibold">Show status (30s)</div>
              <div class="text-hive-muted">Double press</div>
              <div class="text-hive-text font-semibold">Verify accuracy</div>
              <div class="text-hive-muted">Hold 2 seconds</div>
              <div class="text-hive-text font-semibold">Recalibrate</div>
            </div>
          </div>

          <div class="text-[11px] text-hive-muted italic">
            Recommended: verify once in spring and once in midsummer. Only recalibrate if verification fails.
          </div>
        </div>
      </section>

    </main>
  `;

  // Wire calibration guide toggle
  const calToggle = app.querySelector('#cal-toggle');
  const calGuide = app.querySelector('#cal-guide');
  const calChevron = app.querySelector('#cal-chevron');
  if (calToggle) {
    calToggle.addEventListener('click', () => {
      calGuide.classList.toggle('hidden');
      calChevron.classList.toggle('rotate-180');
    });
  }

  // Wire hive assignment dropdowns
  app.querySelectorAll('.device-hive-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = parseInt(sel.dataset.deviceIdx);
      const devs = getDevices();
      devs[idx].hiveId = sel.value;
      saveDevices(devs);
    });
  });

  // Wire remove device buttons
  app.querySelectorAll('[data-remove-mac]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mac = btn.dataset.removeMac;
      if (confirm(`Remove device ${mac}?`)) {
        removeDevice(mac);
        renderDevices(app);
      }
    });
  });

  // Wire add device modal
  const modal = document.getElementById('addDeviceModal');
  const showModal = () => modal.classList.remove('hidden');
  const hideModal = () => modal.classList.add('hidden');

  document.getElementById('addDeviceBtn').addEventListener('click', showModal);
  document.getElementById('deviceModalOverlay').addEventListener('click', hideModal);
  document.getElementById('cancelDevice').addEventListener('click', hideModal);

  document.getElementById('addDeviceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('devName').value.trim();
    const mac = document.getElementById('devMAC').value.trim().toUpperCase();
    const ip = document.getElementById('devIP').value.trim();
    const fw = document.getElementById('devFW').value.trim();
    if (!name || !mac) return;

    addDevice({ id: mac, name, firmware: fw || 'v2.0.0', ip: ip || '', hiveId: '' });
    renderDevices(app);
  });
}
