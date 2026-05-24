/* ============================================================
   NAVBAR
   - Shrinks on scroll
   - Highlights active nav link based on scroll position
   ============================================================ */

const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavbarSpacing() {
  navbar.style.padding = window.scrollY > 50
    ? '0.8rem 2rem'
    : '1.2rem 2rem';
}

function updateActiveNavLink() {
  let current = 'home';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* Shrink navbar on scroll */
window.addEventListener('scroll', updateNavbarSpacing);

/* Active link highlight */
window.addEventListener('scroll', updateActiveNavLink);

updateNavbarSpacing();
updateActiveNavLink();
