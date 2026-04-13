/**
 * Add/Edit Hive form — like HiveBloom's "Add New Hive" screen.
 */
import { renderHeader } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { openCropModal } from '../components/image-crop.js';
import { getHiveById, addHive, updateHive, deleteHive, moveQueen, getActiveHives, BREED_OPTIONS, HIVE_TYPES, COMPONENT_TYPES, QUEEN_SOURCES, QUEEN_COLORS } from '../api/dataverse.js';

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

    <main class="max-w-3xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-5">

        <!-- Hero: Name + Visual Preview side by side -->
        <section class="card p-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div>
                <label class="block section-subtitle mb-2">Hive Name</label>
                <input type="text" id="hiveName" class="input-field text-lg" value="${hive.hiveName}" placeholder="e.g. Hive 7 - Luna" required>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Type</label>
                  <select id="hiveType" class="input-field">
                    <option value="Hive" ${hive.type === 'Hive' ? 'selected' : ''}>Hive</option>
                    <option value="Nuc" ${hive.type === 'Nuc' ? 'selected' : ''}>Nuc</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Style</label>
                  <select id="hiveStyle" class="input-field">
                    ${HIVE_TYPES.map(t => `<option value="${t}" ${hive.hiveStyle === t ? 'selected' : ''}>${t}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center rounded-xl" style="background:var(--hive-bg)">
              ${renderHiveStack(hive.components, { size: 'md' })}
            </div>
          </div>
        </section>

        <!-- Queen Details with Image -->
        <section class="card p-5">
          <h3 class="section-subtitle mb-4">Queen Details</h3>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <!-- Queen fields -->
            <div class="col-span-2 space-y-3">
              <div class="grid grid-cols-2 gap-3">
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
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Year Introduced</label>
                  <input type="number" id="queenYear" class="input-field" value="${hive.queenYear || ''}" min="2018" max="2030">
                </div>
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Date Added</label>
                  <input type="date" id="queenAddedDate" class="input-field" value="${hive.queenAddedDate || ''}">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
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
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Clipped</label>
                  <select id="queenClipped" class="input-field">
                    <option value="false" ${!hive.queenClipped ? 'selected' : ''}>No</option>
                    <option value="true" ${hive.queenClipped ? 'selected' : ''}>Yes</option>
                  </select>
                </div>
                <div></div>
              </div>
            </div>
            <!-- Queen Image Upload -->
            <div class="flex flex-col items-center justify-start pt-1">
              <div class="relative w-full aspect-square max-w-[140px] rounded-xl overflow-hidden" style="background:var(--hive-bg);border:2px dashed var(--hive-border)">
                ${hive.queenImage
                  ? `<img src="${hive.queenImage}" class="w-full h-full object-cover" alt="Queen">`
                  : `<div class="w-full h-full flex flex-col items-center justify-center text-hive-muted"><svg class="w-10 h-10 mb-1 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span class="text-[9px] uppercase tracking-wider opacity-30">Queen Photo</span></div>`}
                <button type="button" id="queenImageBtn" class="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style="background:var(--hive-gold);color:#0B0D0E"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/></svg></button>
              </div>
              <input type="file" id="queenImageInput" accept="image/*" class="hidden">
              <span class="text-[9px] text-hive-muted mt-2 uppercase tracking-wider">Upload Photo</span>
            </div>
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Queen Notes</label>
            <textarea id="queenNotes" class="input-field" rows="2" placeholder="e.g. Gentle temperament, prolific layer">${hive.queenNotes || ''}</textarea>
          </div>
          ${isEdit ? `
          <div class="mt-4 pt-4" style="border-top:1px solid var(--hive-border)">
            <button type="button" id="moveQueenBtn" class="flex items-center gap-2 text-sm text-hive-gold hover:opacity-80 transition-opacity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
              Move Queen to Another Hive
            </button>
          </div>` : ''}
        </section>

        <!-- Strength & Hive Colour -->
        <section class="card p-5">
          <label class="block section-subtitle mb-2">Hive Strength</label>
          <div class="flex items-center gap-4 mb-5">
            <input type="range" id="strengthSlider" min="0" max="100" value="${hive.strength}" class="flex-1 accent-hive-amber">
            <span id="strengthVal" class="text-xl font-bold text-hive-amber w-14 text-right">${hive.strength}%</span>
          </div>
          <label class="block section-subtitle mb-2">Hive Colour</label>
          <div class="flex gap-2 flex-wrap" id="colorPicker">
            ${colorOptions.map(c => `
              <button type="button" data-color="${c.value}" class="color-swatch w-8 h-8 rounded-full transition-all ${hive.color === c.value ? 'ring-2 ring-offset-2 ring-offset-[var(--hive-surface)] scale-110' : 'hover:scale-110'}" style="background:${c.value};${hive.color === c.value ? `ring-color:${c.value}` : ''}" title="${c.label}"></button>
            `).join('')}
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
          ${isEdit ? `<button type="button" id="deleteBtn" class="w-full py-3 text-xs uppercase tracking-wider text-hive-red hover:text-hive-red/80 transition-colors" style="font-family:'DM Sans',sans-serif">Delete Hive</button>` : ''}
        </section>

      </form>
    </main>
  `;

  // Strength slider
  const slider = document.getElementById('strengthSlider');
  slider.addEventListener('input', () => {
    document.getElementById('strengthVal').textContent = slider.value + '%';
  });

  // Color picker
  let selectedColor = hive.color || '#f59e0b';
  document.getElementById('colorPicker').addEventListener('click', e => {
    const btn = e.target.closest('[data-color]');
    if (!btn) return;
    selectedColor = btn.dataset.color;
    document.querySelectorAll('.color-swatch').forEach(s => {
      const isActive = s.dataset.color === selectedColor;
      s.className = `color-swatch w-8 h-8 rounded-full transition-all ${isActive ? 'ring-2 ring-offset-2 ring-offset-[var(--hive-surface)] scale-110' : 'hover:scale-110'}`;
    });
  });

  // Queen image upload
  let queenImageData = hive.queenImage || null;
  document.getElementById('queenImageBtn')?.addEventListener('click', () => {
    document.getElementById('queenImageInput')?.click();
  });
  document.getElementById('queenImageInput')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      openCropModal(reader.result, (dataUrl) => {
        if (!dataUrl) return;
        queenImageData = dataUrl;
        const container = document.querySelector('#queenImageBtn').closest('.relative');
        const existing = container.querySelector('img');
        if (existing) { existing.src = queenImageData; }
        else { container.querySelector('div')?.remove(); const newImg = document.createElement('img'); newImg.src = queenImageData; newImg.className = 'w-full h-full object-cover'; newImg.alt = 'Queen'; container.prepend(newImg); }
      });
    };
    reader.readAsDataURL(file);
  });

  // Form submit
  document.getElementById('hiveForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      hiveName: document.getElementById('hiveName').value.trim(),
      type: document.getElementById('hiveType').value,
      hiveStyle: document.getElementById('hiveStyle').value,
      beeType: document.getElementById('beeType').value,
      color: selectedColor,
      strength: parseInt(slider.value, 10),
      queenYear: parseInt(document.getElementById('queenYear').value, 10) || null,
      queenMarked: document.getElementById('queenMarked').value === 'true',
      queenColor: document.getElementById('queenColor').value || null,
      queenClipped: document.getElementById('queenClipped').value === 'true',
      queenSource: document.getElementById('queenSource').value || 'Unknown',
      queenAddedDate: document.getElementById('queenAddedDate').value || null,
      queenNotes: document.getElementById('queenNotes').value.trim(),
      queenImage: queenImageData,
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

  // Move Queen
  if (isEdit) {
    document.getElementById('moveQueenBtn')?.addEventListener('click', () => {
      const others = getActiveHives().filter(h => h.id !== hiveId);
      if (!others.length) { alert('No other active hives to move the queen to.'); return; }
      const list = others.map((h, i) => `${i + 1}. ${h.hiveName}`).join('\n');
      const choice = prompt(`Move queen from ${hive.hiveName} to which hive?\n\n${list}\n\nEnter number:`);
      if (!choice) return;
      const idx = parseInt(choice, 10) - 1;
      if (idx < 0 || idx >= others.length) { alert('Invalid selection.'); return; }
      if (!confirm(`Move queen from "${hive.hiveName}" to "${others[idx].hiveName}"?`)) return;
      moveQueen(hiveId, others[idx].id);
      window.location.hash = '#/hive/' + encodeURIComponent(others[idx].hiveName);
    });
  }

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
