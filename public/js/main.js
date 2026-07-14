/* ── main.js ── Dixson Apaza Portfolio - Studio Œ Aesthetic ──────────────── */
'use strict';

(function () {
  // ── Hero video/image load ──
  window.addEventListener('load', () => {
    const v = document.querySelector('.hero-video');
    if (v) v.classList.add('loaded');
  });

  // ── Hero entrance animations ──
  setTimeout(() => {
    const eb = document.querySelector('.hero-eyebrow');
    if (eb) eb.classList.add('is-in');
  }, 250);

  document.querySelectorAll('.hero-word').forEach((w, i) => {
    setTimeout(() => w.classList.add('is-in'), 400 + i * 130);
  });

  setTimeout(() => {
    const s = document.querySelector('.hero-sub');
    const c = document.querySelector('.hero-cta');
    const actions = document.querySelector('.hero-actions-container');
    if (s) s.classList.add('is-in');
    if (c) c.classList.add('is-in');
    if (actions) actions.classList.add('is-in');
  }, 1300);

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Navbar scrolled effect ──
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ── Footer wordmark per-char splitting ──
  const wm = document.getElementById('footer-wordmark');
  if (wm) {
    const txt = wm.textContent;
    wm.innerHTML = '';
    txt.split('').forEach(ch => {
      const s = document.createElement('span');
      s.className = 'footer-char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      wm.appendChild(s);
    });
    wm.setAttribute('aria-label', txt);
  }

  // ── IntersectionObserver for static entrance animations ──
  const enterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        enterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01 });

  document.querySelectorAll('.footer-rule, .footer-elevation').forEach(el => enterObs.observe(el));

  const wmObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.footer-char').forEach((c, i) => {
          setTimeout(() => c.classList.add('is-in'), i * 80);
        });
        wmObs.disconnect();
      }
    });
  }, { threshold: 0.01 });
  if (wm) wmObs.observe(wm);

  // ── rAF scroll loop ──
  let ticking = false;

  function updateScrollProgress() {
    ticking = false;

    // SECTION 1 — Sticky-stack mapping
    const stackWrap = document.getElementById('stack-wrapper');
    if (stackWrap) {
      const panels = stackWrap.querySelectorAll('.stack-panel');
      const wrapRect = stackWrap.getBoundingClientRect();
      const wrapTop = wrapRect.top + window.scrollY;
      const wrapH = wrapRect.height;
      const scrollIntoWrap = window.scrollY - wrapTop;
      const usableScroll = wrapH - window.innerHeight;
      const progress = Math.max(0, Math.min(0.9999, scrollIntoWrap / usableScroll));
      const N = panels.length;
      
      const activeIdx = Math.min(N - 1, Math.floor(progress * N));
      panels.forEach((p, i) => {
        p.classList.toggle('in-view', i <= activeIdx);
        p.classList.toggle('dim', i < activeIdx);
      });
      const cur = document.getElementById('stack-current');
      if (cur) cur.textContent = String(activeIdx + 1).padStart(2, '0');
    }

    // SECTION 2 — Pinned split text swap
    const splitSec = document.querySelector('.split-section');
    if (splitSec) {
      const r = splitSec.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const h = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY - top) / h));
      const N = 3;
      const idx = Math.min(N - 1, Math.floor(p * N + 0.0001));

      // Swap active class on images
      document.querySelectorAll('.split-img').forEach((img, i) => {
        if (i === idx) img.classList.add('active');
        else img.classList.remove('active');
      });

      // Swap active class on text panels
      document.querySelectorAll('.split-panel').forEach((panel, i) => {
        if (i === idx) panel.classList.add('active');
        else panel.classList.remove('active');
      });

      // Swap active class on progress dots
      document.querySelectorAll('.split-progress-dot').forEach((d, i) => {
        if (i === idx) d.classList.add('active');
        else d.classList.remove('active');
      });

      const cur = document.getElementById('split-current');
      if (cur) cur.textContent = String(idx + 1).padStart(2, '0');
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }, { passive: true });
  updateScrollProgress();

  // ── Section 3: Cursor-tracked list preview ──
  const cursorSection = document.getElementById('experience');
  const cursorPreview = document.getElementById('cursor-preview');
  const cursorPreviewImg = document.getElementById('cursor-preview-img');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorList = document.getElementById('cursor-list');

  if (cursorSection && cursorPreview && cursorDot && cursorList) {
    let inSection = false;
    let currentItem = null;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    // Preload preview images
    cursorList.querySelectorAll('.cursor-item').forEach(item => {
      const src = item.getAttribute('data-img');
      if (src) { const im = new Image(); im.src = src; }
    });

    function setPreviewVars(x, y) {
      cursorPreview.style.setProperty('--x', x + 'px');
      cursorPreview.style.setProperty('--y', y + 'px');
      cursorDot.style.setProperty('--x', x + 'px');
      cursorDot.style.setProperty('--y', y + 'px');
    }

    function tick() {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      setPreviewVars(curX, curY);
      requestAnimationFrame(tick);
    }
    tick();

    cursorSection.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    cursorSection.addEventListener('mouseenter', () => {
      inSection = true;
      cursorDot.classList.add('is-in-section');
    });

    cursorSection.addEventListener('mouseleave', () => {
      inSection = false;
      cursorDot.classList.remove('is-in-section');
      cursorPreview.classList.remove('is-visible');
      currentItem = null;
    });

    cursorList.querySelectorAll('.cursor-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const src = item.getAttribute('data-img');
        if (src && cursorPreviewImg.getAttribute('src') !== src) {
          cursorPreviewImg.setAttribute('src', src);
        }
        cursorPreview.classList.add('is-visible');
        currentItem = item;
      });

      item.addEventListener('mouseleave', () => {
        if (currentItem === item) {
          cursorPreview.classList.remove('is-visible');
          currentItem = null;
        }
      });

      item.addEventListener('click', () => {
        const href = item.getAttribute('data-href');
        if (href) {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ── Contact Form Submission UX ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    contactForm.addEventListener('submit', () => {
      if (submitBtn) {
        const label = submitBtn.querySelector('span');
        if (label) label.textContent = 'Enviando...';
        submitBtn.disabled = true;
      }
    });
  }

  // ── Global fallback for animation states (only if IntersectionObserver is not supported) ──
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.footer-rule, .footer-elevation, .footer-char').forEach(el => {
      el.classList.add('is-in');
    });
  }

})();
