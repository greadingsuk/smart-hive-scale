/**
 * Apiary Selection — choose or create an apiary after login.
 * Apiaries are stored in localStorage for now; future: Dataverse table.
 */
import { APIARY } from '../api/dataverse.js';

const APIARIES_KEY = 'apiary_list';
const ACTIVE_KEY = 'active_apiary';

function getApiaries() {
  const saved = localStorage.getItem(APIARIES_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fall through */ }
  }
  // Seed with the current apiary as default
  const defaults = [{
    id: 'home',
    name: APIARY.name,
    location: APIARY.location,
    lat: APIARY.lat,
    lng: APIARY.lng,
    hiveCount: null, // populated dynamically
    color: '#F5C518',
  }];
  localStorage.setItem(APIARIES_KEY, JSON.stringify(defaults));
  return defaults;
}

function saveApiaries(list) {
  localStorage.setItem(APIARIES_KEY, JSON.stringify(list));
}

export function getActiveApiary() {
  const saved = sessionStorage.getItem(ACTIVE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fall through */ }
  }
  return null;
}

export function setActiveApiary(apiary) {
  sessionStorage.setItem(ACTIVE_KEY, JSON.stringify(apiary));
}

export async function renderApiarySelect(app) {
  const apiaries = getApiaries();
  const user = JSON.parse(sessionStorage.getItem('hive_user') || '{}');

  app.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-center p-5">
      <div class="w-full max-w-xl animate-in">

        <!-- Greeting -->
        <div class="text-center mb-8">
          <h1 class="font-serif text-2xl font-medium text-hive-text mb-2">
            Welcome back${user.name ? ', ' + user.name : ''}
          </h1>
          <p class="text-sm text-hive-muted">Select an apiary to manage</p>
        </div>

        <!-- Apiary Cards -->
        <div class="grid gap-4 mb-6" id="apiaryGrid">
          ${apiaries.map((a, i) => `
            <button class="apiary-card card text-left w-full flex items-center gap-4 group" data-idx="${i}">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${a.color || 'var(--hive-gold)'};opacity:0.9">
                <svg class="w-6 h-6" style="color:#121212" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-serif text-base font-medium text-hive-text group-hover:text-hive-gold transition-colors">${a.name}</h3>
                <p class="text-xs text-hive-muted truncate">${a.location}</p>
              </div>
              <svg class="w-5 h-5 text-hive-muted group-hover:text-hive-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          `).join('')}

          <!-- Create New Apiary -->
          <button id="createApiaryBtn" class="card text-left w-full flex items-center gap-4 group border-dashed" style="border-style:dashed">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--hive-surface-hover)">
              <svg class="w-6 h-6 text-hive-muted group-hover:text-hive-gold transition-colors" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-hive-muted group-hover:text-hive-gold transition-colors">Create New Apiary</h3>
              <p class="text-xs text-hive-muted opacity-60">Add another location</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Create Apiary Modal (hidden) -->
      <div id="createApiaryModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/60" id="modalOverlay"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-md">
          <div class="card p-6 relative">
            <h2 class="font-serif text-lg font-medium text-hive-text mb-5">New Apiary</h2>
            <form id="createApiaryForm" class="space-y-4">
              <div>
                <label class="login-label">Name</label>
                <input type="text" id="newApiaryName" class="input-field" placeholder="e.g. Mountain Apiary" required>
              </div>
              <div>
                <label class="login-label">Location</label>
                <input type="text" id="newApiaryLocation" class="input-field" placeholder="e.g. Snowdonia, Wales">
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" id="cancelCreate" class="btn-secondary flex-1">Cancel</button>
                <button type="submit" class="btn-primary flex-1">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // Select an apiary
  document.querySelectorAll('.apiary-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx);
      const selected = apiaries[idx];
      setActiveApiary(selected);
      window.location.hash = '#/apiary';
    });
  });

  // Create new apiary modal
  const modal = document.getElementById('createApiaryModal');
  const showModal = () => modal.classList.remove('hidden');
  const hideModal = () => modal.classList.add('hidden');

  document.getElementById('createApiaryBtn').addEventListener('click', showModal);
  document.getElementById('modalOverlay').addEventListener('click', hideModal);
  document.getElementById('cancelCreate').addEventListener('click', hideModal);

  document.getElementById('createApiaryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('newApiaryName').value.trim();
    const location = document.getElementById('newApiaryLocation').value.trim();
    if (!name) return;

    const colors = ['#F5C518', '#64B5F6', '#66BB6A', '#EF5350', '#AB47BC', '#FF7043'];
    const newApiary = {
      id: 'apiary-' + Date.now(),
      name,
      location: location || 'Location not set',
      lat: null,
      lng: null,
      hiveCount: 0,
      color: colors[apiaries.length % colors.length],
    };
    apiaries.push(newApiary);
    saveApiaries(apiaries);
    setActiveApiary(newApiary);
    window.location.hash = '#/apiary';
  });
}
