/**
 * Apiary View — Luxury Heritage design.
 */
import { renderHeader, strengthBar, strengthBadge, hexRing, formatDate, activityBadge, ICON } from '../components/ui.js';
import { renderHiveThumb } from '../components/hive-visual.js';
import { APIARY, getHives, getArchivedHives, getActivityTimeline, getApiaryNotes, getApiaryTasks, toggleTask } from '../api/dataverse.js';
import { fetchCurrentWeather, fetchStationWeather, fetchSwitchBot, SWITCHBOT_DEVICES } from '../api/weather.js';

export async function renderApiary(app) {
  const hives = getHives();
  const timeline = getActivityTimeline();
  const notes = getApiaryNotes();
  const tasks = getApiaryTasks();
  const activeHives = hives.filter(h => h.status === 'Active');
  const archivedCount = getArchivedHives().length;

  app.innerHTML = `
    ${renderHeader(APIARY.name, false, true)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Location & Weather -->
      <section class="px-5 py-4">
        <div class="flex items-center gap-5 text-sm">
          <span class="flex items-center gap-1.5 text-hive-muted">${ICON.mapPin}<span class="text-hive-text text-xs">${APIARY.location}</span></span>
          <span class="flex items-center gap-1.5 text-hive-muted">${ICON.thermometer}<span id="liveWeather" class="text-hive-text text-xs">Loading...</span></span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="px-5 mb-6">
        <div class="flex gap-2">
          <a href="#/apiary-dashboard" class="btn-action"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg><span>Charts</span></a>
          <a href="#/inspect" class="btn-action">${ICON.edit}<span>Inspect</span></a>
          <a href="#/inspect?type=harvest" class="btn-action">${ICON.flask}<span>Harvest</span></a>
          <a href="#/inspect?type=feed" class="btn-action">${ICON.book}<span>Feed</span></a>
          <a href="#/inspect?type=treatment" class="btn-action">${ICON.heart}<span>Treat</span></a>
        </div>
      </section>

      <!-- Weather Station (Bresser 7-in-1 via AWEKAS) -->
      <section class="px-5 mb-6" id="stationWeather">
        <div class="flex items-center justify-between mb-3">
          <h2 class="section-title">Weather Station</h2>
          <span class="text-[10px] text-hive-muted uppercase tracking-wider" id="stationAge">Loading...</span>
        </div>
        <div class="card p-4">
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center text-xs">
            <div>
              <div class="text-hive-muted mb-1">Outdoor</div>
              <div class="text-lg font-bold text-hive-text" id="stnTemp">—</div>
              <div class="text-hive-muted">°C</div>
            </div>
            <div>
              <div class="text-hive-muted mb-1">Humidity</div>
              <div class="text-lg font-bold text-hive-text" id="stnHum">—</div>
              <div class="text-hive-muted">%</div>
            </div>
            <div>
              <div class="text-hive-muted mb-1">Wind</div>
              <div class="text-lg font-bold text-hive-text" id="stnWind">—</div>
              <div class="text-hive-muted" id="stnWindDir">km/h</div>
            </div>
            <div>
              <div class="text-hive-muted mb-1">Rain 24h</div>
              <div class="text-lg font-bold text-hive-text" id="stnRain">—</div>
              <div class="text-hive-muted">mm</div>
            </div>
            <div>
              <div class="text-hive-muted mb-1">UV</div>
              <div class="text-lg font-bold text-hive-text" id="stnUV">—</div>
              <div class="text-hive-muted">index</div>
            </div>
            <div>
              <div class="text-hive-muted mb-1">Pressure</div>
              <div class="text-lg font-bold text-hive-text" id="stnPressure">—</div>
              <div class="text-hive-muted">hPa</div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-hive-border flex justify-between text-[11px] text-hive-muted">
            <span>Min <span id="stnTempMin">—</span>°C · Max <span id="stnTempMax">—</span>°C</span>
            <span>Gust <span id="stnGust">—</span> km/h</span>
          </div>
          <!-- SwitchBot Ambient Sensor -->
          <div class="mt-3 pt-3 border-t border-hive-border flex items-center gap-4 text-xs">
            <span class="text-hive-muted">🌡️ Apiary Sensor:</span>
            <span class="font-semibold text-hive-text" id="sbTemp">—</span><span class="text-hive-muted">°C</span>
            <span class="font-semibold text-hive-text" id="sbHum">—</span><span class="text-hive-muted">%</span>
            <span class="text-hive-muted ml-auto" id="sbBat">🔋 —%</span>
          </div>
        </div>
      </section>

      <!-- Hives -->
      <section class="px-5 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">${activeHives.length} Hive${activeHives.length !== 1 ? 's' : ''}</h2>
          <div class="flex items-center gap-3">
            ${archivedCount > 0 ? `<a href="#/archive" class="section-subtitle text-hive-muted hover:text-hive-gold transition-colors">Archive (${archivedCount})</a>` : ''}
            <a href="#/admin" class="section-subtitle text-hive-gold hover:opacity-80">Manage</a>
          </div>
        </div>
        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          ${activeHives.map(h => `
            <a href="#/hive/${encodeURIComponent(h.hiveName)}" class="flex-shrink-0 w-[170px] animate-in">
              <div class="card p-4 flex flex-col items-center" style="min-height:220px;border-top:3px solid ${h.color}">
                <div class="w-full h-24 flex items-end justify-center mb-3">${renderHiveThumb(h.components, h.color)}</div>
                <h3 class="font-serif text-sm font-medium text-hive-text text-center leading-tight mb-1.5">${h.hiveName}</h3>
                <div class="mb-1">${strengthBadge(h.strength)}</div>
                <p class="section-subtitle mt-0.5 text-center leading-tight">${h.beeType}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <div class="px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <!-- Notes (pinned only on home) -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="section-title">Notes</h2>
            <a href="#/notes" class="section-subtitle text-hive-gold">View all</a>
          </div>
          <div class="card space-y-3">
            ${notes.filter(n => n.pinned && !n.deleted).slice(0, 3).map(n => `
              <div class="flex items-start gap-3">
                <svg class="w-4 h-4 mt-0.5 text-hive-gold flex-shrink-0" fill="currentColor" stroke="currentColor" stroke-width="0.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                <div class="flex-1 min-w-0">
                  <p class="text-sm leading-relaxed text-hive-text">${n.text}</p>
                  <p class="text-[11px] text-hive-muted mt-1">${new Date(n.date).toLocaleDateString('en-GB', { month:'short', day:'numeric', year:'numeric' })}</p>
                </div>
              </div>
            `).join('') || `
              <div class="text-center py-4">
                <svg class="w-8 h-8 mx-auto text-hive-muted/40 mb-2" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                <p class="text-sm text-hive-muted">No pinned notes</p>
                <a href="#/notes" class="text-xs text-hive-gold mt-1 inline-block">Add a note</a>
              </div>
            `}
          </div>
        </section>
        <!-- Tasks (incomplete only on home) -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="section-title">Tasks</h2>
            <a href="#/tasks" class="section-subtitle text-hive-gold">View all</a>
          </div>
          <div class="card space-y-3" id="taskList">
            ${tasks.map(t => `
              <label class="flex items-center gap-3 cursor-pointer task-item" data-task-id="${t.id}">
                <input type="checkbox" class="w-4 h-4 rounded accent-[var(--hive-gold)] task-check" data-task="${t.id}">
                <span class="text-sm flex-1 text-hive-text">${t.text}</span>
                <span class="text-[10px] uppercase tracking-wider text-hive-gold">${formatDate(t.due)}</span>
              </label>
            `).join('') || `
              <div class="text-center py-4">
                <svg class="w-8 h-8 mx-auto text-hive-muted/40 mb-2" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <p class="text-sm text-hive-muted">All tasks complete!</p>
                <a href="#/tasks" class="text-xs text-hive-gold mt-1 inline-block">Add a task</a>
              </div>
            `}
          </div>
        </section>
      </div>

      <!-- Recent Activity -->
      <section class="px-5 mb-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="section-title">Recent Activity</h2>
          <a href="#/inspections" class="section-subtitle text-hive-gold">View all</a>
        </div>
        <div class="space-y-2">
          ${timeline.slice(0, 5).map(g => `
            <a href="#/inspections?date=${g.date}" class="card flex items-center gap-3 p-4 block">
              <div class="timeline-dot">
                <svg class="w-3 h-3 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
              </div>
              <div class="flex-1">
                <div class="text-sm text-hive-text">${g.count} inspection${g.count>1?'s':''}</div>
                <div class="text-[11px] text-hive-muted">${new Date(g.date).toLocaleDateString('en-GB', { month:'short', day:'numeric', year:'numeric' })}</div>
              </div>
              ${ICON.chevron}
            </a>
          `).join('')}
        </div>
      </section>

    </main>
  `;

  fetchCurrentWeather(APIARY.lat, APIARY.lng).then(w => {
    const el = document.getElementById('liveWeather');
    if (el) el.textContent = `${w.temp}\u00b0C ${w.conditions}`;
  }).catch(() => {
    const el = document.getElementById('liveWeather');
    if (el) el.textContent = '\u2014';
  });

  // Load Bresser weather station data
  fetchStationWeather().then(s => {
    if (!s) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('stnTemp', s.outdoorTemp?.toFixed(1) ?? '—');
    set('stnHum', s.humidity ?? '—');
    set('stnWind', s.windSpeed?.toFixed(1) ?? '—');
    set('stnWindDir', `${s.windCompass} km/h`);
    set('stnRain', s.rain24h?.toFixed(1) ?? '0');
    set('stnUV', s.uvIndex?.toFixed(1) ?? '—');
    set('stnPressure', s.pressure?.toFixed(0) ?? '—');
    set('stnTempMin', s.tempMin?.toFixed(1) ?? '—');
    set('stnTempMax', s.tempMax?.toFixed(1) ?? '—');
    set('stnGust', s.gustMax?.toFixed(1) ?? '—');
    set('stationAge', s.dataAge <= 1 ? 'Live' : `${s.dataAge}m ago`);
    // Update header weather to use real station data
    const lw = document.getElementById('liveWeather');
    if (lw) lw.textContent = `${s.outdoorTemp?.toFixed(1)}\u00b0C · ${s.humidity}% · ${s.windCompass} ${s.windSpeed?.toFixed(0)} km/h`;
  }).catch(() => {});

  // Load SwitchBot apiary ambient sensor
  fetchSwitchBot(SWITCHBOT_DEVICES.apiaryOutdoor).then(sb => {
    if (!sb) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('sbTemp', sb.temperature?.toFixed(1) ?? '—');
    set('sbHum', sb.humidity ?? '—');
    set('sbBat', `🔋 ${sb.battery ?? '—'}%`);
  }).catch(() => {});

  // Task checkbox — mark done and fade out from home screen
  document.querySelectorAll('.task-check').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.dataset.task;
      toggleTask(id);
      const row = cb.closest('.task-item');
      if (row) {
        row.style.opacity = '0.3';
        row.style.textDecoration = 'line-through';
        setTimeout(() => row.remove(), 600);
      }
    });
  });
}
