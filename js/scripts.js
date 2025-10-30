// --- Hamburger bar with auto-close ---
let menuTimer; // for inactivity timeout
const AUTO_CLOSE_TIME = 3000; // 3 seconds auto-close

function safeUpdateStickyOffset() {
  if (typeof updateStickyOffset === 'function') {
    updateStickyOffset();
  }
}

// --- Hamburger toggle ---
function menuToggle() {
  const nav = document.getElementById('myNavtoggle');
  const icon = document.querySelector('.navigation .icon i');

  nav.classList.toggle('responsive');
  safeUpdateStickyOffset();

  // Swap Font Awesome icon
  if (nav.classList.contains('responsive')) {
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-x');
    }
    startMenuTimer();
  } else {
    if (icon) {
      icon.classList.remove('fa-x');
      icon.classList.add('fa-bars');
    }
    clearMenuTimer();
  }
}

// --- Auto-close functions ---
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
  clearMenuTimer();
  menuTimer = setTimeout(closeMenu, AUTO_CLOSE_TIME);
}

function clearMenuTimer() {
  clearTimeout(menuTimer);
}

// --- Reset timer on hover or click inside menu ---
const navMenu = document.getElementById('myNavtoggle');
if (navMenu) {
  // Reset timer on hover over links
  const menuItems = navMenu.querySelectorAll('a');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', startMenuTimer);
  });

  // Reset timer on click inside menu (except links)
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    startMenuTimer();
  });
}

// --- Detect clicks outside menu ---
window.addEventListener('click', (e) => {
  const nav = document.getElementById('myNavtoggle');
  const isMenu = nav.contains(e.target);
  const isButton = e.target.matches('.hamburger, .hamburger *');

  if (!isMenu && !isButton) {
    closeMenu();
  }
});

// --- Dropdown for case study map ---
const dropdown = document.querySelector('.dropdown');

if (dropdown) {
  const button = dropdown.querySelector('.dropbtn');
  const links = dropdown.querySelectorAll('.dropdown-content a');

  button.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  });
}

// --- Sticky dropdown (dynamic navbar above) ---
const navbar = document.querySelector('header');
const root = document.documentElement;

function updateStickyOffset() {
  const height = navbar.offsetHeight;
  root.style.setProperty('--navbar-height', `${height}px`);
}

updateStickyOffset();
window.addEventListener('resize', updateStickyOffset);
window.addEventListener('scroll', updateStickyOffset);


// --- Pausing / Restarting GIFs ---

document.querySelectorAll('.gif-wrapper, .gif-container, .gif-container-animation').forEach(wrapper => {
    // Detect the GIF inside this wrapper (any possible class)
    const gif = wrapper.querySelector('.gif, .gif-animation, .gif-image');
    const button = wrapper.querySelector('.pause');
    if (!gif || !button) return; // skip if missing

    const icon = button.querySelector('i');
    const label = button.querySelector('.pause-label');
    let isPaused = false;

    // Update tooltip text based on current state
    function updateTooltip() {
        label.textContent = isPaused ? 'Restart' : 'Stop';
    }

    // Toggle GIF on click
    button.addEventListener('click', () => {
        if (!isPaused) {
            // Pause GIF: show still frame
            gif.src = gif.dataset.still;
            icon.classList.remove('fa-stop');
            icon.classList.add('fa-redo'); // redo icon
            isPaused = true;
        } else {
            // Restart GIF: play animated GIF with cache-busting
            gif.src = gif.dataset.animated + '?t=' + Date.now();
            icon.classList.remove('fa-redo');
            icon.classList.add('fa-stop'); // stop icon
            isPaused = false;
        }
        updateTooltip(); // update label immediately
    });

    // Update tooltip on hover
    button.addEventListener('mouseenter', updateTooltip);
});