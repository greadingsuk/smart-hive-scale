/**
 * Hive Builder — visual hive component editor (like HiveBloom's "Build" view).
 */
import { renderHeader } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { getHiveById, updateHive, addComponent, removeComponent, moveComponent, COMPONENT_TYPES } from '../api/dataverse.js';

export function renderHiveBuilder(app, params) {
  const hiveId = params.id;
  let hive = getHiveById(hiveId);

  if (!hive) {
    app.innerHTML = `${renderHeader('Not Found', true)}<div class="max-w-6xl mx-auto p-4 text-center py-16"><p class="text-hive-muted">Hive not found</p><a href="#/apiary" class="btn-primary inline-block mt-4">Back</a></div>`;
    return;
  }

  function render() {
    hive = getHiveById(hiveId);
    app.innerHTML = `
      ${renderHeader('Build ' + hive.hiveName, true, false, '#/hive/' + encodeURIComponent(hive.hiveName))}
      <main class="max-w-6xl mx-auto p-4 pb-8">

        <!-- Visual Hive -->
        <section class="flex justify-center py-8 rounded-2xl mb-6" style="background: var(--hive-surface)">
          ${renderHiveStack(hive.components || [], { size: 'lg', interactive: true, hiveId: hive.id })}
        </section>

        <!-- Component Picker -->
        <section class="card-surface mb-6">
          <h3 class="section-subtitle mb-4">Add Component</h3>
          <div class="space-y-2">
            ${COMPONENT_TYPES.filter(c => {
              const isNucHive = hive.type === 'Nuc';
              return c.nuc === isNucHive;
            }).map(c => `
              <button data-add-type="${c.id}" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-hive-surface-hover transition-colors border border-hive-border">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-6 rounded" style="background:${c.color}"></div>
                  <span class="text-sm font-medium text-hive-text">${c.name}</span>
                </div>
                <span class="text-xs text-hive-muted">${c.category}</span>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Current Components List -->
        <section class="card-surface">
          <h3 class="section-subtitle mb-3">Components (${(hive.components || []).length})</h3>
          <div class="space-y-1">
            ${(hive.components || []).map((comp, i) => {
              const def = COMPONENT_TYPES.find(c => c.id === comp.type);
              if (!def) return '';
              const total = (hive.components || []).length;
              return `
                <div class="flex items-center justify-between p-2 rounded-lg hover:bg-hive-surface-hover transition-colors">
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-hive-muted w-5 text-right">${i + 1}</span>
                    <div class="w-8 h-4 rounded" style="background:${def.color}"></div>
                    <span class="text-sm text-hive-text">${def.name}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <button data-move-up="${i}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${i === 0 ? 'opacity-20 pointer-events-none' : ''}" title="Move up">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </button>
                    <button data-move-down="${i}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${i === total - 1 ? 'opacity-20 pointer-events-none' : ''}" title="Move down">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <button data-remove-idx="${i}" class="p-1 text-hive-muted hover:text-hive-red transition-colors" title="Remove">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </section>

      </main>
    `;

    // Add component handlers
    app.querySelectorAll('[data-add-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        addComponent(hiveId, btn.dataset.addType);
        render();
      });
    });

    // Remove component handlers
    app.querySelectorAll('[data-remove-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        removeComponent(hiveId, parseInt(btn.dataset.removeIdx, 10));
        render();
      });
    });

    // Move component handlers
    app.querySelectorAll('[data-move-up]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.moveUp, 10);
        moveComponent(hiveId, idx, idx - 1);
        render();
      });
    });
    app.querySelectorAll('[data-move-down]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.moveDown, 10);
        moveComponent(hiveId, idx, idx + 1);
        render();
      });
    });
  }

  render();

  // Listen for remove events from the visual stack
  const handler = (e) => {
    if (e.detail.hiveId === hiveId) {
      removeComponent(hiveId, e.detail.index);
      render();
    }
  };
  document.addEventListener('hive-remove-component', handler);
  return () => document.removeEventListener('hive-remove-component', handler);
}
