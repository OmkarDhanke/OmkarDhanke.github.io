/* ============================================================
   PROFILE PHOTO MODAL
   Click the navbar avatar to view the photo large, in a circle,
   over a blurred background. Closes on outside click, Esc, or the
   close button. Self-contained: does not depend on navbar.js.
   ============================================================ */

(function () {
  const trigger = document.querySelector('.nav-avatar-btn');
  const avatar = trigger ? trigger.querySelector('.nav-avatar') : null;

  if (!trigger || !avatar) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'profile-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Profile photo');
  overlay.innerHTML =
    '<button type="button" class="profile-modal-close" aria-label="Close profile photo">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">' +
        '<line x1="18" y1="6" x2="6" y2="18"></line>' +
        '<line x1="6" y1="6" x2="18" y2="18"></line>' +
      '</svg>' +
    '</button>' +
    '<img class="profile-modal-img" alt="Omkar Dhanke profile photo" />';

  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector('.profile-modal-close');
  const photo = overlay.querySelector('.profile-modal-img');
  photo.src = avatar.currentSrc || avatar.src;

  let isOpen = false;

  function openModal() {
    isOpen = true;
    overlay.classList.add('is-open');
    document.documentElement.classList.add('profile-modal-open');
    window.requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
  }

  function closeModal() {
    isOpen = false;
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('profile-modal-open');
    trigger.focus({ preventScroll: true });
  }

  trigger.addEventListener('click', openModal);

  overlay.addEventListener('click', event => {
    if (event.target !== photo) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (!isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      closeModal();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus({ preventScroll: true });
    }
  });
})();