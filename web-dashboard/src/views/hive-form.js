/**
 * Add/Edit Hive form — like HiveBloom's "Add New Hive" screen.
 */
import { renderHeader } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { getHiveById, addHive, updateHive, deleteHive, BREED_OPTIONS, HIVE_TYPES, COMPONENT_TYPES, QUEEN_SOURCES, QUEEN_COLORS } from '../api/dataverse.js';

export function renderHiveForm(app, params) {
  const hiveId = params.id;
  const isEdit = hiveId && hiveId !== 'new';
  const existing = isEdit ? getHiveById(hiveId) : null;

  const hive = existing || {
    hiveName: '',
    type: 'Hive',
    hiveStyle: 'National',
    beeType: 'Buckfast',
    strength: 100,
    color: '#f59e0b',
    queenMarked: false,
    queenColor: null,
    queenYear: new Date().getFullYear(),
    orientation: 'vertical',
    components: [{ type: 'roof' }, { type: 'deep-box' }, { type: 'stand' }],
  };

  const colorOptions = [
    { value: '#f59e0b', label: 'Amber' },
    { value: '#ef4444', label: 'Red' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#22c55e', label: 'Green' },
    { value: '#a78bfa', label: 'Purple' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#f97316', label: 'Orange' },
  ];

  app.innerHTML = `
    ${renderHeader(isEdit ? 'Edit ' + hive.hiveName : 'Add New Hive', true, false, isEdit ? '#/hive/' + encodeURIComponent(hive.hiveName) : '#/admin')}

    <main class="max-w-6xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-6">

        <!-- Visual Preview -->
        <section class="flex justify-center py-6 rounded-2xl" style="background: var(--hive-surface)">
          ${renderHiveStack(hive.components, { size: 'md' })}
        </section>

        <!-- Name -->
        <section class="card-surface">
          <label class="block section-subtitle mb-2">Hive Name</label>
          <input type="text" id="hiveName" class="input-field text-lg" value="${hive.hiveName}" placeholder="e.g. Hive 7 - Luna" required>
        </section>

        <!-- Type & Style -->
        <section class="card-surface grid grid-cols-2 gap-4">
          <div>
            <label class="block section-subtitle mb-2">Type</label>
            <select id="hiveType" class="input-field">
              <option value="Hive" ${hive.type === 'Hive' ? 'selected' : ''}>Hive</option>
              <option value="Nuc" ${hive.type === 'Nuc' ? 'selected' : ''}>Nuc</option>
            </select>
          </div>
          <div>
            <label class="block section-subtitle mb-2">Hive Style</label>
            <select id="hiveStyle" class="input-field">
              ${HIVE_TYPES.map(t => `<option value="${t}" ${hive.hiveStyle === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
        </section>

        <!-- Queen -->
        <section class="card-surface">
          <h3 class="section-subtitle mb-3">Queen Details</h3>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Breed / Type</label>
              <select id="beeType" class="input-field">
                ${BREED_OPTIONS.map(b => `<option value="${b}" ${hive.beeType === b ? 'selected' : ''}>${b}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Source</label>
              <select id="queenSource" class="input-field">
                ${QUEEN_SOURCES.map(s => `<option value="${s}" ${hive.queenSource === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Year Introduced</label>
              <input type="number" id="queenYear" class="input-field" value="${hive.queenYear || ''}" min="2018" max="2030">
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Date Added</label>
              <input type="date" id="queenAddedDate" class="input-field" value="${hive.queenAddedDate || ''}">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Marked</label>
              <select id="queenMarked" class="input-field">
                <option value="false" ${!hive.queenMarked ? 'selected' : ''}>No</option>
                <option value="true" ${hive.queenMarked ? 'selected' : ''}>Yes</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Mark Colour</label>
              <select id="queenColor" class="input-field">
                <option value="">None</option>
                ${QUEEN_COLORS.map(c => `<option value="${c}" ${hive.queenColor === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Clipped</label>
              <select id="queenClipped" class="input-field">
                <option value="false" ${!hive.queenClipped ? 'selected' : ''}>No</option>
                <option value="true" ${hive.queenClipped ? 'selected' : ''}>Yes</option>
              </select>
            </div>
            <div></div>
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Queen Notes</label>
            <textarea id="queenNotes" class="input-field" rows="2" placeholder="e.g. Gentle temperament, prolific layer">${hive.queenNotes || ''}</textarea>
          </div>
        </section>

        <!-- Strength -->
        <section class="card-surface">
          <label class="block section-subtitle mb-2">Hive Strength</label>
          <div class="flex items-center gap-4">
            <input type="range" id="strengthSlider" min="0" max="100" value="${hive.strength}" class="flex-1 accent-hive-amber">
            <span id="strengthVal" class="text-xl font-bold text-hive-amber w-14 text-right">${hive.strength}%</span>
          </div>
        </section>

        <!-- Build Link -->
        ${isEdit ? `
        <a href="#/build/${hiveId}" class="card-surface flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Build / Edit Components</div>
              <div class="text-xs text-hive-muted">${(hive.components || []).length} components</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>` : ''}

        <!-- Actions -->
        <section class="space-y-3">
          <button type="submit" class="btn-primary w-full py-3">${isEdit ? 'Save Changes' : 'Add Hive'}</button>
          <a href="${isEdit ? '#/hive/' + encodeURIComponent(hive.hiveName) : '#/admin'}" class="btn-secondary w-full py-3 text-center block">Cancel</a>
          ${isEdit ? `<button type="button" id="deleteBtn" class="w-full py-3 text-xs uppercase tracking-wider text-hive-red hover:text-hive-red/80 transition-colors" style="font-family:Inter,sans-serif">Delete Hive</button>` : ''}
        </section>

      </form>
    </main>
  `;

  // Strength slider
  const slider = document.getElementById('strengthSlider');
  slider.addEventListener('input', () => {
    document.getElementById('strengthVal').textContent = slider.value + '%';
  });

  // Form submit
  document.getElementById('hiveForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      hiveName: document.getElementById('hiveName').value.trim(),
      type: document.getElementById('hiveType').value,
      hiveStyle: document.getElementById('hiveStyle').value,
      beeType: document.getElementById('beeType').value,
      color: hive.color || '#f59e0b',
      strength: parseInt(slider.value, 10),
      queenYear: parseInt(document.getElementById('queenYear').value, 10) || null,
      queenMarked: document.getElementById('queenMarked').value === 'true',
      queenColor: document.getElementById('queenColor').value || null,
      queenClipped: document.getElementById('queenClipped').value === 'true',
      queenSource: document.getElementById('queenSource').value || 'Unknown',
      queenAddedDate: document.getElementById('queenAddedDate').value || null,
      queenNotes: document.getElementById('queenNotes').value.trim(),
      orientation: 'vertical',
    };

    if (isEdit) {
      updateHive(hiveId, data);
      window.location.hash = '#/hive/' + encodeURIComponent(data.hiveName);
    } else {
      data.components = [{ type: 'roof' }, { type: 'deep-box' }, { type: 'stand' }];
      const newHive = addHive(data);
      window.location.hash = '#/build/' + newHive.id;
    }
  });

  // Delete
  if (isEdit) {
    document.getElementById('deleteBtn')?.addEventListener('click', () => {
      if (confirm(`Delete "${hive.hiveName}"? This cannot be undone.`)) {
        deleteHive(hiveId);
        window.location.hash = '#/apiary';
      }
    });
  }
}
