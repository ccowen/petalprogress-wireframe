/*!
 * PetalProgress — shared marketing footer
 * Drop in <script src="footer.js"></script> at the bottom of any marketing page.
 */

(function () {

  // ── INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .pp-footer {
      background: #1E1A17;
      padding: 52px 52px 32px;
      font-family: 'DM Sans', sans-serif;
      color: rgba(255,255,255,0.4);
    }
    .pp-footer-inner {
      max-width: 1200px; margin: 0 auto;
    }
    .pp-footer-top {
      display: flex; align-items: flex-start; justify-content: space-between;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      margin-bottom: 24px;
    }
    .pp-footer-brand {}
    .pp-footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; color: rgba(255,255,255,0.75);
      text-decoration: none; display: block; margin-bottom: 10px;
    }
    .pp-footer-logo:hover { color: rgba(255,255,255,0.9); }
    .pp-footer-tagline {
      font-size: 13px; line-height: 1.75;
      color: rgba(255,255,255,0.3);
      max-width: 300px;
    }
    .pp-social-row { display: flex; gap: 8px; }
    .pp-social-btn {
      width: 34px; height: 34px; border-radius: 9px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; font-size: 14px;
      color: rgba(255,255,255,0.45); transition: all 0.18s;
    }
    .pp-social-btn:hover {
      background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8);
    }
    .pp-footer-bottom {
      display: flex; align-items: center; justify-content: space-between;
    }
    .pp-footer-copy { font-size: 12px; color: rgba(255,255,255,0.22); }
    .pp-footer-links { display: flex; gap: 18px; }
    .pp-footer-links a {
      font-size: 12px; color: rgba(255,255,255,0.25);
      text-decoration: none; transition: color 0.16s;
    }
    .pp-footer-links a:hover { color: rgba(255,255,255,0.55); }
  `;
  document.head.appendChild(style);

  // ── RESOLVE PATHS ──────────────────────────────────────────────────
  const rawPath  = window.location.pathname;
  const baseDir  = rawPath.substring(0, rawPath.lastIndexOf('/') + 1);
  const isLocal  = window.location.port !== '' || rawPath.endsWith('.html');

  function pageHref(stem) {
    return isLocal ? baseDir + stem + '.html' : baseDir + stem;
  }

  // ── BUILD FOOTER HTML ───────────────────────────────────────────────
  const footer = document.createElement('footer');
  footer.className = 'pp-footer';
  footer.innerHTML = `
    <div class="pp-footer-inner">
      <div class="pp-footer-top">
        <div class="pp-footer-brand">
          <a href="${pageHref('index')}" class="pp-footer-logo">𖢻 PetalProgress</a>
          <div class="pp-footer-tagline">A habit tracker that turns your daily practice into a living mandala. Built on the science of habit formation.</div>
        </div>
        <div class="pp-social-row">
          <a href="#" class="pp-social-btn" title="Instagram">📷</a>
          <a href="#" class="pp-social-btn" title="TikTok">🎵</a>
          <a href="#" class="pp-social-btn" title="Twitter/X">✕</a>
          <a href="#" class="pp-social-btn" title="Pinterest">📌</a>
        </div>
      </div>
      <div class="pp-footer-bottom">
        <div class="pp-footer-copy">© 2026 PetalProgress. All rights reserved.</div>
        <div class="pp-footer-links">
          <a href="${pageHref('privacy')}" target="_blank" rel="noopener">Privacy</a>
          <a href="${pageHref('terms')}" target="_blank" rel="noopener">Terms</a>
          <a href="${pageHref('contact')}">Contact</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);

})();
