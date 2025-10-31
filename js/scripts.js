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

// --- Dropdown for case study map with auto-close ---
const caseDropdown = document.querySelector('.dropdown');

if (caseDropdown) {
  const button = caseDropdown.querySelector('.dropbtn');
  const links = caseDropdown.querySelectorAll('.dropdown-content a');

  let dropdownTimer;
  const AUTO_CLOSE_DROPDOWN = 3000; // 3 seconds

  // Toggle dropdown
  function toggleDropdown() {
    caseDropdown.classList.toggle('show');
    if (caseDropdown.classList.contains('show')) startDropdownTimer();
    else clearDropdownTimer();
  }

  // Auto-close functions
  function closeDropdown() {
    caseDropdown.classList.remove('show');
    clearDropdownTimer();
  }

  function startDropdownTimer() {
    clearDropdownTimer();
    dropdownTimer = setTimeout(closeDropdown, AUTO_CLOSE_DROPDOWN);
  }

  function clearDropdownTimer() {
    clearTimeout(dropdownTimer);
  }

  // Reset timer on hover over links
  links.forEach(link => {
    link.addEventListener('mouseenter', startDropdownTimer);
    // Also close dropdown when clicking a link
    link.addEventListener('click', () => closeDropdown());
  });

  // Reset timer if clicking inside dropdown but not links
  caseDropdown.addEventListener('click', (e) => {
    if (!e.target.closest('a')) startDropdownTimer();
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', (e) => {
    if (!caseDropdown.contains(e.target) && !button.contains(e.target)) {
      closeDropdown();
    }
  });

  // Attach click to toggle
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
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

document.addEventListener('DOMContentLoaded', () => {
  const stickyDropdown = document.querySelector('.dropdown'); // adjust selector if needed
  const footer = document.querySelector('footer');

  if (stickyDropdown && footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Footer visible → hide dropdown
          stickyDropdown.classList.remove('show');
          stickyDropdown.classList.add('hidden-by-footer');
        } else {
          // Footer out of view → restore dropdown visibility
          stickyDropdown.classList.remove('hidden-by-footer');
        }
      });
    }, { threshold: 0.7 });

    observer.observe(footer);
  }
});

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


//---Email dropdown---

document.addEventListener('DOMContentLoaded', () => {
  const emailButton = document.getElementById('emailButton');
  const emailDropdown = document.getElementById('emailDropdown');
  const email = 'nikolett.muller@gmail.com';

  if (!emailButton || !emailDropdown) return; // safety check

  // --- Auto-close timer setup ---
  let emailTimer;
  const AUTO_CLOSE_EMAIL = 3000;
  function startEmailTimer() {
    clearEmailTimer();
    emailTimer = setTimeout(closeEmailDropdown, AUTO_CLOSE_EMAIL);
  }
  function clearEmailTimer() {
    clearTimeout(emailTimer);
  }
  function closeEmailDropdown() {
    emailDropdown.classList.remove('show');
    clearEmailTimer();
  }

  // --- Toggle dropdown ---
  function emailToggle() {
    emailDropdown.classList.toggle('show');
    if (emailDropdown.classList.contains('show')) startEmailTimer();
    else clearEmailTimer();
  }

  // --- Close if clicking outside ---
  window.addEventListener('click', e => {
    if (!emailDropdown.contains(e.target) && !emailButton.contains(e.target)) {
      closeEmailDropdown();
    }
  });

  // --- Attach click to toggle dropdown ---
  emailButton.addEventListener('click', e => {
    e.stopPropagation(); // prevent closing immediately
    emailToggle();
  });

  // --- Reset timer on hover inside dropdown ---
  emailDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', startEmailTimer);

    // Handle specific link actions and prevent default jump
    link.addEventListener('click', e => {
      e.preventDefault();
      closeEmailDropdown();

      const id = link.id;

      if (id === 'gmailLink') {
        window.open(`https://mail.google.com/mail/?view=cm&to=${email}`, '_blank');
      } else if (id === 'outlookLink') {
        window.open(`https://outlook.office.com/mail/deeplink/compose?to=${email}`, '_blank');
      } else if (id === 'yahooLink') {
        window.open(`https://mail.yahoo.com/d/compose?to=${email}`, '_blank');
      } else if (id === 'copyEmail') {
        navigator.clipboard.writeText(email).then(() => {
          alert('Email address copied!');
        });
      }
    });
  });

  // --- Click inside dropdown (not links) resets timer ---
  emailDropdown.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') startEmailTimer();
  });

});

//Copy phone number

function handlePhoneClick(event) {
  event.preventDefault(); // prevent default anchor behavior

  const number = '+12017365902';
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = 'tel:' + number; // trigger call
  } else {
    navigator.clipboard.writeText(number).then(() => {
      alert('Phone number copied!');
    });
  }
}


