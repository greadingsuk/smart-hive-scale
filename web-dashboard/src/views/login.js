/**
 * Login view — credential verification via SHA-256 hash comparison.
 * No plaintext credentials stored in source code.
 * TODO: Move to Dataverse table lookup via Power Automate flow.
 */

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
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-5 hex-bg">
      <div class="w-full max-w-sm animate-in">
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
      sessionStorage.setItem('hive_user', JSON.stringify({ name: username.charAt(0).toUpperCase() + username.slice(1), role: 'admin' }));
      window.location.hash = '#/apiary';
    } else {
      const errEl = document.getElementById('loginError');
      errEl.textContent = 'Invalid username or password';
      errEl.classList.remove('hidden');
    }
  });

  // Focus username field
  document.getElementById('username').focus();
}
