/**
 * Device Health page — ESP32 and SwitchBot sensor status + hive assignment.
 */
import { renderHeader, formatDate } from '../components/ui.js';
import { getDevices, getHives } from '../api/dataverse.js';

// Persist device→hive assignments in localStorage
const ASSIGNMENT_KEY = 'hive-device-assignments';
function getAssignments() {
  try { return JSON.parse(localStorage.getItem(ASSIGNMENT_KEY)) || {}; } catch { return {}; }
}
function setAssignment(deviceId, hiveId) {
  const a = getAssignments();
  a[deviceId] = hiveId;
  localStorage.setItem(ASSIGNMENT_KEY, JSON.stringify(a));
}

export function renderDevices(app) {
  const devices = getDevices();
  const hives = getHives();
  const assignments = getAssignments();
  const espDevices = devices.filter(d => d.type === 'ESP32');

  app.innerHTML = `
    ${renderHeader('Device Health', true)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Summary Cards -->
      <section class="grid grid-cols-3 gap-3">
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-green">${devices.filter(d => d.status === 'Online').length}</div>
          <div class="text-xs text-hive-muted mt-1">Online</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-red">${devices.filter(d => d.status === 'Offline').length}</div>
          <div class="text-xs text-hive-muted mt-1">Offline</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-text">${devices.length}</div>
          <div class="text-xs text-hive-muted mt-1">Total</div>
        </div>
      </section>

      <!-- IoT Hive Stand Assignments -->
      ${espDevices.length ? `
      <section class="card-surface">
        <div class="flex items-center justify-between mb-4">
          <div class="section-subtitle">IoT Hive Stand Assignments</div>
          <span class="text-[10px] text-hive-muted uppercase tracking-wider">Firmware update required after changing</span>
        </div>
        <div class="space-y-3">
          ${espDevices.map(d => {
            const assigned = assignments[d.id] || d.hiveId || '';
            return `
            <div class="flex items-center gap-4 bg-hive-bg rounded-lg p-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-hive-amber/10">📡</div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-hive-text">${d.name}</div>
                <div class="text-[11px] text-hive-muted font-mono">${d.id} · ${d.ip}</div>
              </div>
              <select data-device-id="${d.id}" class="device-hive-select bg-hive-surface border border-hive-border rounded-lg px-3 py-1.5 text-sm text-hive-text focus:outline-none focus:ring-2 focus:ring-hive-amber/50">
                <option value="">Unassigned</option>
                ${hives.map(h => `<option value="${h.hiveName}" ${assigned === h.hiveName || assigned === h.id ? 'selected' : ''}>${h.hiveName}</option>`).join('')}
              </select>
            </div>`;
          }).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Device List -->
      <section class="space-y-3">
        ${devices.map(d => `
          <div class="card-surface">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${d.status === 'Online' ? 'bg-hive-green/10' : 'bg-hive-red/10'}">
                  ${d.type === 'ESP32' ? '📡' : '🌡️'}
                </div>
                <div>
                  <div class="text-sm font-semibold">${d.name}</div>
                  <div class="text-xs text-hive-muted">${d.location}${d.hiveId ? ` · ${assignments[d.id] || d.hiveId}` : ''}</div>
                </div>
              </div>
              <span class="pill ${d.status === 'Online' ? 'pill-green' : 'pill-red'}">
                <span class="w-1.5 h-1.5 rounded-full ${d.status === 'Online' ? 'bg-hive-green' : 'bg-hive-red'} mr-1.5 animate-pulse"></span>
                ${d.status}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              ${d.type === 'ESP32' ? `
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">MAC Address</div>
                  <div class="font-semibold text-hive-text font-mono text-[11px]">${d.id}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Firmware</div>
                  <div class="font-semibold text-hive-text">${d.firmware}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">IP Address</div>
                  <div class="font-semibold text-hive-text">${d.ip}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${d.lastSeen ? formatDate(d.lastSeen) : '—'}</div>
                </div>
              ` : `
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Temperature</div>
                  <div class="font-semibold text-hive-amber">${d.temp}°C</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Humidity</div>
                  <div class="font-semibold text-hive-blue">${d.humidity}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${d.battery >= 50 ? 'text-hive-green' : 'text-hive-red'}">${d.battery}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${formatDate(d.lastSeen)}</div>
                </div>
              `}
            </div>
          </div>
        `).join('')}
      </section>

    </main>
  `;

  // Wire up hive assignment dropdowns
  app.querySelectorAll('.device-hive-select').forEach(sel => {
    sel.addEventListener('change', () => {
      setAssignment(sel.dataset.deviceId, sel.value);
    });
  });
}
