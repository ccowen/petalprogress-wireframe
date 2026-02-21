/*!
 * PetalProgress — sign-in modal
 * Loaded automatically by nav.js, or include directly:
 *   <script src="./signin-modal.js"></script>
 * Exposes: window.ppOpenSignIn(), window.ppCloseSignIn()
 */

(function () {
  if (document.getElementById('ppSignInModal')) return; // already injected

  // ── RESOLVE PATHS ──────────────────────────────────────────────────
  const rawPath = window.location.pathname;
  const baseDir = rawPath.substring(0, rawPath.lastIndexOf('/') + 1);
  const isLocal = window.location.port !== '' || rawPath.endsWith('.html');
  const ext     = isLocal ? '.html' : '';

  function pageHref(stem) { return baseDir + stem + ext; }

  // app/mandala is always one level deeper than marketing pages (root)
  const appHref   = baseDir + 'app/mandala' + ext;
  const adminHref = baseDir + 'app/admin/members' + ext;

  // ── INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .pp-signin-overlay {
      position: fixed; inset: 0; z-index: 600;
      background: rgba(44,40,37,.45);
      display: none; align-items: center; justify-content: center;
      padding: 24px; backdrop-filter: blur(4px);
    }
    .pp-signin-overlay.open { display: flex; }
    .pp-signin-modal {
      background: #FDFCFA; border: 1px solid #EDE9E3;
      border-radius: 22px; padding: 40px;
      width: 100%; max-width: 400px;
      box-shadow: 0 24px 64px rgba(0,0,0,.14);
      position: relative;
    }
    .pp-signin-close {
      position: absolute; top: 16px; right: 18px;
      background: none; border: none; cursor: pointer;
      font-size: 18px; color: #A09890; line-height: 1;
      transition: color .15s;
    }
    .pp-signin-close:hover { color: #2C2825; }
    .pp-signin-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; color: #2C2825;
      text-align: center; margin-bottom: 22px; display: block;
    }
    .pp-signin-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-weight: 400;
      text-align: center; margin-bottom: 6px; color: #2C2825;
    }
    .pp-signin-sub {
      font-size: 13px; color: #6B6460;
      text-align: center; margin-bottom: 24px; line-height: 1.65;
    }
    .pp-signin-sso {
      display: flex; align-items: center; justify-content: center;
      width: 100%; padding: 10px 14px;
      background: #FDFCFA; border: 1.5px solid #D4CEC7;
      border-radius: 10px; font-family: 'DM Sans', sans-serif;
      font-size: 13.5px; color: #6B6460; cursor: pointer;
      transition: all .18s; margin-bottom: 8px; text-decoration: none;
    }
    .pp-signin-sso:hover { background: #EDE9E3; color: #2C2825; }
    .pp-signin-divider {
      display: flex; align-items: center; gap: 12px;
      margin: 16px 0; color: #A09890; font-size: 12px;
      font-family: 'DM Sans', sans-serif;
    }
    .pp-signin-divider::before, .pp-signin-divider::after {
      content: ''; flex: 1; height: 1px; background: #EDE9E3;
    }
    .pp-signin-field { margin-bottom: 12px; }
    .pp-signin-label {
      display: block; font-size: 12px; font-weight: 500;
      color: #6B6460; margin-bottom: 6px; letter-spacing: .02em;
      font-family: 'DM Sans', sans-serif;
    }
    .pp-signin-input {
      width: 100%; padding: 10px 14px;
      background: #F8F6F3; border: 1.5px solid #D4CEC7;
      border-radius: 10px; font-family: 'DM Sans', sans-serif;
      font-size: 13.5px; color: #2C2825; outline: none;
      transition: border-color .16s;
    }
    .pp-signin-input:focus { border-color: #8FA68C; }
    .pp-signin-input::placeholder { color: #A09890; }
    .pp-signin-submit {
      display: block; width: 100%; padding: 12px; margin-top: 18px;
      background: #1E1A17; color: rgba(255,255,255,.88);
      border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
      font-size: 13.5px; font-weight: 500; cursor: pointer;
      transition: background .18s;
    }
    .pp-signin-submit:hover { background: #111; }
    .pp-signin-switch {
      font-size: 12.5px; color: #A09890;
      text-align: center; margin-top: 18px;
      font-family: 'DM Sans', sans-serif;
    }
    .pp-signin-switch a { color: #8FA68C; text-decoration: none; font-weight: 500; }
    .pp-signin-switch a:hover { text-decoration: underline; }
  `;
  document.head.appendChild(style);

  // ── INJECT MODAL HTML ──────────────────────────────────────────────
  const modal = document.createElement('div');
  modal.className = 'pp-signin-overlay';
  modal.id = 'ppSignInModal';
  modal.innerHTML = `
    <div class="pp-signin-modal">
      <button class="pp-signin-close" onclick="ppCloseSignIn()">✕</button>
      <span class="pp-signin-logo">𖢻 PetalProgress</span>
      <h2 class="pp-signin-title">Welcome back</h2>
      <p class="pp-signin-sub">Sign in to continue your practice.</p>
      <a href="${appHref}" class="pp-signin-sso">Continue with Google</a>
      <a href="${appHref}" class="pp-signin-sso">Continue with Apple</a>
      <div class="pp-signin-divider">or continue with email</div>
      <form onsubmit="window.location.href='${appHref}'; return false;">
        <div class="pp-signin-field">
          <label class="pp-signin-label">Email</label>
          <input class="pp-signin-input" type="email" placeholder="you@example.com">
        </div>
        <div class="pp-signin-field">
          <label class="pp-signin-label">Password</label>
          <input class="pp-signin-input" type="password" placeholder="••••••••">
        </div>
        <button class="pp-signin-submit">Sign in</button>
        <a href="${adminHref}" class="pp-signin-sso" style="margin-top:8px;color:#C4887A;border-color:#C4887A;font-size:12.5px;font-weight:500;">TEMP Sign In Teams</a>
      </form>
      <p class="pp-signin-switch">No account yet? <a href="${pageHref('signup')}">Sign up free →</a></p>
    </div>
  `;
  document.body.appendChild(modal);

  // ── PUBLIC API ─────────────────────────────────────────────────────
  window.ppOpenSignIn = function () {
    document.getElementById('ppSignInModal').classList.add('open');
    setTimeout(function () {
      const inp = modal.querySelector('.pp-signin-input');
      if (inp) inp.focus();
    }, 50);
  };

  window.ppCloseSignIn = function () {
    document.getElementById('ppSignInModal').classList.remove('open');
  };

  // ── CLOSE HANDLERS ─────────────────────────────────────────────────
  modal.addEventListener('click', function (e) {
    if (e.target === modal) ppCloseSignIn();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') ppCloseSignIn();
  });

  // Wire the nav Sign In button if it's already in the DOM
  const navBtn = document.getElementById('ppSignInBtn');
  if (navBtn) {
    navBtn.addEventListener('click', function (e) {
      e.preventDefault();
      ppOpenSignIn();
    });
  }

})();
