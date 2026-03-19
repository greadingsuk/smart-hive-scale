/**
 * Device Health page — ESP32 and SwitchBot sensor status.
 */
import { renderHeader, formatDate } from '../components/ui.js';
import { getDevices } from '../api/dataverse.js';

export function renderDevices(app) {
  const devices = getDevices();

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

      <!-- Device List -->
      <section class="space-y-3">
        ${devices.map(d => `
          <div class="card-surface">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${d.status === 'Online' ? 'bg-hive-green/10' : 'bg-hive-red/10'}">
                  ${d.type === 'ESP32' ? '🔌' : '🌡️'}
                </div>
                <div>
                  <div class="text-sm font-semibold">${d.name}</div>
                  <div class="text-xs text-hive-muted">${d.location}</div>
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
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${d.battery >= 3.7 ? 'text-hive-green' : 'text-hive-red'}">${d.battery}V</div>
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
                  <div class="font-semibold text-hive-text">${formatDate(d.lastSeen)}</div>
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
}
