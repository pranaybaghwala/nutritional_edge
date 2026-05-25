// ── NAV: sticky shadow + mobile toggle ──
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq__item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq__question').setAttribute('aria-expanded', false);
    });
    // open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', true);
    }
  });
});

// ── SCROLL-REVEAL: lightweight intersection observer ──
const revealEls = document.querySelectorAll(
  '.service-card, .step, .why-card, .testimonial-card, .about__card, .about__image-col'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav__links a:not(.btn)');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchorLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a:not(.btn)[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

