/* ============================================================
   NAVBAR
   - Shrinks on scroll
   - Highlights active nav link based on scroll position
   ============================================================ */

const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

/* Shrink navbar on scroll */
window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > 50
    ? '0.8rem 2rem'
    : '1.2rem 2rem';
});

/* Active link highlight */
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
