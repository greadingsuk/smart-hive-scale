/**
 * Tasks — full list with completed items shown, toggle and delete.
 */
import { renderHeader, formatDate } from '../components/ui.js';
import { getApiaryTasks, toggleTask, deleteTask, addTask } from '../api/dataverse.js';

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
              <div class="flex-1 min-w-0">
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
    `;

    app.querySelectorAll('.toggle-task').forEach(cb => {
      cb.addEventListener('change', () => { toggleTask(cb.dataset.tid); render(); });
    });
    app.querySelectorAll('.delete-task').forEach(btn => {
      btn.addEventListener('click', () => { deleteTask(btn.dataset.tid); render(); });
    });
    document.getElementById('addTaskBtn')?.addEventListener('click', () => {
      const text = prompt('New task:');
      if (!text) return;
      const due = prompt('Due date (YYYY-MM-DD, optional):') || '';
      addTask(text, due || null);
      render();
    });
  }
  render();
}
