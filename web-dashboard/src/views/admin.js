/**
 * Admin page — manage hives/nucs and apiary settings.
 */
import { renderHeader } from '../components/ui.js';
import { renderHiveThumb } from '../components/hive-visual.js';
import { APIARY, getHives } from '../api/dataverse.js';

export function renderAdmin(app) {
  const hives = getHives();
  const activeHives = hives.filter(h => h.type === 'Hive' && h.status === 'Active');
  const activeNucs = hives.filter(h => h.type === 'Nuc' && h.status === 'Active');

  app.innerHTML = `
    ${renderHeader('Admin', true)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Admin Navigation -->
      <section class="grid grid-cols-2 gap-3">
        <a href="#/devices" class="card-surface flex flex-col items-center gap-2 py-6 text-center hover:border-hive-green/50">
          <span class="text-3xl">📡</span>
          <span class="text-sm font-semibold text-hive-text">Device Health</span>
          <span class="text-xs text-hive-muted">ESP32 & SwitchBot</span>
        </a>
        <a href="#/apiary-dashboard" class="card-surface flex flex-col items-center gap-2 py-6 text-center hover:border-hive-blue/50">
          <span class="text-3xl">📊</span>
          <span class="text-sm font-semibold text-hive-text">Hive Dashboard</span>
          <span class="text-xs text-hive-muted">Charts & Telemetry</span>
        </a>
      </section>

      <!-- Apiary Info -->
      <section>
        <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Apiary</h2>
        <div class="card-surface space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Name</span>
            <span class="text-sm font-medium">${APIARY.name}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Location</span>
            <span class="text-sm font-medium">${APIARY.location}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Hives</span>
            <span class="text-sm font-bold text-hive-amber">${activeHives.length}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Nucs</span>
            <span class="text-sm font-bold text-hive-blue">${activeNucs.length}</span>
          </div>
        </div>
      </section>

      <!-- Manage Hives -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider">Hives & Nucs</h2>
          <a href="#/hive-form/new" class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Hive
          </a>
        </div>
        <div class="space-y-2">
          ${hives.map(h => `
            <div class="card-surface flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ${h.color}15, ${h.color}05)">
                  ${renderHiveThumb(h.components, h.color)}
                </div>
                <div>
                  <div class="text-sm font-medium">${h.hiveName}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-hive-muted">${h.beeType}</span>
                    ${h.hiveStyle ? `<span class="text-xs text-hive-muted">${h.hiveStyle}</span>` : ''}
                    <span class="text-xs ${h.status === 'Active' ? 'text-hive-green' : 'text-hive-muted'}">${h.status}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-sm font-bold ${h.strength >= 80 ? 'text-hive-green' : h.strength >= 50 ? 'text-hive-amber' : 'text-hive-red'}">${h.strength}%</div>
                <a href="#/hive-form/${h.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </a>
                <a href="#/build/${h.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Build">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Account -->
      <section>
        <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Account</h2>
        <div class="card-surface space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Logged in as</span>
            <span class="text-sm font-medium text-hive-amber">Grant</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Dashboard</span>
            <span class="text-xs text-hive-muted">v2.0.0</span>
          </div>
          <button onclick="sessionStorage.removeItem('hive_user'); window.location.hash='#/login'" class="w-full btn-secondary text-hive-red border-hive-red/30 hover:border-hive-red mt-2">
            Sign Out
          </button>
        </div>
      </section>

    </main>
  `;
}
