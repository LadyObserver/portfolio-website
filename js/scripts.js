// Hamburger bar

function menuToggle() {
  var x = document.getElementById('myNavtoggle');
  if (x.className === 'navtoggle') {
    x.className += ' responsive';
  } else {
    x.className = 'navtoggle';
  }
}

// Dropdown for case study map

const dropdown = document.querySelector('.dropdown');
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