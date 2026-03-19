/**
 * Inspection Detail / Edit — view and edit a single inspection record.
 */
import { renderHeader } from '../components/ui.js';
import { getAllActivity, getHives } from '../api/dataverse.js';

export function renderInspectionDetail(app, params) {
  const idx = parseInt(params.id, 10);
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const from = urlParams.get('from') || '';
  const allActivity = getAllActivity();
  const record = allActivity[idx];

  if (!record) {
    app.innerHTML = `
      ${renderHeader('Not Found', true)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <p class="text-hive-muted">Inspection not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-4">Back</a>
      </div>`;
    return;
  }

  const backUrl = from ? `#/hive/${encodeURIComponent(from)}` : '#/inspections';

  app.innerHTML = `
    ${renderHeader('Inspection', true, false, backUrl)}
    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-4">

      <div class="card-surface">
        <div class="flex items-center justify-between mb-3">
          <span class="pill-amber">${record.type}</span>
          <span class="text-sm text-hive-muted">${new Date(record.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <h2 class="font-serif text-lg font-medium text-hive-text mb-4">${record.hive}</h2>
      </div>

      <form id="inspForm" class="space-y-4">
        <div class="card-surface grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-hive-muted mb-1">Date</label>
            <input type="date" id="inspDate" class="input-field" value="${record.date}">
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Strength %</label>
            <input type="number" id="inspStrength" class="input-field" min="0" max="100" value="${record.strength || ''}">
          </div>
        </div>

        <div class="card-surface grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-hive-muted mb-1">Queen Seen</label>
            <select id="inspQueen" class="input-field">
              <option value="false" ${!record.queenSeen ? 'selected' : ''}>No</option>
              <option value="true" ${record.queenSeen ? 'selected' : ''}>Yes</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Brood Spotted</label>
            <select id="inspBrood" class="input-field">
              <option value="false" ${!record.broodSpotted ? 'selected' : ''}>No</option>
              <option value="true" ${record.broodSpotted ? 'selected' : ''}>Yes</option>
            </select>
          </div>
        </div>

        <div class="card-surface">
          <label class="block text-xs text-hive-muted mb-1">Notes</label>
          <textarea id="inspNotes" class="input-field" rows="4">${record.notes || ''}</textarea>
        </div>

        <div class="flex items-center gap-3 mt-1 text-sm text-hive-muted">
          ${record.queenSeen ? '<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-hive-sage"></span> Queen spotted</span>' : ''}
          ${record.broodSpotted ? '<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full" style="background:var(--hive-blue)"></span> Brood present</span>' : ''}
        </div>

        <a href="${backUrl}" class="btn-secondary w-full py-3 text-center block">Back</a>
      </form>
    </main>
  `;
}
