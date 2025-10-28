// --- Hamburger bar with auto-close ---
let menuTimer; // for inactivity timeout

function safeUpdateStickyOffset() {
  if (typeof updateStickyOffset === 'function') {
    updateStickyOffset();
  }
}

function menuToggle() {
  const nav = document.getElementById('myNavtoggle');
  const icon = document.querySelector('.navigation .icon i');

  nav.classList.toggle('responsive');
  safeUpdateStickyOffset();

  // Swap Font Awesome icon
  if (nav.classList.contains('responsive')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-x'); // cancel icon
    startMenuTimer();
  } else {
    icon.classList.remove('fa-x');
    icon.classList.add('fa-bars'); // hamburger icon
    clearMenuTimer();
  }
}

// Detect clicks outside menu
window.addEventListener('click', (e) => {
  const nav = document.getElementById('myNavtoggle');
  const isMenu = nav.contains(e.target);
  const isButton = e.target.matches('.hamburger, .hamburger *'); // adjust selector to your toggle button

  if (!isMenu && !isButton) {
    closeMenu();
  }
});

// --- Dropdown for case study map ---
const dropdown = document.querySelector('.dropdown');

if (dropdown) { // ✅ safety check
  const button = dropdown.querySelector('.dropbtn');
  const links = dropdown.querySelectorAll('.dropdown-content a');

  // Toggle dropdown on button click
  button.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  // Close dropdown if clicking outside
  window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  // Close dropdown when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  });
}

// --- Sticky dropdown (dynamic navbar above) ---
const navbar = document.querySelector('header'); // your fixed navbar
const root = document.documentElement;

function updateStickyOffset() {
  const height = navbar.offsetHeight;
  root.style.setProperty('--navbar-height', `${height}px`);
}

// Run once and also whenever the navbar resizes
updateStickyOffset();
window.addEventListener('resize', updateStickyOffset);
window.addEventListener('scroll', updateStickyOffset);

// --- Helper functions ---
function closeMenu() {
  const nav = document.getElementById('myNavtoggle');
  const icon = document.querySelector('.navigation .icon i');

  if (nav.classList.contains('responsive')) {
    nav.classList.remove('responsive');
    safeUpdateStickyOffset();
    clearMenuTimer();

    // Swap back to hamburger icon
    if (icon) {
      icon.classList.remove('fa-x');
      icon.classList.add('fa-bars');
    }
  }
}

function startMenuTimer() {
  clearMenuTimer(); // reset previous timer
  menuTimer = setTimeout(closeMenu, 10000); // 10 seconds
}

function clearMenuTimer() {
  clearTimeout(menuTimer);
}

// Optional: reset timer if user interacts inside menu
document.getElementById('myNavtoggle').addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('a')) return; // let link clicks close menu normally
  startMenuTimer();
});

