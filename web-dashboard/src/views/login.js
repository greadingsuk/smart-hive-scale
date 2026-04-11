/**
 * Login view — credential verification via SHA-256 hash comparison.
 * No plaintext credentials stored in source code.
 * TODO: Move to Dataverse table lookup via Power Automate flow.
 */
import { UNSPLASH_IMAGES } from '../config/unsplash.js';

// SHA-256 hashes of valid credentials (username:password)
// To generate a new hash: echo -n 'username:password' | sha256sum
const VALID_CREDENTIAL_HASHES = [
  '0e98bf2afda73d29f786212cd02fc542cb3307fea44f76f208f396b5fcd4ea98',
];

async function hashCredentials(username, password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function renderLogin(app) {
  // Auto-login if Remember Me was previously used
  const remembered = localStorage.getItem('hive_remember');
  const rememberedUser = localStorage.getItem('hive_user');
  if (remembered && rememberedUser && VALID_CREDENTIAL_HASHES.includes(remembered)) {
    sessionStorage.setItem('hive_user', rememberedUser);
    window.location.hash = '#/apiary-select';
    return;
  }

  const bgImg = UNSPLASH_IMAGES.loginBackground;
  const imgUrls = bgImg.urls || [bgImg.url];
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
      <!-- Unsplash background with fallback chain -->
      <div class="absolute inset-0 z-0" style="background:${bgImg.fallback}">
        <img id="loginBg" src="${imgUrls[0]}" alt="" class="w-full h-full object-cover opacity-25" loading="lazy" />
      </div>
      <div class="absolute inset-0 z-0" style="background:linear-gradient(180deg, rgba(18,18,18,0.6) 0%, rgba(18,18,18,0.95) 100%)"></div>

      <div class="w-full max-w-sm animate-in relative z-10">
        <div class="text-center mb-10">
          <img src="/bee-logo.png" alt="Apiary Hub" class="w-48 h-auto mx-auto drop-shadow-2xl" />
        </div>

        <form id="loginForm" class="space-y-5">
          <div class="login-input-group">
            <label for="username" class="login-label">Username</label>
            <div class="login-input-wrapper">
              <svg class="login-input-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"/></svg>
              <input type="text" id="username" class="login-input" placeholder="Enter your username" autocomplete="username" required>
            </div>
          </div>
          <div class="login-input-group">
            <label for="password" class="login-label">Password</label>
            <div class="login-input-wrapper">
              <svg class="login-input-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
              <input type="password" id="password" class="login-input" placeholder="Enter your password" autocomplete="current-password" required>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <input type="checkbox" id="rememberMe" class="w-4 h-4 rounded border-white/20 bg-white/5 text-hive-amber focus:ring-hive-amber/50 cursor-pointer">
            <label for="rememberMe" class="text-sm text-gray-400 cursor-pointer select-none">Remember me</label>
          </div>
          <div id="loginError" class="text-hive-red text-sm hidden"></div>
          <button type="submit" class="btn-primary w-full py-3 mt-2">Sign In</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const hash = await hashCredentials(username, password);
    if (VALID_CREDENTIAL_HASHES.includes(hash)) {
      const userData = JSON.stringify({ name: username.charAt(0).toUpperCase() + username.slice(1), role: 'admin' });
      sessionStorage.setItem('hive_user', userData);
      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('hive_remember', hash);
        localStorage.setItem('hive_user', userData);
      }
      window.location.hash = '#/apiary-select';
    } else {
      const errEl = document.getElementById('loginError');
      errEl.textContent = 'Invalid username or password';
      errEl.classList.remove('hidden');
    }
  });

  // Focus username field
  document.getElementById('username').focus();

  // Background image fallback chain
  const bgEl = document.getElementById('loginBg');
  if (bgEl) {
    let attempt = 0;
    bgEl.onerror = () => {
      attempt++;
      if (attempt < imgUrls.length) {
        bgEl.src = imgUrls[attempt];
      } else {
        bgEl.style.display = 'none';
      }
    };
  }
}
