/**
 * Theme — dark mode only ("Deep Ocean & Gold Leaf").
 */

export function initTheme() {
  // Ensure dark mode — remove any stale light class
  document.documentElement.classList.remove('light');
  localStorage.removeItem('apiary_theme');
}
