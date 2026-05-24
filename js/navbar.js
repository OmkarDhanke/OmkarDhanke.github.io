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
const mobileMenuCloseDelay = 220;

function getNavScrollOffset() {
  return navbar.offsetHeight + (mobileBreakpoint.matches ? 8 : 8);
}

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
  const scrollPosition = window.scrollY + navbar.offsetHeight + (window.innerHeight * 0.18);

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

function scrollToSectionByHash(hash, behavior = 'smooth') {
  const targetId = hash.replace('#', '');

  if (!targetId) {
    return;
  }

  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const targetSection = document.getElementById(targetId);

  if (!targetSection) {
    return;
  }

  const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - getNavScrollOffset();

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior,
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

let navScrollTicking = false;

function handleNavScroll() {
  if (navScrollTicking) {
    return;
  }

  navScrollTicking = true;

  window.requestAnimationFrame(() => {
    updateNavbarSpacing();
    updateActiveNavLink();
    navScrollTicking = false;
  });
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

navToggle.addEventListener('click', event => {
  event.stopPropagation();
  toggleMobileMenu();
});

allNavLinks.forEach(link => {
  link.addEventListener('click', event => {
    const hash = link.getAttribute('href');

    if (!hash || !hash.startsWith('#')) {
      return;
    }

    event.preventDefault();

    if (mobileBreakpoint.matches) {
      closeMobileMenu();
      window.setTimeout(() => {
        scrollToSectionByHash(hash);
        window.history.replaceState(null, '', hash);
      }, mobileMenuCloseDelay);
      return;
    }

    scrollToSectionByHash(hash);
    window.history.replaceState(null, '', hash);
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

window.addEventListener('load', () => {
  if (window.location.hash) {
    scrollToSectionByHash(window.location.hash, 'auto');
  }
});
