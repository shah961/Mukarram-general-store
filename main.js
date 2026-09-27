/**
 * MUKARRAM GENERAL STORE - Core Application Logic
 * Clean, lightweight, modular JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initFormHandler();
  initAccessibilityHelpers();
});

/**
 * Handles Mobile Menu Toggle without touch/drag side-effects.
 * Uses strict click/tap events only.
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navOverlay = document.getElementById('mobile-nav-overlay');
  const navLinks = navOverlay ? navOverlay.querySelectorAll('a') : [];

  if (!toggleBtn || !navOverlay) return;

  function openMenu() {
    navOverlay.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navOverlay.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navOverlay.classList.contains('is-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/**
 * Local static form simulation without fake claims or remote submissions.
 */
function initFormHandler() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const notice = document.getElementById('form-notice');
    if (notice) {
      notice.style.display = 'block';
      notice.innerHTML = '<p style="color: var(--accent-gold); margin-top: 1rem;">Thank you for your inquiry. For immediate response, please call us directly at <strong>0300 9568225</strong>.</p>';
      contactForm.reset();
    }
  });
}

/**
 * Accessibility Focus Ring & Helper Adjustments
 */
function initAccessibilityHelpers() {
  // Ensure keyboard navigation focus indicator visibility
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}
