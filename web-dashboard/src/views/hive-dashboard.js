/**
 * Individual Hive Dashboard — visual detail view with inspection timeline.
 */
import { renderHeader, strengthBar, formatDate, activityBadge } from '../components/ui.js';
import { renderHiveStack } from '../components/hive-visual.js';
import { getHives, getHiveActivity, getCustomActivity, getHiveNote, setHiveNote, getAllActivity, splitHive, combineHives, deadOutHive, moveHive, convertHive } from '../api/dataverse.js';

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

  app.innerHTML = `
    ${renderHeader(hive.hiveName, true)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card -->
      <section class="p-4">
        <div class="rounded-2xl overflow-hidden" style="background: var(--hive-surface)">
          <div class="flex items-center justify-center py-6">
            ${renderHiveStack(hive.components || [], { size: 'md' })}
          </div>
          <!-- Strength bar under image, like HiveBloom -->
          <div class="h-2 w-full" style="background: ${strengthColor}"></div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-hive-text">${hive.hiveName}</h2>
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              <span class="pill-amber">${hive.beeType}</span>
              <span class="${hive.type === 'Nuc' ? 'pill-blue' : 'pill-orange'}">${hive.type}</span>
              ${hive.hiveStyle ? `<span class="pill-blue">${hive.hiveStyle}</span>` : ''}
              <span class="pill-green">${hive.status}</span>
              <a href="#/hive-form/${hive.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">+ Edit</a>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold" style="color: ${strengthColor}">${hive.strength}%</div>
            <div class="text-xs text-hive-muted">Strength</div>
          </div>
        </div>
      </section>

      <!-- Queen Detail Card -->
      <section class="px-4 mb-4">
        <div class="card-surface">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">Queen Details</div>
            <a href="#/hive-form/${hive.id}" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80" style="font-family:Inter,sans-serif">Edit</a>
          </div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <div class="flex items-center gap-2">
              ${hive.queenMarked
                ? `<span class="w-3 h-3 rounded-full flex-shrink-0" style="background: ${hive.queenColor === 'Green' ? 'var(--hive-sage)' : hive.queenColor === 'Pink' ? '#ec4899' : hive.queenColor === 'Blue' ? 'var(--hive-blue)' : hive.queenColor === 'Yellow' ? '#eab308' : hive.queenColor === 'Red' ? 'var(--hive-red)' : hive.queenColor === 'White' ? '#e5e7eb' : 'var(--hive-muted)'}"></span><span class="text-sm text-hive-text">${hive.queenColor} marked</span>`
                : '<span class="text-sm text-hive-muted">Unmarked</span>'
              }
            </div>
            <div class="text-sm">
              ${hive.queenClipped ? '<span class="text-hive-text">Clipped</span>' : '<span class="text-hive-muted">Not clipped</span>'}
            </div>
            <div>
              <span class="text-xs text-hive-muted">Age</span>
              <div class="text-sm text-hive-text">${queenAge !== null ? `${queenAge}yr (${hive.queenYear})` : 'Unknown'}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Source</span>
              <div class="text-sm text-hive-text">${hive.queenSource || 'Unknown'}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Added</span>
              <div class="text-sm text-hive-text">${hive.queenAddedDate ? new Date(hive.queenAddedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Breed</span>
              <div class="text-sm text-hive-text">${hive.beeType}</div>
            </div>
          </div>
          ${hive.queenNotes ? `<div class="mt-3 pt-2 border-t" style="border-color:var(--hive-border)"><p class="text-xs text-hive-muted italic">${hive.queenNotes}</p></div>` : ''}
        </div>
      </section>

      <!-- Info Grid -->
      <section class="px-4 grid grid-cols-2 gap-3 mb-4">
        <a href="#/inspections" class="card-surface block">
          <div class="section-subtitle mb-2">Inspections</div>
          <span class="text-lg font-serif font-medium text-hive-text">${inspections.length}</span>
          <span class="text-xs text-hive-muted block">since Jun 2025</span>
        </a>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Days Since</div>
          <span class="text-lg font-serif font-medium ${daysSinceInsp !== null && daysSinceInsp > 10 ? 'text-hive-red' : 'text-hive-text'}">${daysSinceInsp !== null ? daysSinceInsp : '—'}</span>
          <span class="text-xs text-hive-muted block">${lastInspDate ? lastInspDate.toLocaleDateString('en-GB', {day:'numeric',month:'short'}) : 'No inspections'}</span>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Weight</div>
          <span class="text-sm text-hive-muted">Pending IoT</span>
          <a href="#/apiary-dashboard" class="text-xs text-hive-gold block mt-1">View charts &rarr;</a>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Added</div>
          <span class="text-sm text-hive-text">${new Date(hive.dateAdded).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </section>

      <!-- Hive Note & Build Hive — same row -->
      <section class="px-4 mb-4 grid grid-cols-2 gap-3">
        <button id="editHiveNote" class="card-surface flex items-center justify-between p-4 text-left">
          <div class="flex items-center gap-3 min-w-0">
            <svg class="w-5 h-5 flex-shrink-0 ${hiveNote ? 'text-hive-gold' : 'text-hive-muted'}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <div class="min-w-0">
              <div class="text-sm font-medium text-hive-text">Hive Note</div>
              <div class="text-xs text-hive-muted truncate">${hiveNote ? hiveNote.text.slice(0, 30) + (hiveNote.text.length > 30 ? '…' : '') : 'Add a note'}</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <a href="#/build/${hive.id}" class="card-surface flex items-center justify-between p-4 block">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Build Hive</div>
              <div class="text-xs text-hive-muted">${(hive.components || []).length} components</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
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
              ${hiveNote ? '<button id="noteModalDelete" class="text-xs text-hive-red hover:opacity-80 uppercase tracking-wider" style="font-family:Inter,sans-serif">Delete Note</button>' : '<span></span>'}
              <div class="flex gap-2">
                <button id="noteModalCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
                <button id="noteModalSave" class="btn-primary text-xs py-2 px-5">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <button data-op="convert" class="card-surface text-center py-3 col-span-2 sm:col-span-4">
            <div class="section-subtitle">${hive.type === 'Hive' ? 'Downsize to Nuc' : 'Upgrade to Hive'}</div>
          </button>
        </div>
      </section>

      <!-- Inspection Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Inspection History</h3>
        <div class="space-y-0">
          ${activity.map((a, i) => {
            return `
            <a href="#/inspection/${a.id || i}?from=${encodeURIComponent(hiveName)}" class="flex gap-3 ${i < activity.length - 1 ? 'pb-4' : ''} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: rgba(212,175,55,0.1); color: var(--hive-gold)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
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

  // Wire up hive operation buttons
  app.querySelector('[data-op="split"]')?.addEventListener('click', () => {
    const name = prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');
    if (!name) return;
    const notes = prompt('Split notes (optional):') || '';
    splitHive(hive.id, name, notes);
    window.location.hash = '#/apiary';
  });

  app.querySelector('[data-op="combine"]')?.addEventListener('click', () => {
    const otherHives = getHives().filter(h => h.id !== hive.id && h.status === 'Active');
    if (!otherHives.length) { alert('No other active hives to combine with.'); return; }
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
}
