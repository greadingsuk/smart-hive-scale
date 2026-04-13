/**
 * Individual Hive Dashboard — visual detail view with inspection timeline.
 */
import { renderHeader, strengthBar, formatDate, activityBadge } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { getHives, getHiveActivity, getCustomActivity, getHiveNote, setHiveNote, getAllActivity, splitHive, combineHives, deadOutHive, moveHive, convertHive, sellHive, moveQueen, getActiveHives, fetchTelemetry } from '../api/dataverse.js';
import { fetchSwitchBot, SWITCHBOT_DEVICES } from '../api/weather.js';

export async function renderHiveDashboard(app, params) {
  const hiveName = params.id;
  const hives = getHives();
  const hive = hives.find(h => h.hiveName === hiveName);
  const activity = [...getHiveActivity(hiveName), ...getCustomActivity().filter(a => a.hive === hiveName)]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!hive) {
    app.innerHTML = `
      ${renderHeader('Not Found', true)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Hive not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
      </div>`;
    return;
  }

  const strengthColor = hive.strength >= 80 ? '#22c55e' : hive.strength >= 50 ? '#f59e0b' : '#ef4444';
  const queenAge = hive.queenYear ? (new Date().getFullYear() - hive.queenYear) : null;

  const inspections = activity.filter(a => a.type === 'Inspection');
  const lastInspDate = inspections.length ? new Date(inspections[0].date) : null;
  const daysSinceInsp = lastInspDate ? Math.floor((new Date() - lastInspDate) / 86400000) : null;
  const hiveNote = getHiveNote(hive.id);

  // Queen age in years, months, days
  let queenAgeDisplay = '—';
  if (hive.queenAddedDate) {
    const qa = new Date(hive.queenAddedDate);
    const now = new Date();
    let years = now.getFullYear() - qa.getFullYear();
    let months = now.getMonth() - qa.getMonth();
    let days = now.getDate() - qa.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    parts.push(`${days}d`);
    queenAgeDisplay = parts.join(' ');
  }

  const queenColorHex = { Green: 'var(--hive-sage)', Pink: '#ec4899', Blue: 'var(--hive-blue)', Yellow: '#eab308', Red: 'var(--hive-red)', White: '#e5e7eb' };

  app.innerHTML = `
    ${renderHeader(hive.hiveName, true)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card — compact header -->
      <section class="px-4 pt-4 pb-2">
        <div class="card p-5">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h2 class="font-serif text-xl font-bold text-hive-text">${hive.hiveName}</h2>
                <div class="flex items-center gap-1.5">
                  <span class="text-2xl font-bold" style="color:${strengthColor}">${hive.strength}%</span>
                  <span class="text-[10px] text-hive-muted uppercase tracking-wider">Strength</span>
                </div>
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="pill-amber">${hive.beeType}</span>
                <span class="${hive.type === 'Nuc' ? 'pill-blue' : 'pill-orange'}">${hive.type}</span>
                ${hive.hiveStyle ? `<span class="pill-blue">${hive.hiveStyle}</span>` : ''}
                <span class="pill-green">${hive.status}</span>
                <a href="#/hive-form/${hive.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Two-panel: Queen Profile + Hive Metrics -->
      <section class="px-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        <!-- Queen Profile -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">Queen Profile</div>
            <a href="#/hive-form/${hive.id}" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80" style="font-family:'DM Sans',sans-serif">Edit</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                ${hive.queenMarked
                  ? `<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${queenColorHex[hive.queenColor] || 'var(--hive-muted)'}"></span><span class="text-sm text-hive-text">${hive.queenColor} Marked</span>`
                  : '<span class="text-sm text-hive-muted">Unmarked</span>'}
                ${hive.queenClipped ? '<span class="text-sm text-hive-muted ml-1">&middot; Clipped</span>' : ''}
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Breed:</span><span class="text-sm text-hive-text">${hive.beeType}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Source:</span><span class="text-sm text-hive-text">${hive.queenSource || '\u2014'}</span>
              </div>
              ${hive.queenAddedDate ? `<div>
                <div class="text-sm text-hive-text">Added: ${new Date(hive.queenAddedDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</div>
                <div class="text-sm text-hive-text">Age: ${queenAgeDisplay}${hive.queenYear ? ` (${hive.queenYear})` : ''}</div>
              </div>` : ''}
              ${hive.queenNotes ? `<p class="text-xs text-hive-muted italic">${hive.queenNotes}</p>` : ''}
            </div>
            <!-- Queen Image \u2014 large, right side -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              <div class="relative w-28 h-28 rounded-xl overflow-hidden" style="border:2px dashed var(--hive-border)">
                ${hive.queenImage
                  ? `<img src="${hive.queenImage}" class="w-full h-full object-cover" alt="Queen">`
                  : `<div class="w-full h-full flex flex-col items-center justify-center text-hive-muted"><svg class="w-10 h-10 mb-1 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span class="text-[9px] uppercase tracking-wider opacity-30">Queen Photo</span></div>`}
                <button id="queenImageBtn" class="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style="background:var(--hive-gold);color:#0B0D0E"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg></button>
              </div>
              <input type="file" id="queenImageInput" accept="image/*" class="hidden">
            </div>
          </div>
        </div>

        <!-- Hive Metrics + Visual -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Hive Metrics</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
                <span class="text-sm text-hive-text">Added: ${new Date(hive.dateAdded).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                <span class="text-sm text-hive-text">${inspections.length} Inspections <span class="text-hive-muted">(Since Jun 2025)</span></span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 flex-shrink-0 ${daysSinceInsp !== null && daysSinceInsp > 10 ? 'text-hive-red' : 'text-hive-muted'}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-sm ${daysSinceInsp !== null && daysSinceInsp > 10 ? 'text-hive-red' : 'text-hive-text'}">Last Activity: ${daysSinceInsp !== null ? daysSinceInsp : '\u2014'} Days${lastInspDate ? ` (${lastInspDate.toLocaleDateString('en-GB', {day:'numeric',month:'short'})})` : ''}</span>
              </div>
            </div>
            <!-- Hive visual — centered and prominent -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              ${renderHiveStack(hive.components || [], { size: 'md' })}
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons — 3 across -->
      <section class="px-4 mb-4 grid grid-cols-3 gap-3">
        <button id="editHiveNote" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 ${hiveNote ? 'text-hive-gold' : 'text-hive-muted'}" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Hive Notes</div>
          <div class="text-[10px] text-hive-muted">${hiveNote ? 'View / Edit' : 'Add Note'}</div>
        </button>
        <a href="#/apiary-dashboard" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Weight Tracking</div>
          <div class="text-[10px] text-hive-muted">Analyze Charts</div>
        </a>
        <a href="#/build/${hive.id}" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Hive Build</div>
          <div class="text-[10px] text-hive-muted">Components: ${(hive.components || []).length}</div>
        </a>
      </section>

      <!-- Hive Note Modal -->
      <div id="noteModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="noteModalBackdrop"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto">
          <div class="rounded-2xl overflow-hidden" style="background:var(--hive-surface);border:1px solid var(--hive-border);box-shadow:0 25px 50px rgba(0,0,0,0.4)">
            <div class="p-5" style="border-bottom:1px solid var(--hive-border)">
              <div class="flex items-center justify-between">
                <h3 class="font-serif text-lg font-medium text-hive-text">${hiveNote ? 'Edit' : 'Add'} Hive Note</h3>
                <button id="noteModalClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${hive.hiveName} — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div class="p-5">
              <textarea id="noteModalText" rows="5" class="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-hive-gold/40" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" placeholder="Write your note about this hive…">${hiveNote ? hiveNote.text : ''}</textarea>
            </div>
            <div class="px-5 pb-5 flex items-center justify-between">
              ${hiveNote ? '<button id="noteModalDelete" class="text-xs text-hive-red hover:opacity-80 uppercase tracking-wider" style="font-family:\'DM Sans\',sans-serif">Delete Note</button>' : '<span></span>'}
              <div class="flex gap-2">
                <button id="noteModalCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
                <button id="noteModalSave" class="btn-primary text-xs py-2 px-5">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- IoT Sensor Data -->
      <section class="px-4 mb-4">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">IoT Sensors</div>
            <a href="#/apiary-dashboard" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80">View Charts →</a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center" id="iotCards-${hive.id}">
            <div class="rounded-xl p-3" style="background:var(--hive-bg)">
              <div class="text-[10px] text-hive-muted uppercase mb-1">Hive Temp</div>
              <div class="text-lg font-bold text-hive-text" id="iotTemp">—</div>
              <div class="text-[10px] text-hive-muted">°C (DS18B20)</div>
            </div>
            <div class="rounded-xl p-3" style="background:var(--hive-bg)">
              <div class="text-[10px] text-hive-muted uppercase mb-1">Weight</div>
              <div class="text-lg font-bold text-hive-text" id="iotWeight">—</div>
              <div class="text-[10px] text-hive-muted">kg (HX711)</div>
            </div>
            <div class="rounded-xl p-3" style="background:var(--hive-bg)">
              <div class="text-[10px] text-hive-muted uppercase mb-1">Battery</div>
              <div class="text-lg font-bold text-hive-text" id="iotBattery">—</div>
              <div class="text-[10px] text-hive-muted">V</div>
            </div>
            <div class="rounded-xl p-3" style="background:var(--hive-bg)">
              <div class="text-[10px] text-hive-muted uppercase mb-1">Last Seen</div>
              <div class="text-lg font-bold text-hive-text" id="iotLastSeen">—</div>
              <div class="text-[10px] text-hive-muted" id="iotDevice"></div>
            </div>
          </div>
          <!-- SwitchBot inside sensor (Hive 5 only) -->
          <div id="sbInsideRow" class="hidden mt-3 pt-3 border-t border-hive-border flex items-center gap-4 text-xs">
            <span class="text-hive-muted">🌡️ Inside (SwitchBot):</span>
            <span class="font-semibold text-hive-text" id="sbInsideTemp">—</span><span class="text-hive-muted">°C</span>
            <span class="font-semibold text-hive-text" id="sbInsideHum">—</span><span class="text-hive-muted">%</span>
            <span class="text-hive-muted ml-auto" id="sbInsideBat">🔋 —%</span>
          </div>
          <!-- Mini temp chart (hidden until data loads) -->
          <div id="miniChartWrapper" class="mt-3 pt-3 border-t border-hive-border hidden">
            <canvas id="hiveMiniChart" class="w-full" style="height:120px"></canvas>
          </div>
        </div>
      </section>

      <!-- Hive Operations -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Hive Operations</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button data-op="split" class="card-surface text-center py-3">
            <div class="section-subtitle">Split</div>
          </button>
          <button data-op="combine" class="card-surface text-center py-3">
            <div class="section-subtitle">Combine</div>
          </button>
          <button data-op="dead" class="card-surface text-center py-3">
            <div class="section-subtitle">Dead Out</div>
          </button>
          <button data-op="move" class="card-surface text-center py-3">
            <div class="section-subtitle">Move</div>
          </button>
          <button data-op="sell" class="card-surface text-center py-3 col-span-1 sm:col-span-2">
            <div class="section-subtitle">Sell</div>
          </button>
          <button data-op="convert" class="card-surface text-center py-3 col-span-1 sm:col-span-2">
            <div class="section-subtitle">${hive.type === 'Hive' ? 'Downsize to Nuc' : 'Upgrade to Hive'}</div>
          </button>
        </div>
      </section>

      <!-- Inspection Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Hive Timeline</h3>
        <div class="space-y-0">
          ${activity.map((a, i) => {
            const isInspection = a.type === 'Inspection';
            const isBuild = a.type === 'Build Change';
            const dotColor = isBuild ? 'rgba(59,130,246,0.1)' : 'rgba(212,175,55,0.1)';
            const iconColor = isBuild ? 'var(--hive-blue)' : 'var(--hive-gold)';
            const icon = isBuild
              ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>'
              : '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>';
            const tag = isInspection ? 'a' : 'div';
            const href = isInspection ? ` href="#/inspection/${a.id || i}?from=${encodeURIComponent(hiveName)}"` : '';
            return `
            <${tag}${href} class="flex gap-3 ${i < activity.length - 1 ? 'pb-4' : ''} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: ${dotColor}; color: ${iconColor}">
                  ${icon}
                </div>
                ${i < activity.length - 1 ? '<div class="w-px bg-hive-border flex-1 mt-1"></div>' : ''}
              </div>
              <div class="flex-1 pb-1">
                <div class="flex items-center justify-between">
                  ${activityBadge(a.type)}
                  <span class="text-xs text-hive-muted">${new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                ${a.notes ? `<p class="text-sm text-hive-text mt-1 leading-relaxed">${a.notes}</p>` : ''}
                <div class="flex gap-3 mt-1.5 text-xs text-hive-muted">
                  ${a.queenSeen ? '<span style="color:var(--hive-sage)">Queen spotted</span>' : ''}
                  ${a.broodSpotted ? '<span style="color:var(--hive-blue)">Brood present</span>' : ''}
                  ${a.strength ? `<span>${a.strength}%</span>` : ''}
                </div>
              </div>
            </${tag}>`;
          }).join('')}
          ${activity.length === 0 ? '<p class="text-hive-muted text-sm text-center py-6">No activity recorded yet.</p>' : ''}
        </div>
      </section>

    </main>

    <!-- Floating Action Bar -->
    <div class="fab-bar">
      <div class="max-w-6xl mx-auto flex justify-around">
        <a href="#/inspect?hive=${encodeURIComponent(hive.hiveName)}" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <span>Inspect</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(hive.hiveName)}&type=harvest" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          <span>Harvest</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(hive.hiveName)}&type=feed" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span>Feed</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(hive.hiveName)}&type=treatment" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span>Treat</span>
        </a>
      </div>
    </div>
  `;

  // Wire up hive note modal
  const noteModal = document.getElementById('noteModal');
  const openModal = () => noteModal?.classList.remove('hidden');
  const closeModal = () => noteModal?.classList.add('hidden');

  document.getElementById('editHiveNote')?.addEventListener('click', openModal);
  document.getElementById('noteModalBackdrop')?.addEventListener('click', closeModal);
  document.getElementById('noteModalClose')?.addEventListener('click', closeModal);
  document.getElementById('noteModalCancel')?.addEventListener('click', closeModal);

  document.getElementById('noteModalSave')?.addEventListener('click', () => {
    const text = document.getElementById('noteModalText')?.value.trim();
    if (!text) return;
    setHiveNote(hive.id, text);
    closeModal();
    renderHiveDashboard(app, params);
  });

  document.getElementById('noteModalDelete')?.addEventListener('click', () => {
    if (!confirm('Delete this hive note?')) return;
    setHiveNote(hive.id, '');
    closeModal();
    renderHiveDashboard(app, params);
  });

  // Wire up queen image lightbox (tap thumbnail to enlarge)
  document.getElementById('queenImageThumb')?.addEventListener('click', () => {
    if (!hive.queenImage) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:pointer;';
    overlay.innerHTML = `<img src="${hive.queenImage}" style="max-width:90vw;max-height:85vh;border-radius:12px;object-fit:contain;" alt="Queen">`;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });

  // ── Load IoT telemetry for this hive ────────────────────────────────────
  (async () => {
    try {
      const allData = await fetchTelemetry(null, 168); // 7 days
      // Filter to this hive — match by hiveName or hive.id patterns
      const hiveData = allData.filter(r => {
        const rid = r.hiveId || '';
        return rid === hiveName || rid === hive.id
          || hiveName.toLowerCase().includes(rid.toLowerCase())
          || rid.toLowerCase().includes(hiveName.replace(/[^a-z0-9]/gi, '').toLowerCase());
      });

      if (hiveData.length > 0) {
        const latest = hiveData[hiveData.length - 1];
        const set = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.textContent = val; };

        if (latest.internalTemp != null && latest.internalTemp > -100) set('iotTemp', latest.internalTemp.toFixed(1));
        if (latest.weight > 0) set('iotWeight', latest.weight.toFixed(1));
        if (latest.batteryVoltage > 0) set('iotBattery', latest.batteryVoltage.toFixed(2));
        if (latest.deviceMAC) set('iotDevice', latest.deviceMAC);

        if (latest.timestamp) {
          const secs = Math.floor((Date.now() - new Date(latest.timestamp)) / 1000);
          set('iotLastSeen', secs < 60 ? `${secs}s` : secs < 3600 ? `${Math.floor(secs/60)}m` : `${Math.floor(secs/3600)}h`);
        }

        // Mini temperature chart (7 days)
        const tempPts = hiveData
          .filter(r => r.internalTemp != null && r.internalTemp > -100)
          .map(r => ({ x: new Date(r.timestamp), y: r.internalTemp }));

        if (tempPts.length > 1) {
          document.getElementById('miniChartWrapper')?.classList.remove('hidden');
          const { Chart, registerables } = await import('chart.js');
          await import('chartjs-adapter-date-fns');
          Chart.register(...registerables);

          new Chart(document.getElementById('hiveMiniChart'), {
            type: 'line',
            data: {
              datasets: [{
                label: 'Hive Temp',
                data: tempPts,
                borderColor: hive.color || '#f59e0b',
                backgroundColor: (hive.color || '#f59e0b') + '1a',
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2,
              }]
            },
            options: {
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a1d27', borderColor: '#2a2e3e', borderWidth: 1, titleColor: '#e4e4e7', bodyColor: '#e4e4e7' } },
              scales: {
                x: { type: 'time', time: { unit: 'day', tooltipFormat: 'dd MMM HH:mm', displayFormats: { day: 'dd MMM' } }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', maxTicksLimit: 7 } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: '°C', color: '#9ca3af' } }
              }
            }
          });
        }
      }
    } catch (e) { /* telemetry not available */ }

    // SwitchBot inside sensor — only for Hive 5
    if (hiveName.includes('5') || hiveName.toLowerCase().includes('survivor')) {
      try {
        const sb = await fetchSwitchBot(SWITCHBOT_DEVICES.hive5Inside);
        if (sb) {
          const row = document.getElementById('sbInsideRow');
          if (row) row.classList.remove('hidden');
          const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
          set('sbInsideTemp', sb.temperature?.toFixed(1) ?? '—');
          set('sbInsideHum', sb.humidity ?? '—');
          set('sbInsideBat', `🔋 ${sb.battery ?? '—'}%`);
        }
      } catch { /* switchbot not available */ }
    }
  })();

  // Wire up hive operation buttons
  app.querySelector('[data-op="split"]')?.addEventListener('click', () => {
    if (!confirm(`Split "${hive.hiveName}"? This will create a new nuc from this hive.`)) return;
    const name = prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');
    if (!name) return;
    const notes = prompt('Split notes (optional):') || '';
    const newNuc = splitHive(hive.id, name, notes);
    if (newNuc && confirm('Move the queen to the new nuc?')) {
      moveQueen(hive.id, newNuc.id, `Queen moved during split to ${name}`);
    }
    window.location.hash = '#/apiary';
  });

  app.querySelector('[data-op="combine"]')?.addEventListener('click', () => {
    const otherHives = getHives().filter(h => h.id !== hive.id && h.status === 'Active');
    if (!otherHives.length) { alert('No other active hives to combine with.'); return; }
    if (!confirm(`Combine "${hive.hiveName}" into another hive? This hive will be deactivated.`)) return;
    const list = otherHives.map((h, i) => `${i + 1}. ${h.hiveName}`).join('\n');
    const choice = prompt(`Combine ${hive.hiveName} INTO which hive? (this hive will be deactivated)\n\n${list}\n\nEnter number:`);
    if (!choice) return;
    const idx = parseInt(choice, 10) - 1;
    if (idx < 0 || idx >= otherHives.length) { alert('Invalid selection.'); return; }
    const notes = prompt('Combine notes (optional):') || '';
    combineHives(otherHives[idx].id, hive.id, notes);
    window.location.hash = '#/apiary';
  });

  app.querySelector('[data-op="dead"]')?.addEventListener('click', () => {
    if (!confirm(`Mark "${hive.hiveName}" as dead? This will deactivate the hive.`)) return;
    const notes = prompt('Notes on the death (optional):') || '';
    deadOutHive(hive.id, notes);
    window.location.hash = '#/apiary';
  });

  app.querySelector('[data-op="move"]')?.addEventListener('click', () => {
    const location = prompt('Where is the hive being moved to?');
    if (!location) return;
    const notes = prompt('Move notes (optional):') || '';
    moveHive(hive.id, location, notes);
    alert(`${hive.hiveName} move recorded to timeline.`);
    window.location.hash = '#/hive/' + encodeURIComponent(hive.hiveName);
  });

  app.querySelector('[data-op="convert"]')?.addEventListener('click', () => {
    const direction = hive.type === 'Hive' ? 'downsize to a Nuc' : 'upgrade to a full Hive';
    if (!confirm(`Convert "${hive.hiveName}" — ${direction}?\n\nAll components will be swapped to the matching type.`)) return;
    const notes = prompt('Conversion notes (optional):') || '';
    const updated = convertHive(hive.id, notes);
    if (updated) window.location.hash = '#/hive/' + encodeURIComponent(updated.hiveName);
  });

  app.querySelector('[data-op="sell"]')?.addEventListener('click', () => {
    if (!confirm(`Sell "${hive.hiveName}"? This will deactivate the hive.`)) return;
    const buyer = prompt('Buyer name (optional):') || '';
    const priceStr = prompt('Sale price (£):');
    const price = priceStr ? parseFloat(priceStr) : null;
    const notes = prompt('Sale notes (optional):') || '';
    sellHive(hive.id, buyer, notes, price);
    window.location.hash = '#/apiary';
  });
}
