/**
 * Theme — dark mode only, with density toggle (Comfortable / Compact).
 */

const DENSITY_KEY = 'apiary_density';

export function initTheme() {
  document.documentElement.classList.remove('light');
  localStorage.removeItem('apiary_theme');

  // Restore density preference
  const saved = localStorage.getItem(DENSITY_KEY);
  if (saved === 'compact') {
    document.documentElement.classList.add('density-compact');
  }
}

export function getDensity() {
  return document.documentElement.classList.contains('density-compact') ? 'compact' : 'comfortable';
}

export function setDensity(mode) {
  if (mode === 'compact') {
    document.documentElement.classList.add('density-compact');
    localStorage.setItem(DENSITY_KEY, 'compact');
  } else {
    document.documentElement.classList.remove('density-compact');
    localStorage.setItem(DENSITY_KEY, 'comfortable');
  }
}

export function toggleDensity() {
  const next = getDensity() === 'compact' ? 'comfortable' : 'compact';
  setDensity(next);
  return next;
}

/**
 * Wire density toggle buttons in the current DOM.
 * Call after each view render.
 */
export function wireDensityToggle() {
  document.querySelectorAll('[data-density-toggle]').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      const mode = toggleDensity();
      // Update all toggle labels in DOM
      document.querySelectorAll('[data-density-label]').forEach(el => {
        el.textContent = mode === 'compact' ? 'Compact' : 'Comfortable';
      });
    });
  });
}
