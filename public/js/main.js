/* ── main.js ── Dixson Apaza Portfolio ───────────────────────────────── */
'use strict';

// ─── Cursor Glow ────────────────────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

// ─── Navbar Scroll Effect ────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── Mobile Nav Toggle ───────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let delay = 0;
          siblings.forEach((el, idx) => {
            if (el === entry.target) delay = idx * 80;
          });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => revealObserver.observe(el));
}

// ─── Typewriter Effect ───────────────────────────────────────────────────────
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const texts = [
    'Backend Developer Jr',
    'APIs REST Builder',
    'Django & Node.js Dev',
    'Cloud Deploy Enthusiast',
    'Problem Solver'
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  const type = () => {
    const current = texts[tIdx];
    if (!deleting) {
      typewriterEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      typewriterEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 55 : 85);
  };
  setTimeout(type, 600);
}

// ─── Skill Bar Animation ─────────────────────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level;
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillBars.forEach(bar => barObserver.observe(bar));
}

// ─── Contact Form UX ─────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  contactForm.addEventListener('submit', (e) => {
    if (submitBtn) {
      const label     = submitBtn.querySelector('span');
      const icon      = submitBtn.querySelector('i:not(.fa-spinner)');
      const loader    = submitBtn.querySelector('.btn-loader');
      if (label) label.textContent = 'Enviando...';
      if (icon)  icon.style.display = 'none';
      if (loader) loader.style.display = 'inline-flex';
      submitBtn.disabled = true;
    }
  });

  // Live input feedback
  contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('blur', () => {
      const wrapper = input.closest('.form-group');
      if (wrapper) {
        wrapper.classList.toggle('has-error', !input.validity.valid && input.value !== '');
        wrapper.classList.toggle('is-valid', input.validity.valid && input.value !== '');
      }
    });
  });
}

// ─── Smooth page transitions ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="/"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === window.location.pathname) return;
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(8px)';
    document.body.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    setTimeout(() => { window.location.href = href; }, 250);
  });
});

// Fade-in al cargar Y al volver con el botón atrás (bfcache fix)
const fadeInPage = () => {
  document.body.style.opacity = '1';
  document.body.style.transform = 'translateY(0)';
  document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
};

// pageshow se dispara tanto en carga normal como al restaurar desde bfcache
window.addEventListener('pageshow', (e) => {
  fadeInPage();
});

// ─── Count-up Animation for Stats ───────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const num = parseFloat(text);
          if (!isNaN(num)) {
            let start = 0;
            const step = num / 40;
            const timer = setInterval(() => {
              start += step;
              if (start >= num) { el.textContent = text; clearInterval(timer); return; }
              el.textContent = (text.includes('+') ? Math.floor(start) + '+' : Math.floor(start));
            }, 30);
          }
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach(el => countObserver.observe(el));
}
