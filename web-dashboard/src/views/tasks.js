/**
 * Tasks — full list with completed items shown, toggle and delete.
 */
import { renderHeader, formatDate } from '../components/ui.js';
import { getApiaryTasks, toggleTask, deleteTask, addTask, editTask } from '../api/dataverse.js';

export function renderTasks(app) {
  function render() {
    const tasks = getApiaryTasks(true); // include completed
    app.innerHTML = `
      ${renderHeader('Tasks', true)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${tasks.length} Tasks</h2>
          <button id="addTaskBtn" class="btn-primary text-xs py-2 px-4">+ Add Task</button>
        </div>
        <div class="space-y-2">
          ${tasks.map(t => `
            <div class="card flex items-center gap-3 p-4" data-id="${t.id}">
              <input type="checkbox" ${t.done ? 'checked' : ''} class="w-4 h-4 rounded accent-[var(--hive-gold)] toggle-task" data-tid="${t.id}">
              <div class="flex-1 min-w-0 cursor-pointer edit-task" data-tid="${t.id}">
                <span class="text-sm ${t.done ? 'line-through text-hive-muted' : 'text-hive-text'}">${t.text}</span>
                <span class="text-[10px] uppercase tracking-wider block mt-0.5 ${t.done ? 'text-hive-muted' : 'text-hive-gold'}">${t.due ? formatDate(t.due) : ''}</span>
              </div>
              <button class="text-hive-muted hover:text-hive-red delete-task p-1" data-tid="${t.id}" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          `).join('')}
          ${tasks.length === 0 ? '<p class="text-hive-muted text-sm text-center py-8">No tasks yet.</p>' : ''}
        </div>
      </main>

      <!-- Add Task Modal -->
      <div id="taskModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="taskModalBackdrop"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto">
          <div class="rounded-2xl overflow-hidden" style="background:var(--hive-surface);border:1px solid var(--hive-border);box-shadow:0 25px 50px rgba(0,0,0,0.4)">
            <div class="p-5" style="border-bottom:1px solid var(--hive-border)">
              <div class="flex items-center justify-between">
                <h3 id="taskModalTitle" class="font-serif text-lg font-medium text-hive-text">New Task</h3>
                <button id="taskModalClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <label class="block text-xs text-hive-muted mb-1">Task <span class="text-hive-red">*</span></label>
                <input type="text" id="taskText" class="input-field" placeholder="e.g. Check queen cells on H2">
              </div>
              <div>
                <label class="block text-xs text-hive-muted mb-1">Due Date (optional)</label>
                <input type="date" id="taskDue" class="input-field">
              </div>
            </div>
            <div class="px-5 pb-5 flex justify-end gap-2">
              <button id="taskModalCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
              <button id="taskModalSave" class="btn-primary text-xs py-2 px-5">Save Task</button>
            </div>
          </div>
        </div>
      </div>
    `;

    app.querySelectorAll('.toggle-task').forEach(cb => {
      cb.addEventListener('change', () => { toggleTask(cb.dataset.tid); render(); });
    });
    app.querySelectorAll('.delete-task').forEach(btn => {
      btn.addEventListener('click', () => { deleteTask(btn.dataset.tid); render(); });
    });

    // Task modal — supports add and edit
    const taskModal = document.getElementById('taskModal');
    let editingTaskId = null;

    const openModal = (task = null) => {
      editingTaskId = task ? task.id : null;
      document.getElementById('taskModalTitle').textContent = task ? 'Edit Task' : 'New Task';
      document.getElementById('taskText').value = task ? task.text : '';
      document.getElementById('taskDue').value = task?.due || '';
      taskModal?.classList.remove('hidden');
      document.getElementById('taskText')?.focus();
    };
    const closeModal = () => { taskModal?.classList.add('hidden'); editingTaskId = null; };

    document.getElementById('addTaskBtn')?.addEventListener('click', () => openModal());
    document.getElementById('taskModalBackdrop')?.addEventListener('click', closeModal);
    document.getElementById('taskModalClose')?.addEventListener('click', closeModal);
    document.getElementById('taskModalCancel')?.addEventListener('click', closeModal);

    // Click task text to edit
    app.querySelectorAll('.edit-task').forEach(el => {
      el.addEventListener('click', () => {
        const task = tasks.find(t => t.id === el.dataset.tid);
        if (task) openModal(task);
      });
    });

    document.getElementById('taskModalSave')?.addEventListener('click', () => {
      const text = document.getElementById('taskText')?.value.trim();
      if (!text) { document.getElementById('taskText')?.focus(); return; }
      const due = document.getElementById('taskDue')?.value || null;
      if (editingTaskId) {
        editTask(editingTaskId, text, due);
      } else {
        addTask(text, due);
      }
      closeModal();
      render();
    });

    // Allow Enter to submit from task input
    document.getElementById('taskText')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); document.getElementById('taskModalSave')?.click(); }
    });
  }
  render();
}
