/**
 * Inspection Form — luxury heritage design with progressive disclosure.
 */
import { renderHeader } from '../components/ui.js';
import { getHives, APIARY, saveInspection, addTask } from '../api/dataverse.js';
import { fetchCurrentWeather } from '../api/weather.js';

function showToast(message, duration = 3000) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in';
  toast.style.cssText = 'background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, duration);
}

const DISEASES = ['Varroa mites', 'Nosema', 'Chalkbrood', 'Stonebrood', 'American Foulbrood', 'European Foulbrood'];
const PESTS = ['Waxmoth', 'Mice', 'Ants', 'Wasps', 'Small Hive Beetle', 'Hornets'];
const BROOD_PATTERNS = ['', 'Compact', 'Spotty', 'Patchy', 'Drone-heavy', 'None visible'];

export async function renderInspectionForm(app) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const preselectedHive = urlParams.get('hive') || '';
  const hives = getHives();
  const hiveNames = hives.filter(h => h.status === 'Active').map(h => h.hiveName);

  app.innerHTML = `
    ${renderHeader('New Inspection', true)}
    <main class="max-w-3xl mx-auto p-5 pb-8">
      <form id="inspectionForm" class="space-y-5">

        <!-- Card 1: Inspection Details -->
        <section class="card p-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="section-subtitle block mb-2">Hive <span class="text-hive-red">*</span></label>
              <select id="hiveSelect" class="input-field" required>
                <option value="">Select hive...</option>
                ${hiveNames.map(n => `<option value="${n}" ${n === preselectedHive ? 'selected' : ''}>${n}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="section-subtitle block mb-2">Inspection Date</label>
              <input type="date" id="inspectionDate" class="input-field" value="${new Date().toISOString().slice(0, 10)}">
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="section-subtitle block mb-3">Colony Health</span>
                <div class="space-y-3">
                  ${['queenSeen:Queen Spotted', 'eggsSpotted:Eggs Spotted', 'broodSpotted:Brood Spotted', 'queenCells:Queen Cells Spotted'].map(item => {
                    const [key, label] = item.split(':');
                    return `<div class="flex items-center justify-between">
                      <span class="text-sm text-hive-text">${label}</span>
                      <label class="toggle-switch">
                        <input type="checkbox" data-health="${key}">
                        <div class="toggle-track"></div>
                        <div class="toggle-knob"></div>
                      </label>
                    </div>`;
                  }).join('')}
                  <!-- Queen cell type sub-options (hidden until queen cells toggled) -->
                  <div id="queenCellTypeRow" class="hidden pl-4 pt-2 space-y-1" style="border-left:2px solid var(--hive-gold)">
                    <div class="text-[11px] text-hive-muted uppercase tracking-wider mb-1">Cell Type</div>
                    ${['swarmCells:Swarm Cells — bottom/edges, colony preparing to swarm',
                       'supersedureCells:Supersedure Cells — face centre, replacing failing queen',
                       'emergencyCells:Emergency Cells — scattered, queenless colony raising queen'].map(item => {
                      const [key, label] = item.split(':');
                      return `<label class="flex items-start gap-2 cursor-pointer py-1">
                        <input type="radio" name="queenCellType" value="${key}" class="mt-0.5 accent-[var(--hive-gold)]">
                        <span class="text-xs text-hive-text leading-tight">${label}</span>
                      </label>`;
                    }).join('')}
                  </div>
                </div>
                <!-- Smart suggestion banner -->
                <div id="smartSuggestion" class="hidden mt-3 rounded-xl p-3 text-xs" style="background:var(--hive-bg);border:1px solid var(--hive-gold)30">
                  <div class="flex items-center gap-2 mb-1">
                    <svg class="w-3.5 h-3.5 text-hive-gold flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
                    <span class="font-semibold text-hive-gold" id="suggestTitle">Suggestion</span>
                  </div>
                  <p class="text-hive-text leading-relaxed" id="suggestText"></p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="section-subtitle">Hive Strength</span>
                    <span id="strengthValue" class="text-lg font-serif font-medium text-hive-gold">80%</span>
                  </div>
                  <input type="range" id="strengthSlider" min="0" max="100" value="80" class="w-full accent-[var(--hive-gold)]">
                </div>
                <div class="border-t pt-3" style="border-color:var(--hive-border)">
                  <span class="section-subtitle block mb-3">Temperament</span>
                  <div class="flex gap-2">
                    ${['Gentle', 'Active', 'Aggressive'].map(t =>
                      `<button type="button" data-temperament="${t}" class="temperament-pill btn-secondary flex-1 py-2 text-xs">${t}</button>`
                    ).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <label class="section-subtitle block mb-2">Brood Pattern</label>
            <select id="broodPattern" class="input-field">
              ${BROOD_PATTERNS.map(p => `<option value="${p}">${p || 'Not assessed'}</option>`).join('')}
            </select>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <div class="flex items-center justify-between mb-3">
              <span class="section-subtitle">Hive Weight</span>
              <button type="button" id="fetchWeightBtn" class="section-subtitle text-hive-gold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Fetch Live
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div><label class="text-[11px] text-hive-muted block mb-1">Left (kg)</label><input type="number" id="weightLeft" class="input-field" step="0.01" placeholder="0.00"></div>
              <div><label class="text-[11px] text-hive-muted block mb-1">Right (kg)</label><input type="number" id="weightRight" class="input-field" step="0.01" placeholder="0.00"></div>
              <div><label class="text-[11px] text-hive-muted block mb-1">Total (kg)</label><input type="number" id="weightTotal" class="input-field" step="0.01" placeholder="Auto"></div>
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <h3 class="section-subtitle mb-3">Issues</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-hive-text mb-2 block">Diseases</span>
                <div class="space-y-2">
                  ${DISEASES.map(d => `<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-disease="${d}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${d}</span></label>`).join('')}
                </div>
              </div>
              <div>
                <span class="text-sm font-medium text-hive-text mb-2 block">Pests</span>
                <div class="space-y-2">
                  ${PESTS.map(p => `<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-pest="${p}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${p}</span></label>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Card 3: Notes & Environment -->
        <section class="card p-5">
          <label class="section-subtitle block mb-2">Notes</label>
          <textarea id="notes" class="input-field min-h-[80px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" placeholder="Frame-by-frame notes, observations..."></textarea>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <div class="flex items-center justify-between mb-3">
              <span class="section-subtitle">Environment</span>
              <button type="button" id="refreshWeatherBtn" class="section-subtitle text-hive-gold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Auto-fill
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-[11px] text-hive-muted block mb-1">Weather</label><input type="text" id="weatherConditions" class="input-field" placeholder="e.g. Clear Sky"></div>
              <div><label class="text-[11px] text-hive-muted block mb-1">Temp (C)</label><input type="number" id="weatherTemp" class="input-field" step="1" placeholder="Temp"></div>
            </div>
            <div id="weatherStatus" class="text-[11px] text-hive-muted mt-2"></div>
          </div>
        </section>

        <!-- Card 4: Schedule Next Inspection -->
        <section class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="section-subtitle">Schedule Next Inspection</span>
            <span id="nextInspLabel" class="text-xs text-hive-gold"></span>
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <button type="button" data-days="7" class="next-insp-btn btn-secondary text-xs py-1.5 px-3">+7d Weekly</button>
            <button type="button" data-days="14" class="next-insp-btn btn-secondary text-xs py-1.5 px-3">+14d Routine</button>
            <button type="button" data-days="21" class="next-insp-btn btn-secondary text-xs py-1.5 px-3">+21d Queen Laying</button>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Or pick a date</label>
            <input type="date" id="nextInspectionDate" class="input-field">
          </div>
          <div id="autoTasksPreview" class="mt-3 space-y-1 hidden"></div>
        </section>

        <div class="flex gap-3 pt-2">
          <button type="submit" id="saveBtn" class="btn-primary flex-1 py-3">Save Inspection</button>
          <a href="#/apiary" class="btn-secondary flex-1 py-3 text-center">Cancel</a>
        </div>
      </form>
    </main>
  `;

  const healthState = { queenSeen: false, eggsSpotted: false, broodSpotted: false, queenCells: false };
  let queenCellType = '';

  document.querySelectorAll('[data-health]').forEach(cb => {
    cb.addEventListener('change', () => {
      healthState[cb.dataset.health] = cb.checked;
      // Show/hide queen cell type sub-options
      if (cb.dataset.health === 'queenCells') {
        document.getElementById('queenCellTypeRow')?.classList.toggle('hidden', !cb.checked);
        if (!cb.checked) { queenCellType = ''; document.querySelectorAll('[name="queenCellType"]').forEach(r => r.checked = false); }
      }
      updateSmartSuggestion();
      updateAutoTaskPreview();
    });
  });
  document.querySelectorAll('[name="queenCellType"]').forEach(r => {
    r.addEventListener('change', () => { queenCellType = r.value; updateSmartSuggestion(); updateAutoTaskPreview(); });
  });

  // Smart suggestion engine
  function updateSmartSuggestion() {
    const box = document.getElementById('smartSuggestion');
    const title = document.getElementById('suggestTitle');
    const text = document.getElementById('suggestText');
    let suggestion = null;

    if (healthState.queenCells && queenCellType === 'swarmCells') {
      suggestion = { title: 'Swarm cells — act now', text: 'Perform swarm management (artificial swarm or Pagden). Inspect again in +7 days to knock down any remaining cells. Weekly cycle is critical until swarm impulse passes.', days: 7 };
    } else if (healthState.queenCells && queenCellType === 'supersedureCells') {
      suggestion = { title: 'Supersedure — leave alone', text: 'The colony is replacing a failing queen naturally. Do NOT knock down these cells. Leave the colony undisturbed for 21 days to allow the virgin to emerge, mate and begin laying.', days: 21 };
    } else if (healthState.queenCells && queenCellType === 'emergencyCells') {
      suggestion = { title: 'Emergency cells — queenless colony', text: 'The colony has no queen and is raising an emergency replacement. Leave undisturbed for 21 days. Check then for eggs — if laying, the new queen has mated successfully.', days: 21 };
    } else if (healthState.queenCells) {
      suggestion = { title: 'Queen cells spotted', text: 'Select the cell type above to get specific management advice and timing.', days: null };
    } else if (!healthState.queenSeen && !healthState.eggsSpotted && !healthState.broodSpotted) {
      suggestion = { title: 'No queen, eggs or brood — possible queenless', text: 'Urgent: confirm queen status. Check for very young larvae or eggs you may have missed. If truly queenless with no cells, consider introducing a new queen or combining with another colony. Re-inspect in +7 days.', days: 7 };
    } else if (!healthState.queenSeen && healthState.eggsSpotted) {
      suggestion = { title: 'Queen not seen but eggs present — healthy', text: 'Fresh eggs confirm the queen was laying in the last 3 days. No action needed. Continue normal weekly inspections.', days: 7 };
    } else if (!healthState.queenSeen && !healthState.eggsSpotted && healthState.broodSpotted) {
      suggestion = { title: 'No queen or eggs but brood present', text: 'Brood without eggs suggests the queen may have stopped laying or been lost recently. Re-inspect in +7 days to look for eggs or emergency queen cells.', days: 7 };
    }

    if (suggestion) {
      box.classList.remove('hidden');
      title.textContent = suggestion.title;
      text.textContent = suggestion.text;
      // Auto-select the suggested preset if available
      if (suggestion.days) {
        const presetBtn = document.querySelector(`.next-insp-btn[data-days="${suggestion.days}"]`);
        if (presetBtn && !nextInspInput.value) presetBtn.click();
      }
    } else {
      box.classList.add('hidden');
    }
  }

  let selectedTemperament = '';
  document.querySelectorAll('.temperament-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTemperament = btn.dataset.temperament;
      document.querySelectorAll('.temperament-pill').forEach(b => b.className = 'temperament-pill btn-secondary flex-1 py-2 text-xs');
      btn.className = 'temperament-pill btn-primary flex-1 py-2 text-xs';
    });
  });

  const slider = document.getElementById('strengthSlider');
  const strengthLabel = document.getElementById('strengthValue');
  slider.addEventListener('input', () => { strengthLabel.textContent = slider.value + '%'; });

  const wl = document.getElementById('weightLeft'), wr = document.getElementById('weightRight'), wt = document.getElementById('weightTotal');
  const calcTotal = () => { const l = parseFloat(wl.value)||0, r = parseFloat(wr.value)||0; if (l>0||r>0) wt.value = (l+r).toFixed(2); };
  const splitTotal = () => { const t = parseFloat(wt.value)||0; if (t>0) { const half = (t/2).toFixed(2); wl.value = half; wr.value = half; } };
  wl.addEventListener('input', calcTotal); wr.addEventListener('input', calcTotal);
  wt.addEventListener('input', splitTotal);

  document.getElementById('fetchWeightBtn').addEventListener('click', () => showToast('IoT weight fetch not yet connected'));

  // Next inspection preset buttons
  const nextInspInput = document.getElementById('nextInspectionDate');
  const nextInspLabel = document.getElementById('nextInspLabel');
  const formatDueDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  document.querySelectorAll('.next-insp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const days = parseInt(btn.dataset.days, 10);
      const inspDate = new Date(document.getElementById('inspectionDate').value || Date.now());
      const due = new Date(inspDate); due.setDate(due.getDate() + days);
      nextInspInput.value = due.toISOString().slice(0, 10);
      nextInspLabel.textContent = formatDueDate(due);
      document.querySelectorAll('.next-insp-btn').forEach(b => b.className = 'next-insp-btn btn-secondary text-xs py-1.5 px-3');
      btn.className = 'next-insp-btn btn-primary text-xs py-1.5 px-3';
    });
  });
  nextInspInput.addEventListener('change', () => {
    if (nextInspInput.value) nextInspLabel.textContent = formatDueDate(new Date(nextInspInput.value));
    document.querySelectorAll('.next-insp-btn').forEach(b => b.className = 'next-insp-btn btn-secondary text-xs py-1.5 px-3');
  });

  // Auto-task preview based on health toggles
  function updateAutoTaskPreview() {
    const preview = document.getElementById('autoTasksPreview');
    const hiveName = document.getElementById('hiveSelect').value || '(select hive)';
    const tasks = [];
    if (healthState.queenCells && queenCellType === 'swarmCells') {
      tasks.push({ text: `Swarm management check \u2014 ${hiveName}`, days: 7 });
    } else if (healthState.queenCells && queenCellType === 'supersedureCells') {
      tasks.push({ text: `Check for laying queen (supersedure) \u2014 ${hiveName}`, days: 21 });
    } else if (healthState.queenCells && queenCellType === 'emergencyCells') {
      tasks.push({ text: `Check for laying queen (emergency) \u2014 ${hiveName}`, days: 21 });
    }
    if (!healthState.queenSeen && !healthState.eggsSpotted && !healthState.queenCells) {
      tasks.push({ text: `Urgent: verify queen status \u2014 ${hiveName}`, days: 7 });
    }
    if (tasks.length) {
      preview.classList.remove('hidden');
      preview.innerHTML = '<div class="text-[11px] text-hive-muted uppercase tracking-wider mb-1">Auto-created tasks:</div>' +
        tasks.map(t => `<div class="flex items-center gap-2 text-xs"><span class="w-1.5 h-1.5 rounded-full bg-hive-gold flex-shrink-0"></span><span class="text-hive-text">${t.text}</span><span class="text-hive-muted ml-auto">+${t.days}d</span></div>`).join('');
    } else { preview.classList.add('hidden'); preview.innerHTML = ''; }
  }
  document.querySelectorAll('[data-health]').forEach(cb => cb.addEventListener('change', updateAutoTaskPreview));
  document.querySelectorAll('[name="queenCellType"]').forEach(r => r.addEventListener('change', updateAutoTaskPreview));
  document.getElementById('hiveSelect')?.addEventListener('change', updateAutoTaskPreview);

  async function fillWeather() {
    const status = document.getElementById('weatherStatus');
    try {
      status.textContent = 'Fetching...';
      const w = await fetchCurrentWeather(APIARY.lat, APIARY.lng);
      document.getElementById('weatherConditions').value = w.conditions;
      document.getElementById('weatherTemp').value = w.temp;
      status.innerHTML = '<span style="color:var(--hive-sage)">&#9679;</span> Auto-filled: ' + w.temp + '\u00b0C ' + w.conditions + ' (' + w.humidity + '% humidity, ' + w.windSpeed + ' km/h wind)';
    } catch(e) { status.textContent = 'Could not fetch weather.'; }
  }
  fillWeather();
  document.getElementById('refreshWeatherBtn').addEventListener('click', fillWeather);

  document.getElementById('inspectionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const hiveName = document.getElementById('hiveSelect').value;
    if (!hiveName) { showToast('Please select a hive'); return; }
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    const diseases = []; document.querySelectorAll('[data-disease]:checked').forEach(cb => diseases.push(cb.dataset.disease));
    const pests = []; document.querySelectorAll('[data-pest]:checked').forEach(cb => pests.push(cb.dataset.pest));
    const inspection = {
      date: document.getElementById('inspectionDate').value || new Date().toISOString().slice(0, 10), type: 'Inspection', hive: hiveName,
      strength: parseInt(slider.value, 10), queenSeen: healthState.queenSeen,
      broodSpotted: healthState.broodSpotted, queenCells: healthState.queenCells,
      temperament: selectedTemperament, broodPattern: document.getElementById('broodPattern').value,
      weightLeft: parseFloat(wl.value)||null, weightRight: parseFloat(wr.value)||null, weightTotal: parseFloat(wt.value)||null,
      diseases, pests, notes: document.getElementById('notes').value,
      weatherTemp: parseFloat(document.getElementById('weatherTemp').value)||null,
      weatherConditions: document.getElementById('weatherConditions').value||null,
    };
    saveInspection(inspection);

    // Auto-create follow-up tasks based on observations
    const inspDate = new Date(inspection.date);
    const autoTasks = [];
    if (healthState.queenCells && queenCellType === 'swarmCells') {
      const due = new Date(inspDate); due.setDate(due.getDate() + 7);
      addTask(`Swarm management check \u2014 ${hiveName}`, due.toISOString().slice(0, 10));
      autoTasks.push('Swarm check +7d');
    } else if (healthState.queenCells && queenCellType === 'supersedureCells') {
      const due = new Date(inspDate); due.setDate(due.getDate() + 21);
      addTask(`Check for laying queen (supersedure) \u2014 ${hiveName}`, due.toISOString().slice(0, 10));
      autoTasks.push('Supersedure check +21d');
    } else if (healthState.queenCells && queenCellType === 'emergencyCells') {
      const due = new Date(inspDate); due.setDate(due.getDate() + 21);
      addTask(`Check for laying queen (emergency) \u2014 ${hiveName}`, due.toISOString().slice(0, 10));
      autoTasks.push('Emergency queen check +21d');
    }
    if (!healthState.queenSeen && !healthState.eggsSpotted && !healthState.queenCells) {
      const due = new Date(inspDate); due.setDate(due.getDate() + 7);
      addTask(`Urgent: verify queen status \u2014 ${hiveName}`, due.toISOString().slice(0, 10));
      autoTasks.push('Queen verify +7d');
    }
    // Schedule next inspection if set
    const nextDate = document.getElementById('nextInspectionDate')?.value;
    if (nextDate) {
      addTask(`Inspect ${hiveName}`, nextDate);
      autoTasks.push('Next inspection');
    }

    const taskMsg = autoTasks.length ? ` (${autoTasks.length} task${autoTasks.length > 1 ? 's' : ''} created)` : '';
    showToast(`Inspection saved for ${hiveName}${taskMsg}`);
    setTimeout(() => { window.location.hash = '#/apiary'; }, 1500);
  });
}