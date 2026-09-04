/**
 * nav.js — Shared drawer navigation for Holiday Currency Converter
 * Include this script AFTER translations.js at the bottom of every page.
 *
 * Each page should call:
 *   initNav('PageTitle', 'filename.html');
 */

const NAV_ITEMS = [
  { labelKey: 'navHome',        icon: '🏠', href: 'index.html'        },
  { labelKey: 'navAddCurrency', icon: '➕', href: 'add-currency.html' },
  { labelKey: 'navContact',       icon: '✉️', href: 'contact.html'        },
  { labelKey: 'navPrivacy',       icon: '🔒', href: 'privacy.html'        },
  { labelKey: 'navDeleteAccount', icon: '🗑️', href: 'delete-account.html' },
];

const LANG_OPTIONS = [
  { code: 'en', label: '🇬🇧 English'  },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'es', label: '🇪🇸 Español'  },
  { code: 'de', label: '🇩🇪 Deutsch'  },
  { code: 'it', label: '🇮🇹 Italiano' },
];

/**
 * Inject the nav bar + drawer into the page and wire up events.
 * @param {string} pageTitle   - Title shown in the top bar (English fallback)
 * @param {string} currentPage - Filename of the current page, e.g. 'index.html'
 */
function initNav(pageTitle, currentPage) {
  const currentLang = (typeof getLang === 'function') ? getLang() : 'en';

  // ── Language picker options ────────────────────────────────────────
  const langOptions = LANG_OPTIONS.map(l =>
    `<option value="${l.code}"${l.code === currentLang ? ' selected' : ''}>${l.label}</option>`
  ).join('');

  // ── Top nav bar ────────────────────────────────────────────────────
  const topNavHTML = `
    <div class="top-nav" role="banner">
      <select class="lang-picker" id="navLangPicker"
              aria-label="Select language"
              onchange="setLang(this.value)">
        ${langOptions}
      </select>
      <span class="nav-title" id="navBarTitle">${pageTitle}</span>
      <button class="nav-menu-btn" id="navMenuBtn"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="nav-drawer">&#9776;</button>
    </div>
  `;

  // ── Drawer nav items ───────────────────────────────────────────────
  const listItems = NAV_ITEMS.map(item => {
    const isActive = item.href === currentPage;
    const label = (typeof t === 'function') ? t(item.labelKey) : item.labelKey;
    return `
      <li>
        <a href="${item.href}"
           class="${isActive ? 'active' : ''}"
           data-i18n-nav="${item.labelKey}"
           ${isActive ? 'aria-current="page"' : ''}>
          <span class="nav-icon" aria-hidden="true">${item.icon}</span>
          <span>${label}</span>
        </a>
      </li>`;
  }).join('');

  // ── Drawer language picker section ────────────────────────────────
  const drawerLangSection = `
    <li class="nav-lang-row">
      <span class="nav-icon" aria-hidden="true">🌐</span>
      <span data-i18n="navLanguage">${(typeof t === 'function') ? t('navLanguage') : 'Language'}</span>
      <select class="lang-picker nav-drawer-lang" id="drawerLangPicker"
              aria-label="Select language"
              onchange="setLang(this.value)">
        ${langOptions}
      </select>
    </li>
  `;

  // ── Overlay + drawer ───────────────────────────────────────────────
  const drawerHTML = `
    <div id="navOverlay" class="nav-overlay" role="presentation"></div>
    <nav id="navDrawer" class="nav-drawer" aria-label="Main navigation" aria-hidden="true">
      <div class="nav-drawer-header">
        <span data-i18n="navMenu">${(typeof t === 'function') ? t('navMenu') : 'Menu'}</span>
        <button class="close-btn" id="navCloseBtn" aria-label="Close navigation menu">&times;</button>
      </div>
      <ul role="list">
        ${listItems}
        <li>
          <a href="#" id="navSignOutBtn" onclick="navSignOut(event)">
            <span class="nav-icon" aria-hidden="true">🚪</span>
            <span data-i18n="navSignOut">${(typeof t === 'function') ? t('navSignOut') : 'Sign Out'}</span>
          </a>
        </li>
        ${drawerLangSection}
      </ul>
    </nav>
  `;

  // ── Inject into DOM ────────────────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', topNavHTML);
  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  // ── Wire up open / close ───────────────────────────────────────────
  const menuBtn = document.getElementById('navMenuBtn');
  const closeBtn = document.getElementById('navCloseBtn');
  const overlay  = document.getElementById('navOverlay');
  const drawer   = document.getElementById('navDrawer');

  function openNav() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeNav() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeNav();
  });

  // Prevent body scroll when drawer is open
  const observer = new MutationObserver(() => {
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });

  // ── Apply saved language on load ───────────────────────────────────
  if (typeof applyTranslations === 'function') {
    applyTranslations(currentLang);
    document.documentElement.lang = currentLang;
  }
}

/**
 * Hook called by setLang() (in translations.js) — keeps drawer nav
 * labels in sync when the language changes without a page reload.
 * We patch setLang here so drawer items update in real time.
 */
(function patchSetLang() {
  // Wait until translations.js has defined setLang
  const _originalSetLang = window.setLang;
  if (typeof _originalSetLang !== 'function') return;

  window.setLang = function(code) {
    _originalSetLang(code);

    // Re-translate drawer nav items
    document.querySelectorAll('[data-i18n-nav]').forEach(el => {
      const key = el.getAttribute('data-i18n-nav');
      const label = el.querySelector('span:last-child');
      if (label && typeof t === 'function') label.textContent = t(key);
    });
  };
})();

/**
 * Sign out: clear all Cognito tokens from localStorage and redirect to sign-in.
 */
function navSignOut(event) {
  event.preventDefault();
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('CognitoIdentityServiceProvider.')) keysToRemove.push(key);
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  localStorage.removeItem('cognitoIdToken');
  localStorage.removeItem('cognitoAccessToken');
  window.location.href = 'signin.html';
}
