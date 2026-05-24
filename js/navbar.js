/* ============================================================
   NAVBAR
   - Shrinks on scroll
   - Highlights active nav link based on scroll position
   - Controls mobile menu
   ============================================================ */

const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBreakpoint = window.matchMedia('(max-width: 900px)');

function updateNavbarSpacing() {
  if (!mobileBreakpoint.matches) {
    navbar.style.padding = '';
    return;
  }

  navbar.style.padding = window.scrollY > 50
    ? '0.8rem 1.5rem'
    : '1rem 1.5rem';
}

function updateActiveNavLink() {
  let current = 'home';
  const scrollPosition = window.scrollY + navbar.offsetHeight + 24;

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
  });
}

function openMobileMenu() {
  navbar.classList.add('menu-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation menu');
  mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMobileMenu() {
  navbar.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

function toggleMobileMenu() {
  if (navbar.classList.contains('menu-open')) {
    closeMobileMenu();
    return;
  }

  openMobileMenu();
}

window.addEventListener('scroll', () => {
  updateNavbarSpacing();
  updateActiveNavLink();
});

navToggle.addEventListener('click', event => {
  event.stopPropagation();
  toggleMobileMenu();
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

document.addEventListener('click', event => {
  if (!mobileBreakpoint.matches || !navbar.classList.contains('menu-open')) {
    return;
  }

  if (!navbar.contains(event.target)) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
});

window.addEventListener('resize', () => {
  updateNavbarSpacing();

  if (!mobileBreakpoint.matches) {
    closeMobileMenu();
  }
});

updateNavbarSpacing();
updateActiveNavLink();
closeMobileMenu();
