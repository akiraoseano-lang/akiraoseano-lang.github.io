/**
 * Personal Portfolio - JavaScript Engine
 * Author: Oseano Fagan Akira
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initHeader();
  initMobileNav();
  initTypingEffect();
  initScrollReveal();
  initCounterAnimation();
  initProgressBars();
  initProjectFilter();
  initFormValidation();
  initBackToTop();
  initCursorGlow();
  initRippleEffect();
});

/* ==========================================================================
   1. PAGE LOADER
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 400);
  });
}

/* ==========================================================================
   2. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersLight) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   3. STICKY HEADER & ACTIVE NAVBAR LINK
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. TYPING ANIMATION EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const words = ['Backend Developer', 'Frontend Developer', 'Full Stack Developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATION
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. COUNTER ANIMATION
   ========================================================================== */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));

          const updateCounter = () => {
            count += step;
            if (count >= target) {
              stat.textContent = target;
            } else {
              stat.textContent = count;
              requestAnimationFrame(updateCounter);
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

/* ==========================================================================
   8. ANIMATED PROGRESS BARS
   ========================================================================== */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${value}%`;
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   9. PROJECT FILTERING SYSTEM
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ==========================================================================
   10. FORM VALIDATION & HANDLING (kirim langsung ke email via FormSubmit)
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = ['name', 'email', 'subject', 'message'];
  const statusMsg = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let isValid = true;
    fields.forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const parent = input.parentElement;

      if (!input.value.trim()) {
        parent.classList.add('error');
        isValid = false;
      } else if (fieldId === 'email' && !validateEmail(input.value.trim())) {
        parent.classList.add('error');
        isValid = false;
      } else {
        parent.classList.remove('error');
      }
    });
    return isValid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      statusMsg.style.color = '#EF4444';
      statusMsg.textContent = 'Please fix the errors above and try again.';
      return;
    }

    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusMsg.style.color = '';
    statusMsg.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusMsg.style.color = '#10B981';
        statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      statusMsg.style.color = '#EF4444';
      statusMsg.textContent = 'Something went wrong sending your message. Please try again or email me directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      setTimeout(() => { statusMsg.textContent = ''; }, 6000);
    }
  });
}

/* ==========================================================================
   12. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. CURSOR GLOW EFFECT
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   14. RIPPLE BUTTON EFFECT
   ========================================================================== */
function initRippleEffect() {
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement('span');
      circle.classList.add('ripple-span');
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
}