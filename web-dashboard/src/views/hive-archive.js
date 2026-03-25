/**
 * Hive Archive — shows hives that are no longer active (dead, combined, moved, sold).
 * Clicking a hive navigates to its full history timeline.
 */
import { renderHeader, strengthBadge, formatDate, activityBadge, ICON } from '../components/ui.js';
import { renderHiveThumb } from '../components/hive-visual.js';
import { getArchivedHives, getHiveActivity, ARCHIVE_STATUSES } from '../api/dataverse.js';

const STATUS_META = {
  Dead:     { label: 'Dead Out',  icon: '💀', pill: 'pill-red' },
  Combined: { label: 'Combined',  icon: '🔀', pill: 'pill-blue' },
  Moved:    { label: 'Moved',     icon: '📦', pill: 'pill-blue' },
  Sold:     { label: 'Sold',      icon: '💷', pill: 'pill-red' },
};

export async function renderHiveArchive(app) {
  const archived = getArchivedHives();
  const filterParam = new URLSearchParams(window.location.hash.split('?')[1] || '').get('status');

  const filtered = filterParam && ARCHIVE_STATUSES.includes(filterParam)
    ? archived.filter(h => h.status === filterParam)
    : archived;

  // Sort by most recent activity
  const withLastActivity = filtered.map(h => {
    const activity = getHiveActivity(h.hiveName);
    const lastDate = activity.length ? activity[0].date : h.dateAdded;
    return { ...h, lastActivityDate: lastDate };
  }).sort((a, b) => new Date(b.lastActivityDate) - new Date(a.lastActivityDate));

  // Count by status
  const counts = {};
  for (const s of ARCHIVE_STATUSES) counts[s] = archived.filter(h => h.status === s).length;

  app.innerHTML = `
    ${renderHeader('Hive Archive', true)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Summary Chips -->
      <section class="px-5 pt-4 pb-2">
        <div class="flex gap-2 overflow-x-auto no-scrollbar">
          <a href="#/archive" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!filterParam ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}" style="border:1px solid ${!filterParam ? 'var(--hive-gold)' : 'var(--hive-border)'}">
            All (${archived.length})
          </a>
          ${ARCHIVE_STATUSES.map(s => `
            <a href="#/archive?status=${s}" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterParam === s ? 'bg-hive-gold/20 text-hive-gold' : 'text-hive-muted hover:text-hive-text'}" style="border:1px solid ${filterParam === s ? 'var(--hive-gold)' : 'var(--hive-border)'}">
              ${STATUS_META[s]?.icon || ''} ${STATUS_META[s]?.label || s} (${counts[s] || 0})
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Archive List -->
      <section class="px-5 mt-4">
        ${withLastActivity.length === 0 ? `
          <div class="text-center py-16">
            <div class="text-5xl mb-4">🏛️</div>
            <p class="font-serif text-lg text-hive-text mb-2">No archived hives</p>
            <p class="text-sm text-hive-muted">Hives that are dead, combined, moved, or sold will appear here.</p>
            <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
          </div>
        ` : `
          <div class="space-y-3">
            ${withLastActivity.map(h => {
              const meta = STATUS_META[h.status] || { label: h.status, icon: '📋', pill: 'pill-amber' };
              const activity = getHiveActivity(h.hiveName);
              const archiveEvent = activity.find(a => ['Hive Death', 'Combined', 'Moved', 'Sold'].includes(a.type));
              return `
              <a href="#/archive/${encodeURIComponent(h.hiveName)}" class="card p-4 flex items-center gap-4 block hover:border-hive-gold/30 transition-colors animate-in">
                <!-- Hive Visual Thumbnail -->
                <div class="flex-shrink-0 w-14 h-20 flex items-end justify-center opacity-50">
                  ${renderHiveThumb(h.components, h.color)}
                </div>
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-serif text-sm font-medium text-hive-text truncate">${h.hiveName}</h3>
                    <span class="${meta.pill}">${meta.icon} ${meta.label}</span>
                  </div>
                  <div class="flex items-center gap-3 text-xs text-hive-muted">
                    <span>${h.beeType || 'Unknown breed'}</span>
                    <span>&middot;</span>
                    <span>${h.type}</span>
                  </div>
                  ${archiveEvent ? `<p class="text-xs text-hive-muted mt-1 truncate">${archiveEvent.notes}</p>` : ''}
                  <div class="text-[10px] text-hive-muted mt-1">${formatDate(h.lastActivityDate)}</div>
                </div>
                <!-- Chevron -->
                <div class="flex-shrink-0">${ICON.chevron}</div>
              </a>`;
            }).join('')}
          </div>
        `}
      </section>

    </main>
  `;
}
