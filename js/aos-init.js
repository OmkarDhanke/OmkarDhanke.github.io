/* ============================================================
   MOTION SYSTEM
   Scroll reveal, counters, cursor glow, magnetic buttons.
   Replaces the old AOS-only init with production-safe motion.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function markLegacyAosElementsVisible() {
  document.querySelectorAll('[data-aos]').forEach(element => {
    element.classList.add('aos-animate');
  });
}

function applyRevealDelays() {
  document.querySelectorAll('.reveal-group').forEach(group => {
    group.querySelectorAll(':scope > .reveal-item').forEach((item, index) => {
      if (!item.style.getPropertyValue('--reveal-delay')) {
        item.style.setProperty('--reveal-delay', `${index * 70}ms`);
      }
    });
  });
}

function setupRevealObserver() {
  const revealElements = document.querySelectorAll(
  '.reveal, .reveal-left'
  );

  if (prefersReducedMotion.matches) {
    revealElements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px',
  });

  revealElements.forEach(element => observer.observe(element));
}

function parseCounterValue(text) {
  const cleanText = text.trim();
  const match = cleanText.match(/^([^0-9-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    value: Number(match[2].replace(/,/g, '')),
    suffix: match[3],
    decimals: match[2].includes('.') ? match[2].split('.')[1].length : 0,
  };
}

function formatCounterValue(prefix, value, suffix, decimals) {
  const formattedNumber = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formattedNumber}${suffix}`;
}

function animateCounter(element) {
  const parsed = parseCounterValue(element.dataset.countTo || element.textContent);

  if (!parsed) {
    return;
  }

  const duration = Number(element.dataset.countDuration || 1500);
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = parsed.value * eased;

    element.textContent = formatCounterValue(
      parsed.prefix,
      progress === 1 ? parsed.value : currentValue,
      parsed.suffix,
      parsed.decimals
    );

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
    element.classList.add('is-counted');
    }
  }

  window.requestAnimationFrame(tick);
}

function setupCounters() {
  const counters = document.querySelectorAll('.countup');

  if (!counters.length || prefersReducedMotion.matches) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted === 'true') {
        return;
      }

      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.45,
  });

  counters.forEach(counter => observer.observe(counter));
}

function setupMagneticButtons() {
  if (!finePointer.matches || prefersReducedMotion.matches) {
    return;
  }

  document.querySelectorAll('.magnetic').forEach(element => {
    let frameId = 0;

    const reset = () => {
      element.style.setProperty('--magnetic-x', '0px');
      element.style.setProperty('--magnetic-y', '0px');
    };

    element.addEventListener('pointermove', event => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;

        element.style.setProperty('--magnetic-x', `${(offsetX * 8).toFixed(2)}px`);
        element.style.setProperty('--magnetic-y', `${(offsetY * 6).toFixed(2)}px`);
        frameId = 0;
      });
    });

    element.addEventListener('pointerleave', reset);
    element.addEventListener('blur', reset);
  });
}

function initMotionSystem() {
  applyRevealDelays();
  setupRevealObserver();
  setupCounters();
  setupMagneticButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotionSystem, { once: true });
} else {
  initMotionSystem();
}

AOS.init({
  duration: 600,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

