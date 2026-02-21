/*!
 * PetalProgress — shared marketing nav
 * Drop in <script src="nav.js"></script> on any marketing page.
 * Handles: active state, path resolution for local and production.
 * Works both locally (127.0.0.1:5500/index.html) and in production (/pricing).
 */

(function () {

  // ── INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .pp-nav {
      position: sticky; top: 0; z-index: 100;
      height: 56px;
      background: #FDFCFA;
      border-bottom: 1px solid #EDE9E3;
      display: flex; align-items: center;
      padding: 0 40px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
    }
    .pp-nav-logo {
      display: flex; align-items: center; gap: 7px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; color: #2C2825;
      text-decoration: none; letter-spacing: 0.01em;
      margin-right: 32px; flex-shrink: 0;
    }
    .pp-nav-logo:hover { opacity: 0.8; }
    .pp-nav-links {
      display: flex; align-items: center; gap: 2px; flex: 1;
    }
    .pp-nav-link {
      padding: 6px 14px; border-radius: 100px;
      font-size: 13px; color: #6B6460;
      text-decoration: none; transition: all 0.15s;
      white-space: nowrap;
    }
    .pp-nav-link:hover { background: #EDE9E3; color: #2C2825; }
    .pp-nav-link.active { color: #2C2825; font-weight: 500; }
    .pp-nav-right {
      margin-left: auto;
      display: flex; align-items: center; gap: 8px;
    }
    .pp-nav-signin {
      padding: 6px 14px; border-radius: 100px;
      font-size: 13px; color: #6B6460;
      text-decoration: none; transition: all 0.15s;
    }
    .pp-nav-signin:hover { background: #EDE9E3; color: #2C2825; }
    .pp-nav-cta {
      padding: 7px 18px;
      background: #2C2825; color: #F8F6F3;
      border-radius: 100px; font-size: 13px;
      text-decoration: none; font-weight: 500;
      transition: background 0.15s; white-space: nowrap;
    }
    .pp-nav-cta:hover { background: #1a1714; }
  `;
  document.head.appendChild(style);

  // ── RESOLVE PATHS ──────────────────────────────────────────────────
  // Works locally (files served as /index.html, /pricing.html)
  // and in production (clean URLs like /pricing).
  // Strategy: strip .html and trailing slash, then match on the stem.
  const rawPath  = window.location.pathname;           // e.g. /pricing.html
  const pageStem = rawPath                             // stem = "pricing"
    .replace(/\.html$/, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    || 'index';                                        // bare / → "index"

  // Base directory so this works even in a subfolder
  const baseDir = rawPath.substring(0, rawPath.lastIndexOf('/') + 1);

  // Locally files need .html; production uses clean paths.
  // Detect local by presence of a port number OR explicit .html in the URL.
  const isLocal = window.location.port !== '' || rawPath.endsWith('.html');

  function pageHref(stem) {
    return isLocal ? baseDir + stem + '.html' : baseDir + stem;
  }

  // ── BUILD NAV HTML ─────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'pp-nav';
  nav.innerHTML = `
    <a href="${pageHref('index')}" class="pp-nav-logo">
      <span>𖢻</span> PetalProgress
    </a>
    <div class="pp-nav-links">
      <a href="${pageHref('index')}"   class="pp-nav-link" data-page="index">Home</a>
      <a href="${pageHref('teams')}"   class="pp-nav-link" data-page="teams">For Teams</a>
      <a href="${pageHref('pricing')}" class="pp-nav-link" data-page="pricing">Pricing</a>
    </div>
    <div class="pp-nav-right">
      <a href="#" class="pp-nav-signin" id="ppSignInBtn">Sign in</a>
      <a href="${pageHref('signup')}" class="pp-nav-cta">Sign up free</a>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  // ── ACTIVE STATE ───────────────────────────────────────────────────
  const activeLink = nav.querySelector(`[data-page="${pageStem}"]`);
  if (activeLink) activeLink.classList.add('active');

  // ── LOAD SIGN-IN MODAL ─────────────────────────────────────────────
  const s = document.createElement('script');
  s.src = baseDir + 'signin-modal.js';
  document.head.appendChild(s);

})();