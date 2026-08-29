/**
 * nav.js — Shared drawer navigation for Holiday Currency Converter
 * Include this script at the bottom of every page.
 *
 * Expects this HTML fragment to exist on the page (injected by initNav):
 *   <div id="nav-overlay" class="nav-overlay"></div>
 *   <nav id="nav-drawer" class="nav-drawer">...</nav>
 *
 * Each page should call:
 *   initNav('PageTitle', 'filename.html');
 */

const NAV_ITEMS = [
  { label: 'Home',                icon: '🏠', href: 'index.html'        },
  { label: 'Sign In',             icon: '🔑', href: 'signin.html'       },
  { label: 'Register',            icon: '📝', href: 'register.html'     },
  { label: 'Add Currency (£0.99)',icon: '➕', href: 'add-currency.html' },
  { label: 'Contact Us',          icon: '✉️', href: 'contact.html'      },
];

/**
 * Inject the nav bar + drawer into the page and wire up events.
 * @param {string} pageTitle   - Title shown in the top bar
 * @param {string} currentPage - Filename of the current page, e.g. 'index.html'
 */
function initNav(pageTitle, currentPage) {
  // Build the top nav bar HTML
  const topNavHTML = `
    <div class="top-nav" role="banner">
      <span class="nav-title">${pageTitle}</span>
      <button class="nav-menu-btn" id="navMenuBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-drawer">&#9776;</button>
    </div>
  `;

  // Build drawer list items
  const listItems = NAV_ITEMS.map(item => {
    const isActive = item.href === currentPage;
    return `
      <li>
        <a href="${item.href}" class="${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
          <span class="nav-icon" aria-hidden="true">${item.icon}</span>
          ${item.label}
        </a>
      </li>`;
  }).join('');

  // Build the overlay + drawer HTML
  const drawerHTML = `
    <div id="navOverlay" class="nav-overlay" role="presentation"></div>
    <nav id="navDrawer" class="nav-drawer" aria-label="Main navigation" aria-hidden="true">
      <div class="nav-drawer-header">
        <span>Menu</span>
        <button class="close-btn" id="navCloseBtn" aria-label="Close navigation menu">&times;</button>
      </div>
      <ul role="list">
        ${listItems}
      </ul>
    </nav>
  `;

  // Insert top nav at the very top of body, drawer at the bottom
  document.body.insertAdjacentHTML('afterbegin', topNavHTML);
  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  // Wire up open/close
  const menuBtn  = document.getElementById('navMenuBtn');
  const closeBtn = document.getElementById('navCloseBtn');
  const overlay  = document.getElementById('navOverlay');
  const drawer   = document.getElementById('navDrawer');

  function openNav() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    // Trap focus inside drawer
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

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeNav();
    }
  });

  // Prevent body scroll when drawer is open
  const observer = new MutationObserver(() => {
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
}
