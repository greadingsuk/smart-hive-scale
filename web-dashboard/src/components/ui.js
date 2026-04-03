/**
 * Shared UI — Luxury Heritage Apiary design system.
 * Playfair Display headings, Inter UI text, 1.25px stroke icons.
 */

/**
 * SVG hex progress ring — shows strength as a hexagonal stroke-dasharray.
 * Use for larger displays (dashboards, detail views).
 */
export function hexRing(percent, size = 48) {
  const color = percent >= 80 ? 'var(--hive-sage)' : percent >= 50 ? 'var(--hive-gold)' : 'var(--hive-red)';
  const r = size * 0.42;
  const perim = 6 * r;
  const dash = (percent / 100) * perim;
  const cx = size / 2, cy = size / 2;
  const pts = [0,1,2,3,4,5].map(i => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="hex-ring">
    <polygon points="${pts}" fill="none" stroke="var(--hive-border)" stroke-width="1"/>
    <polygon points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="${dash} ${perim}" stroke-linecap="round"/>
    <text x="${cx}" y="${cy - 1}" text-anchor="middle" dominant-baseline="central" fill="${color}" font-family="'DM Sans',sans-serif" font-size="${Math.round(size * 0.3)}" font-weight="700">${percent}</text>
    <text x="${cx}" y="${cy + size * 0.18}" text-anchor="middle" fill="var(--hive-muted)" font-family="'DM Sans',sans-serif" font-size="${Math.round(size * 0.14)}" font-weight="500">%</text>
  </svg>`;
}

/**
 * Compact strength indicator — dot + label for small cards.
 */
export function strengthBadge(percent) {
  const label = percent >= 80 ? 'Strong' : percent >= 50 ? 'Fair' : 'Weak';
  const dotClass = percent >= 80 ? 'bg-hive-sage' : percent >= 50 ? 'bg-hive-gold' : 'bg-hive-red';
  return `<span class="inline-flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
    <span class="text-[10px] font-medium uppercase tracking-wider text-hive-muted" style="font-family:'DM Sans',sans-serif;letter-spacing:0.08em">${label}</span>
  </span>`;
}

export function renderHeader(title, showBack = false, showAdmin = false, backUrl = '#/apiary') {
  const currentHash = window.location.hash;
  const isAdminActive = currentHash.startsWith('#/admin') || currentHash.startsWith('#/devices');
  const densityLabel = document.documentElement.classList.contains('density-compact') ? 'Compact' : 'Comfortable';
  return `
    <header class="app-header px-5 py-3 sticky top-0 z-50" style="border-bottom: 1px solid var(--hive-border);">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          ${showBack ? `<a href="${backUrl}" class="text-hive-muted hover:text-hive-gold" title="Back">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </a>` : ''}
          <h1 class="font-serif text-lg font-medium text-hive-text" style="letter-spacing:-0.02em">${title}</h1>
        </div>
        <div class="flex items-center gap-1">
          <button data-density-toggle class="p-2 text-hive-muted hover:text-hive-gold flex items-center gap-1" title="Toggle density">
            <svg class="w-[15px] h-[15px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            <span data-density-label class="text-[9px] uppercase tracking-wider hidden sm:inline">${densityLabel}</span>
          </button>
          ${showAdmin ? `<a href="#/admin" class="p-2 ${isAdminActive ? 'text-hive-gold' : 'text-hive-muted hover:text-hive-gold'}" title="Settings">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </a>` : ''}
          <button onclick="sessionStorage.removeItem('hive_user'); sessionStorage.removeItem('active_apiary'); window.location.hash='#/login'" class="p-2 text-hive-muted hover:text-hive-red" title="Sign out">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </header>`;
}

export function strengthBar(percent) {
  const color = percent >= 80 ? 'bg-hive-sage' : percent >= 50 ? 'bg-hive-gold' : 'bg-hive-red';
  return `<div class="strength-bar"><div class="strength-fill ${color}" style="width:${percent}%"></div></div>`;
}

export function activityBadge(type) {
  const s = { 'Inspection':'pill-amber', 'Feed':'pill-blue', 'Treatment':'pill-red', 'Harvest':'pill-green', 'Hive Added':'pill-green', 'Hive Death':'pill-red', 'Split':'pill-amber', 'Combined':'pill-blue', 'Converted':'pill-amber', 'Moved':'pill-blue', 'Sold':'pill-red', 'Note':'pill-blue', 'Build Change':'pill-blue' };
  return `<span class="${s[type]||'pill-amber'}">${type}</span>`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr), now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff/7)}w ago`;
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year: diff > 365 ? 'numeric' : undefined });
}

export function accordion(id, title, contentHtml, defaultOpen = false) {
  return `<div class="border-b" style="border-color:var(--hive-border)">
    <button type="button" class="accordion-trigger" aria-expanded="${defaultOpen}" data-accordion="${id}">
      <span class="text-sm font-medium text-hive-text">${title}</span>
      <svg class="chevron w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div id="acc-${id}" class="accordion-content ${defaultOpen?'open':''}">${contentHtml}</div>
  </div>`;
}

export function initAccordions(container) {
  container.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const exp = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!exp));
      document.getElementById('acc-' + btn.dataset.accordion)?.classList.toggle('open');
    });
  });
}

/** Line-art icon library (1.25px stroke) */
export const ICON = {
  clipboard: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  edit: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
  flask: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
  book: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
  heart: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
  mapPin: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  thermometer: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9V3m0 6a3 3 0 100 6 3 3 0 000-6zm0 6v6"/></svg>`,
  chevron: `<svg class="w-3.5 h-3.5 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`,
};
