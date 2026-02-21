/*!
 * PetalProgress — admin app nav
 * Drop in <script src="./nav.js"></script> on any page in app/admin/.
 */

(function () {

  // ── INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .pp-admin-nav {
      position: sticky; top: 0; z-index: 100;
      height: 56px;
      background: #FDFCFA;
      border-bottom: 1px solid #EDE9E3;
      display: flex; align-items: center;
      padding: 0 32px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
    }
    .pp-admin-logo {
      display: flex; align-items: center; gap: 7px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; color: #2C2825;
      text-decoration: none; letter-spacing: 0.01em;
      margin-right: 8px; flex-shrink: 0;
    }
    .pp-admin-logo:hover { opacity: 0.8; }
    .pp-admin-badge {
      font-size: 10px; font-family: 'DM Sans', sans-serif;
      padding: 2px 8px; border-radius: 100px;
      background: rgba(196,136,122,0.12);
      color: #C4887A; font-weight: 500;
      letter-spacing: .04em;
      margin-right: 20px; flex-shrink: 0;
    }
    .pp-admin-links {
      display: flex; align-items: center; gap: 2px; flex: 1;
    }
    .pp-admin-link {
      padding: 6px 14px; border-radius: 100px;
      font-size: 13px; color: #6B6460;
      text-decoration: none; transition: all 0.15s;
      white-space: nowrap;
    }
    .pp-admin-link:hover { background: #EDE9E3; color: #2C2825; }
    .pp-admin-link.active { color: #2C2825; font-weight: 500; }
    .pp-admin-right {
      margin-left: auto;
      position: relative;
    }
    .pp-avatar-btn-admin {
      width: 32px; height: 32px; border-radius: 50%;
      background: #C4887A; color: white;
      border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; font-weight: 500;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.15s;
    }
    .pp-avatar-btn-admin:hover { opacity: 0.85; }
    .pp-admin-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      min-width: 210px;
      background: #FDFCFA;
      border: 1px solid #EDE9E3;
      border-radius: 14px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.09);
      padding: 7px; display: none; z-index: 300;
    }
    .pp-admin-dropdown.open { display: block; }
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
    .pp-dd-item.muted { color: #A09890; font-size: 12px; }
    .pp-dd-item.muted:hover { color: #6B6460; }
    .pp-dd-sep { height: 1px; background: #EDE9E3; margin: 5px 0; }
  `;
  document.head.appendChild(style);

  // ── RESOLVE PATHS ──────────────────────────────────────────────────
  const rawPath  = window.location.pathname;
  const pageStem = rawPath.replace(/\.html$/, '').replace(/.*\//, '') || 'members';
  const baseDir  = rawPath.substring(0, rawPath.lastIndexOf('/') + 1);
  const isLocal  = window.location.port !== '' || rawPath.endsWith('.html');
  const ext      = isLocal ? '.html' : '';

  function pageHref(stem) { return baseDir + stem + ext; }
  function appHref(stem)  { return baseDir + '../' + stem + ext; }
  function mktHref(stem)  { return baseDir + '../../' + stem + ext; }

  // ── BUILD NAV HTML ─────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'pp-admin-nav';
  nav.innerHTML = `
    <a href="${pageHref('members')}" class="pp-admin-logo"><span>𖢻</span> PetalProgress</a>
    <span class="pp-admin-badge">Teams</span>
    <div class="pp-admin-links">
      <a href="${pageHref('members')}"  class="pp-admin-link" data-page="members">Members</a>
      <a href="${pageHref('habits')}"   class="pp-admin-link" data-page="habits">Habits</a>
      <a href="${pageHref('insights')}" class="pp-admin-link" data-page="insights">Insights</a>
    </div>
    <div class="pp-admin-right">
      <button class="pp-avatar-btn-admin" id="ppAdmAvBtn">JR</button>
      <div class="pp-admin-dropdown" id="ppAdmDd">
        <div class="pp-dd-section">Organization</div>
        <a href="#" class="pp-dd-item">Organization settings</a>
        <a href="#" class="pp-dd-item">Billing &amp; plan</a>
        <div class="pp-dd-sep"></div>
        <a href="${appHref('mandala')}" class="pp-dd-item">Switch to my personal view ↔</a>
        <div class="pp-dd-sep"></div>
        <a href="${mktHref('index')}" class="pp-dd-item muted" target="_blank" rel="noopener">petalprogress.com ↗</a>
        <a href="#" class="pp-dd-item muted">Shop Extras ↗</a>
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
  document.getElementById('ppAdmAvBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('ppAdmDd').classList.toggle('open');
  });
  document.addEventListener('click', function () {
    const dd = document.getElementById('ppAdmDd');
    if (dd) dd.classList.remove('open');
  });

})();
