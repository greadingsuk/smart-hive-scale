/**
 * Simple hash-based router for SPA navigation.
 * Routes map hash fragments to view render functions.
 */

const routes = {};
let currentCleanup = null;

export function registerRoute(hash, renderFn) {
  routes[hash] = renderFn;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function initRouter(defaultHash = '#/login') {
  async function handleRoute() {
    const hash = window.location.hash || defaultHash;

    // Check auth — redirect to login if not authenticated
    let user = sessionStorage.getItem('hive_user');
    // Restore session from Remember Me if available
    if (!user) {
      const remembered = localStorage.getItem('hive_user');
      if (remembered) {
        sessionStorage.setItem('hive_user', remembered);
        user = remembered;
      }
    }
    if (!user && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }
    // Logged-in user on login page → send to apiary select
    if (user && hash === '#/login') {
      window.location.hash = '#/apiary-select';
      return;
    }
    // Logged-in user going to main app without selecting apiary → redirect
    if (user && hash !== '#/apiary-select' && !sessionStorage.getItem('active_apiary')) {
      window.location.hash = '#/apiary-select';
      return;
    }

    // Find matching route
    let matchedRoute = null;
    let params = {};
    
    // Strip query string from hash for route matching
    const hashPath = hash.split('?')[0];

    for (const [pattern, renderFn] of Object.entries(routes)) {
      // Support :param patterns like #/hive/:id
      const patternParts = pattern.split('/');
      const hashParts = hashPath.split('/');
      
      if (patternParts.length !== hashParts.length) continue;
      
      let match = true;
      const extractedParams = {};
      
      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          extractedParams[patternParts[i].slice(1)] = decodeURIComponent(hashParts[i]);
        } else if (patternParts[i] !== hashParts[i]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        matchedRoute = renderFn;
        params = extractedParams;
        break;
      }
    }

    if (matchedRoute) {
      // Cleanup previous view
      if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
      }
      const app = document.getElementById('app');
      const cleanup = await matchedRoute(app, params);
      if (typeof cleanup === 'function') {
        currentCleanup = cleanup;
      }
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
