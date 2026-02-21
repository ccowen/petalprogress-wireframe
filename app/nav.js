/*!
 * PetalProgress — individual app nav
 * Drop in <script src="./nav.js"></script> on any page in app/.
 */

(function () {

  // ── INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .pp-app-nav {
      position: sticky; top: 0; z-index: 100;
      height: 56px;
      background: #FDFCFA;
      border-bottom: 1px solid #EDE9E3;
      display: flex; align-items: center;
      padding: 0 32px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
    }
    .pp-app-logo {
      display: flex; align-items: center; gap: 7px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; color: #2C2825;
      text-decoration: none; letter-spacing: 0.01em;
      margin-right: 28px; flex-shrink: 0;
    }
    .pp-app-logo:hover { opacity: 0.8; }
    .pp-app-links {
      display: flex; align-items: center; gap: 2px; flex: 1;
    }
    .pp-app-link {
      padding: 6px 14px; border-radius: 100px;
      font-size: 13px; color: #6B6460;
      text-decoration: none; transition: all 0.15s;
      white-space: nowrap;
    }
    .pp-app-link:hover { background: #EDE9E3; color: #2C2825; }
    .pp-app-link.active { color: #2C2825; font-weight: 500; }
    .pp-app-right {
      margin-left: auto;
      position: relative;
    }
    .pp-avatar-btn {
      width: 32px; height: 32px; border-radius: 50%;
      background: #8FA68C; color: white;
      border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; font-weight: 500;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.15s;
    }
    .pp-avatar-btn:hover { opacity: 0.85; }
    .pp-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      min-width: 196px;
      background: #FDFCFA;
      border: 1px solid #EDE9E3;
      border-radius: 14px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.09);
      padding: 7px; display: none; z-index: 300;
    }
    .pp-dropdown.open { display: block; }
    .pp-dd-section {
      font-size: 10.5px; color: #A09890; text-transform: uppercase;
      letter-spacing: .1em; padding: 6px 11px 3px;
    }
    .pp-dd-item {
      display: block; padding: 8px 11px;
      font-size: 13px; color: #6B6460;
      text-decoration: none; border-radius: 8px;
      transition: background 0.13s; white-space: nowrap;
    }
    .pp-dd-item:hover { background: #EDE9E3; color: #2C2825; }
    .pp-dd-item.danger { color: #C45A5A; }
    .pp-dd-item.danger:hover { background: rgba(196,90,90,0.08); }
    .pp-dd-sep { height: 1px; background: #EDE9E3; margin: 5px 0; }
  `;
  document.head.appendChild(style);

  // ── RESOLVE PATHS ──────────────────────────────────────────────────
  const rawPath  = window.location.pathname;
  const pageStem = rawPath.replace(/\.html$/, '').replace(/.*\//, '') || 'mandala';
  const baseDir  = rawPath.substring(0, rawPath.lastIndexOf('/') + 1);
  const isLocal  = window.location.port !== '' || rawPath.endsWith('.html');
  const ext      = isLocal ? '.html' : '';

  function pageHref(stem) { return baseDir + stem + ext; }
  function mktHref(stem)  { return baseDir + '../' + stem + ext; }

  // ── BUILD NAV HTML ─────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'pp-app-nav';
  nav.innerHTML = `
    <a href="${pageHref('mandala')}" class="pp-app-logo"><span>𖢻</span> PetalProgress</a>
    <div class="pp-app-links">
      <a href="${pageHref('mandala')}"  class="pp-app-link" data-page="mandala">Mandala</a>
      <a href="${pageHref('gallery')}"  class="pp-app-link" data-page="gallery">Gallery</a>
      <a href="${pageHref('calendar')}" class="pp-app-link" data-page="calendar">Calendar</a>
    </div>
    <div class="pp-app-right">
      <button class="pp-avatar-btn" id="ppAvBtn">JR</button>
      <div class="pp-dropdown" id="ppDd">
        <div class="pp-dd-section">My account</div>
        <a href="#" class="pp-dd-item">Account settings</a>
        <a href="${mktHref('pricing')}" class="pp-dd-item">Billing &amp; upgrade ✦</a>
        <div class="pp-dd-sep"></div>
        <a href="${mktHref('index')}" class="pp-dd-item">petalprogress.com ↗</a>
        <div class="pp-dd-sep"></div>
        <a href="${mktHref('login')}" class="pp-dd-item danger">Sign out</a>
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  // ── ACTIVE STATE ───────────────────────────────────────────────────
  const activeLink = nav.querySelector(`[data-page="${pageStem}"]`);
  if (activeLink) activeLink.classList.add('active');

  // ── DROPDOWN TOGGLE ────────────────────────────────────────────────
  document.getElementById('ppAvBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('ppDd').classList.toggle('open');
  });
  document.addEventListener('click', function () {
    const dd = document.getElementById('ppDd');
    if (dd) dd.classList.remove('open');
  });

})();
