/**
 * Notes — full list with pin/unpin and delete.
 */
import { renderHeader } from '../components/ui.js';
import { getApiaryNotes, toggleNotePin, deleteNote, addNote } from '../api/dataverse.js';

export function renderNotes(app) {
  function render() {
    const notes = getApiaryNotes(false); // exclude deleted
    app.innerHTML = `
      ${renderHeader('Notes', true)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${notes.length} Notes</h2>
          <button id="addNoteBtn" class="btn-primary text-xs py-2 px-4">+ Add Note</button>
        </div>
        <div class="space-y-2">
          ${notes.map(n => `
            <div class="card p-4" data-id="${n.id}">
              <div class="flex items-start gap-3">
                <button class="pin-note p-1 mt-0.5 ${n.pinned ? 'text-hive-gold' : 'text-hive-muted'} hover:text-hive-gold" data-nid="${n.id}" title="${n.pinned ? 'Unpin' : 'Pin to home'}">
                  <svg class="w-4 h-4" fill="${n.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </button>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-hive-text leading-relaxed">${n.text}</p>
                  <p class="text-[11px] text-hive-muted mt-2">${new Date(n.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <button class="delete-note p-1 text-hive-muted hover:text-hive-red" data-nid="${n.id}" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          `).join('')}
          ${notes.length === 0 ? `
            <div class="card text-center py-10">
              <svg class="w-10 h-10 mx-auto text-hive-muted/40 mb-3" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              <p class="text-hive-muted">No notes yet</p>
              <p class="text-xs text-hive-muted mt-1">Tap + Add Note to get started</p>
            </div>
          ` : ''}
        </div>
      </main>

      <!-- Add Note Modal -->
      <div id="addNoteModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="addNoteBackdrop"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto">
          <div class="rounded-2xl overflow-hidden" style="background:var(--hive-surface);border:1px solid var(--hive-border);box-shadow:0 25px 50px rgba(0,0,0,0.4)">
            <div class="p-5" style="border-bottom:1px solid var(--hive-border)">
              <div class="flex items-center justify-between">
                <h3 class="font-serif text-lg font-medium text-hive-text">New Note</h3>
                <button id="addNoteClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div class="p-5">
              <textarea id="addNoteText" rows="5" class="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-hive-gold/40" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" placeholder="Write your note\u2026"></textarea>
            </div>
            <div class="px-5 pb-5 flex justify-end gap-2">
              <button id="addNoteCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
              <button id="addNoteSave" class="btn-primary text-xs py-2 px-5">Save Note</button>
            </div>
          </div>
        </div>
      </div>
    `;

    app.querySelectorAll('.pin-note').forEach(btn => {
      btn.addEventListener('click', () => { toggleNotePin(btn.dataset.nid); render(); });
    });
    app.querySelectorAll('.delete-note').forEach(btn => {
      btn.addEventListener('click', () => { deleteNote(btn.dataset.nid); render(); });
    });

    const modal = document.getElementById('addNoteModal');
    const openModal = () => modal?.classList.remove('hidden');
    const closeModal = () => modal?.classList.add('hidden');

    document.getElementById('addNoteBtn')?.addEventListener('click', openModal);
    document.getElementById('addNoteBackdrop')?.addEventListener('click', closeModal);
    document.getElementById('addNoteClose')?.addEventListener('click', closeModal);
    document.getElementById('addNoteCancel')?.addEventListener('click', closeModal);
    document.getElementById('addNoteSave')?.addEventListener('click', () => {
      const text = document.getElementById('addNoteText')?.value.trim();
      if (!text) return;
      addNote(text);
      render();
    });
  }
  render();
}
