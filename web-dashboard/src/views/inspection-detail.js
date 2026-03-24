/**
 * Inspection Detail — read-only view with padlock to unlock editing.
 * Shows all fields matching the inspection form.
 */
import { renderHeader, accordion, initAccordions } from '../components/ui.js';
import { getAllActivity, getCustomActivity } from '../api/dataverse.js';

const DISEASES = ['Varroa mites', 'Nosema', 'Chalkbrood', 'Stonebrood', 'American Foulbrood', 'European Foulbrood'];
const PESTS = ['Waxmoth', 'Mice', 'Ants', 'Wasps', 'Small Hive Beetle', 'Hornets'];
const BROOD_PATTERNS = ['', 'Compact', 'Spotty', 'Patchy', 'Drone-heavy', 'None visible'];

export function renderInspectionDetail(app, params) {
  const id = params.id;
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const fromPage = urlParams.get('from') || '';
  const dateFilter = urlParams.get('date') || '';

  // Merge static + custom activity for lookup
  const allActivity = [...getAllActivity(), ...getCustomActivity()];
  const record = allActivity.find(a => a.id === id) || allActivity[parseInt(id, 10)];

  if (!record) {
    app.innerHTML = `
      ${renderHeader('Not Found', true)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Inspection not found</p>
        <a href="#/inspections" class="btn-primary inline-block mt-4">Back to Inspections</a>
      </div>`;
    return;
  }

  // Determine back URL
  let backUrl = '#/inspections';
  if (fromPage === 'inspections' && dateFilter) backUrl = `#/inspections?date=${dateFilter}`;
  else if (fromPage && fromPage !== 'inspections') backUrl = `#/hive/${encodeURIComponent(fromPage)}`;

  const strengthColor = (record.strength || 0) >= 80 ? 'var(--hive-sage)' : (record.strength || 0) >= 50 ? 'var(--hive-gold)' : 'var(--hive-red)';

  app.innerHTML = `
    ${renderHeader(record.hive, true, false, backUrl)}
    <main class="max-w-3xl mx-auto p-5 pb-8 space-y-5">

      <!-- Header card with date + padlock -->
      <div class="card-surface">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="pill-amber">${record.type || 'Inspection'}</span>
            <input type="date" id="inspDate" class="text-sm px-2 py-1 rounded-lg" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" value="${record.date}" disabled>
          </div>
          <button id="lockToggle" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all" style="background:var(--hive-bg);border:1px solid var(--hive-border);font-family:'DM Sans',sans-serif;color:var(--hive-muted)">
            <svg id="lockIcon" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            <span id="lockLabel">Locked</span>
          </button>
        </div>
        <h2 class="font-serif text-xl font-medium text-hive-text mt-3">${record.hive}</h2>
      </div>

      <!-- Card 1: Colony Assessment -->
      <section class="card p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span class="section-subtitle block mb-3">Colony Health</span>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-hive-text">Queen Spotted</span>
                <label class="toggle-switch">
                  <input type="checkbox" data-field="queenSeen" ${record.queenSeen ? 'checked' : ''} disabled>
                  <div class="toggle-track"></div>
                  <div class="toggle-knob"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-hive-text">Brood Spotted</span>
                <label class="toggle-switch">
                  <input type="checkbox" data-field="broodSpotted" ${record.broodSpotted ? 'checked' : ''} disabled>
                  <div class="toggle-track"></div>
                  <div class="toggle-knob"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-hive-text">Queen Cells Spotted</span>
                <label class="toggle-switch">
                  <input type="checkbox" data-field="queenCells" ${record.queenCells ? 'checked' : ''} disabled>
                  <div class="toggle-track"></div>
                  <div class="toggle-knob"></div>
                </label>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="section-subtitle">Hive Strength</span>
                <span id="strengthValue" class="text-lg font-serif font-medium" style="color:${strengthColor}">${record.strength || '—'}%</span>
              </div>
              <input type="range" id="strengthSlider" min="0" max="100" value="${record.strength || 80}" class="w-full accent-[var(--hive-gold)]" disabled>
            </div>
            <div class="border-t pt-3" style="border-color:var(--hive-border)">
              <span class="section-subtitle block mb-3">Temperament</span>
              <div class="flex gap-2">
                ${['Gentle', 'Active', 'Aggressive'].map(t =>
                  `<button type="button" data-temperament="${t}" class="temperament-pill ${record.temperament === t ? 'btn-primary' : 'btn-secondary'} flex-1 py-2 text-xs" disabled>${t}</button>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
          <label class="section-subtitle block mb-2">Brood Pattern</label>
          <select id="broodPattern" class="input-field" disabled>
            ${BROOD_PATTERNS.map(p => `<option value="${p}" ${record.broodPattern === p ? 'selected' : ''}>${p || 'Not assessed'}</option>`).join('')}
          </select>
        </div>
      </section>

      <!-- Card 2: Measurements & Issues -->
      <section class="card p-5">
        <span class="section-subtitle block mb-3">Hive Weight</span>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Left (kg)</label>
            <input type="number" id="weightLeft" class="input-field" step="0.01" value="${record.weightLeft || ''}" placeholder="—" disabled>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Right (kg)</label>
            <input type="number" id="weightRight" class="input-field" step="0.01" value="${record.weightRight || ''}" placeholder="—" disabled>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Total (kg)</label>
            <input type="number" id="weightTotal" class="input-field" step="0.01" value="${record.weightTotal || ''}" placeholder="—" disabled>
          </div>
        </div>

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
          <h3 class="section-subtitle mb-2">Issues</h3>
          ${accordion('diseases', 'Diseases', `<div class="grid grid-cols-2 gap-2 pb-2">${DISEASES.map(d => `<label class="flex items-center gap-2"><input type="checkbox" data-disease="${d}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(record.diseases || []).includes(d) ? 'checked' : ''} disabled><span class="text-sm text-hive-text">${d}</span></label>`).join('')}</div>`)}
          ${accordion('pests', 'Pests', `<div class="grid grid-cols-2 gap-2 pb-2">${PESTS.map(p => `<label class="flex items-center gap-2"><input type="checkbox" data-pest="${p}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(record.pests || []).includes(p) ? 'checked' : ''} disabled><span class="text-sm text-hive-text">${p}</span></label>`).join('')}</div>`)}
        </div>
      </section>

      <!-- Card 3: Notes & Environment -->
      <section class="card p-5">
        <label class="section-subtitle block mb-2">Notes</label>
        <textarea id="inspNotes" class="input-field min-h-[80px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" disabled>${record.notes || ''}</textarea>

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
          <span class="section-subtitle block mb-3">Environment</span>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[11px] text-hive-muted block mb-1">Weather</label>
              <input type="text" id="weatherConditions" class="input-field" value="${record.weatherConditions || ''}" placeholder="—" disabled>
            </div>
            <div>
              <label class="text-[11px] text-hive-muted block mb-1">Temp (\u00b0C)</label>
              <input type="number" id="weatherTemp" class="input-field" value="${record.weatherTemp || ''}" placeholder="—" disabled>
            </div>
          </div>
        </div>
      </section>

      <!-- Save button (hidden until unlocked) -->
      <div id="saveBar" class="hidden">
        <button id="saveBtn" class="btn-primary w-full py-3">Save Changes</button>
      </div>

      <a href="${backUrl}" class="btn-secondary w-full py-3 text-center block">Back</a>
    </main>
  `;

  initAccordions(app);

  // Padlock toggle
  let locked = true;
  const lockBtn = document.getElementById('lockToggle');
  const lockIcon = document.getElementById('lockIcon');
  const lockLabel = document.getElementById('lockLabel');
  const saveBar = document.getElementById('saveBar');
  const allInputs = app.querySelectorAll('input, textarea, select');
  const tempButtons = app.querySelectorAll('.temperament-pill');

  lockBtn.addEventListener('click', () => {
    locked = !locked;
    allInputs.forEach(el => { if (el.id !== 'weightTotal') el.disabled = locked; });
    tempButtons.forEach(btn => btn.disabled = locked);

    if (locked) {
      lockIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>';
      lockLabel.textContent = 'Locked';
      lockBtn.style.color = 'var(--hive-muted)';
      saveBar.classList.add('hidden');
    } else {
      lockIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>';
      lockLabel.textContent = 'Editing';
      lockBtn.style.color = 'var(--hive-gold)';
      saveBar.classList.remove('hidden');
    }
  });

  // Strength slider
  const slider = document.getElementById('strengthSlider');
  const strengthLabel = document.getElementById('strengthValue');
  slider.addEventListener('input', () => { strengthLabel.textContent = slider.value + '%'; });

  // Temperament pills
  tempButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (locked) return;
      tempButtons.forEach(b => b.className = 'temperament-pill btn-secondary flex-1 py-2 text-xs');
      btn.className = 'temperament-pill btn-primary flex-1 py-2 text-xs';
    });
  });

  // Weight auto-calc
  const wl = document.getElementById('weightLeft'), wr = document.getElementById('weightRight'), wt = document.getElementById('weightTotal');
  const calcTotal = () => { const l = parseFloat(wl.value)||0, r = parseFloat(wr.value)||0; if (l>0||r>0) wt.value = (l+r).toFixed(2); };
  wl.addEventListener('input', calcTotal);
  wr.addEventListener('input', calcTotal);

  // Save (for custom/localStorage records only)
  document.getElementById('saveBtn')?.addEventListener('click', () => {
    // Show confirmation toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in';
    toast.style.cssText = 'background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)';
    toast.textContent = 'Inspection updated';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
  });
}
