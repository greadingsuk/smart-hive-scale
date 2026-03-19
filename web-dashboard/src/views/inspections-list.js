/**
 * Inspections List — all inspections across all hives, clickable to detail.
 */
import { renderHeader } from '../components/ui.js';
import { getAllActivity } from '../api/dataverse.js';

export function renderInspections(app) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const dateFilter = urlParams.get('date') || '';
  let filtered = getAllActivity().filter(a => a.type === 'Inspection');
  if (dateFilter) filtered = filtered.filter(a => a.date === dateFilter);

  const title = dateFilter
    ? `Inspections — ${new Date(dateFilter).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
    : 'All Inspections';

  app.innerHTML = `
    ${renderHeader(title, true)}
    <main class="max-w-6xl mx-auto p-4 pb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="section-title">${filtered.length} Inspection${filtered.length !== 1 ? 's' : ''}</h2>
        ${dateFilter ? '<a href="#/inspections" class="section-subtitle text-hive-gold">View all</a>' : ''}
      </div>
      <div class="space-y-2">
        ${filtered.map((a, i) => {
          return `
          <a href="#/inspection/${a.id || i}${dateFilter ? '?from=inspections&date=' + dateFilter : ''}" class="card-surface flex items-center justify-between p-3 block">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-medium text-hive-text">${a.hive}</span>
                <span class="pill-green text-[9px]">${a.strength || '—'}%</span>
              </div>
              <p class="text-xs text-hive-muted truncate">${a.notes || 'No notes'}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0 ml-3">
              <span class="text-xs text-hive-muted">${new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </a>`;
        }).join('')}
        ${filtered.length === 0 ? '<p class="text-hive-muted text-center py-8">No inspections found.</p>' : ''}
      </div>
    </main>
  `;
}
