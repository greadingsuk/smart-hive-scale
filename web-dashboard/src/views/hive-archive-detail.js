/**
 * Hive Archive Detail — read-only history view for archived (dead, combined, moved, sold) hives.
 * Shows the hive's full lifecycle: queen profile, metrics, and complete activity timeline.
 */
import { renderHeader, strengthBar, formatDate, activityBadge } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { getHives, getHiveActivity, getCustomActivity, getHiveNote, ARCHIVE_STATUSES } from '../api/dataverse.js';

const STATUS_META = {
  Dead:     { label: 'Dead Out',  icon: '💀', pill: 'pill-red',  color: 'var(--hive-red)' },
  Combined: { label: 'Combined',  icon: '🔀', pill: 'pill-blue', color: 'var(--hive-blue)' },
  Moved:    { label: 'Moved',     icon: '📦', pill: 'pill-blue', color: 'var(--hive-blue)' },
  Sold:     { label: 'Sold',      icon: '💷', pill: 'pill-red',  color: 'var(--hive-red)' },
};

export async function renderHiveArchiveDetail(app, params) {
  const hiveName = params.id;
  const hives = getHives();
  const hive = hives.find(h => h.hiveName === hiveName);
  const activity = [...getHiveActivity(hiveName), ...getCustomActivity().filter(a => a.hive === hiveName)]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!hive) {
    app.innerHTML = `
      ${renderHeader('Not Found', true, false, '#/archive')}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Archived hive not found</p>
        <a href="#/archive" class="btn-primary inline-block mt-6">Back to Archive</a>
      </div>`;
    return;
  }

  const meta = STATUS_META[hive.status] || { label: hive.status, icon: '📋', pill: 'pill-amber', color: 'var(--hive-muted)' };
  const inspections = activity.filter(a => a.type === 'Inspection');
  const archiveEvent = activity.find(a => ['Hive Death', 'Combined', 'Moved', 'Sold'].includes(a.type));
  const hiveNote = getHiveNote(hive.id);

  // Queen age calculation
  const queenColorHex = { Green: 'var(--hive-sage)', Pink: '#ec4899', Blue: 'var(--hive-blue)', Yellow: '#eab308', Red: 'var(--hive-red)', White: '#e5e7eb' };
  let queenAgeDisplay = '—';
  if (hive.queenAddedDate) {
    const qa = new Date(hive.queenAddedDate);
    const endDate = archiveEvent ? new Date(archiveEvent.date) : new Date();
    let years = endDate.getFullYear() - qa.getFullYear();
    let months = endDate.getMonth() - qa.getMonth();
    let days = endDate.getDate() - qa.getDate();
    if (days < 0) { months--; days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    parts.push(`${days}d`);
    queenAgeDisplay = parts.join(' ');
  }

  // Lifespan
  const addedDate = new Date(hive.dateAdded);
  const endDate = archiveEvent ? new Date(archiveEvent.date) : new Date();
  const lifespanDays = Math.floor((endDate - addedDate) / 86400000);
  const lifespanMonths = Math.floor(lifespanDays / 30);

  app.innerHTML = `
    ${renderHeader(hive.hiveName, true, false, '#/archive')}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Archive Status Banner -->
      <section class="px-4 pt-4 pb-2">
        <div class="card p-5" style="border-left:3px solid ${meta.color}">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">${meta.icon}</span>
                <h2 class="font-serif text-xl font-bold text-hive-text">${hive.hiveName}</h2>
                <span class="${meta.pill}">${meta.label}</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap mb-2">
                <span class="pill-amber">${hive.beeType || 'Unknown'}</span>
                <span class="${hive.type === 'Nuc' ? 'pill-blue' : 'pill-orange'}">${hive.type}</span>
                ${hive.hiveStyle ? `<span class="pill-blue">${hive.hiveStyle}</span>` : ''}
              </div>
              ${archiveEvent ? `<p class="text-sm text-hive-muted leading-relaxed">${archiveEvent.notes}</p>` : ''}
            </div>
          </div>
        </div>
      </section>

      <!-- Two-panel: Queen Profile + Hive Summary -->
      <section class="px-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        <!-- Queen Profile (read-only) -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Queen Profile</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                ${hive.queenMarked
                  ? `<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${queenColorHex[hive.queenColor] || 'var(--hive-muted)'}"></span><span class="text-sm text-hive-text">${hive.queenColor} Marked</span>`
                  : '<span class="text-sm text-hive-muted">Unmarked</span>'}
                ${hive.queenClipped ? '<span class="text-sm text-hive-muted ml-1">&middot; Clipped</span>' : ''}
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Breed:</span><span class="text-sm text-hive-text">${hive.beeType || '—'}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Source:</span><span class="text-sm text-hive-text">${hive.queenSource || '—'}</span>
              </div>
              ${hive.queenAddedDate ? `<div>
                <div class="text-sm text-hive-text">Added: ${new Date(hive.queenAddedDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</div>
                <div class="text-sm text-hive-text">Queen age at archive: ${queenAgeDisplay}${hive.queenYear ? ` (${hive.queenYear})` : ''}</div>
              </div>` : ''}
              ${hive.queenNotes ? `<p class="text-xs text-hive-muted italic">${hive.queenNotes}</p>` : ''}
            </div>
            <!-- Queen Image -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              <div class="w-28 h-28 rounded-xl overflow-hidden" style="border:2px dashed var(--hive-border)">
                ${hive.queenImage
                  ? `<img src="${hive.queenImage}" class="w-full h-full object-cover" alt="Queen">`
                  : `<div class="w-full h-full flex flex-col items-center justify-center text-hive-muted"><svg class="w-10 h-10 mb-1 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span class="text-[9px] uppercase tracking-wider opacity-30">No Photo</span></div>`}
              </div>
            </div>
          </div>
        </div>

        <!-- Hive Summary + Visual -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Hive Summary</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
                <span class="text-sm text-hive-text">Added: ${addedDate.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>
              ${archiveEvent ? `<div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 flex-shrink-0" style="color:${meta.color}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>
                <span class="text-sm" style="color:${meta.color}">${meta.label}: ${new Date(archiveEvent.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>` : ''}
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-sm text-hive-text">Lifespan: ${lifespanMonths > 0 ? `${lifespanMonths} months` : `${lifespanDays} days`}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                <span class="text-sm text-hive-text">${inspections.length} Inspections total</span>
              </div>
              ${hiveNote ? `<div class="flex items-start gap-2.5">
                <svg class="w-4 h-4 text-hive-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span class="text-sm text-hive-text italic">"${hiveNote.text}"</span>
              </div>` : ''}
            </div>
            <!-- Hive visual -->
            <div class="flex items-center justify-center rounded-xl py-3 opacity-50" style="background:var(--hive-bg)">
              ${renderHiveStack(hive.components || [], { size: 'md' })}
            </div>
          </div>
        </div>
      </section>

      <!-- Complete Activity Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Complete History <span class="text-sm text-hive-muted font-sans">(${activity.length} records)</span></h3>
        <div class="space-y-0">
          ${activity.map((a, i) => {
            const isArchiveEvent = ['Hive Death', 'Combined', 'Moved', 'Sold'].includes(a.type);
            return `
            <a href="#/inspection/${a.id || i}?from=${encodeURIComponent('archive/' + hiveName)}" class="flex gap-3 ${i < activity.length - 1 ? 'pb-4' : ''} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: ${isArchiveEvent ? 'rgba(192,80,77,0.15)' : 'rgba(212,175,55,0.1)'}; color: ${isArchiveEvent ? 'var(--hive-red)' : 'var(--hive-gold)'}">
                  ${isArchiveEvent
                    ? `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>`
                    : `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`}
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
            </a>`;
          }).join('')}
          ${activity.length === 0 ? '<p class="text-hive-muted text-sm text-center py-6">No activity was recorded for this hive.</p>' : ''}
        </div>
      </section>

    </main>
  `;
}
