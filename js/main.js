/* ============================================
   JOSE DIAZ — ARCHITECTURAL PHOTOGRAPHY
   main.js
   ============================================ */

'use strict';

// ── Nav: scroll state + mobile toggle ──────────────────
const nav      = document.querySelector('.nav');
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);

    const bars = toggle.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.querySelectorAll('span').forEach(b => {
        b.style.transform = '';
        b.style.opacity = '';
      });
    });
  });
}

// ── Hero scale-in ───────────────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('load', () => {
    setTimeout(() => hero.classList.add('loaded'), 100);
  });
}

// ── Fade-up on scroll ───────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length > 0) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));
}

// ── Lightbox ────────────────────────────────────────────
let lightboxImages = [];
let lightboxIndex  = 0;

function openLightbox(src, index, images) {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  lightboxImages = images || [src];
  lightboxIndex  = index  || 0;
  renderLightboxImage();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  renderLightboxImage();
}

function renderLightboxImage() {
  const img     = document.querySelector('.lightbox-img');
  const caption = document.querySelector('.lightbox-caption');
  if (!img) return;
  img.style.opacity = '0';
  img.src = lightboxImages[lightboxIndex];
  img.onload = () => {
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.25s';
  };
  if (caption) {
    caption.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }
}

// Keyboard nav
document.addEventListener('keydown', e => {
  const lb = document.querySelector('.lightbox');
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// Backdrop click closes lightbox
document.querySelector('.lightbox')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => lightboxNav(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => lightboxNav(1));

// ── Gallery: wire up click → lightbox ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  const srcs = [...galleryItems]
    .map(el => el.querySelector('img')?.src)
    .filter(Boolean);

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(srcs[i], i, srcs));
  });
});

// ── Gallery filter ───────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items  = document.querySelectorAll('.gallery-item');

      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter)
          ? 'block'
          : 'none';
      });

      const countEl = document.querySelector('.gallery-count');
      if (countEl) {
        const visible = [...items].filter(i => i.style.display !== 'none').length;
        countEl.textContent = `${visible} work${visible !== 1 ? 's' : ''}`;
      }
    });
  });
}

// ── Contact form ─────────────────────────────────────────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#4a7c59';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}