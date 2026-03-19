/**
 * Theme manager — toggles between dark ("Midnight Hive") and light ("Apothecary") modes.
 * Persists preference to localStorage. Defaults to dark.
 */

const THEME_KEY = 'apiary_theme';

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  }
  updateIcons();
}

export function toggleTheme() {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  updateIcons();
}

function updateIcons() {
  const isLight = document.documentElement.classList.contains('light');
  // Show "Light" label when in light mode, "Dark" when in dark mode
  document.querySelectorAll('.theme-icon-dark').forEach(el => el.classList.toggle('hidden', isLight));
  document.querySelectorAll('.theme-icon-light').forEach(el => el.classList.toggle('hidden', !isLight));
  // Move the slider knob
  document.querySelectorAll('.theme-knob').forEach(knob => {
    knob.style.left = isLight ? '14px' : '2px';
  });
}

/**
 * Wire up all theme toggle buttons in the current DOM.
 * Call this after each view render.
 */
export function wireThemeToggle() {
  document.querySelectorAll('#themeToggle').forEach(btn => {
    // Remove old listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      toggleTheme();
    });
  });
  updateIcons();
}
