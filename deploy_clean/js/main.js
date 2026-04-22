// ─── NAV SCROLL ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 40
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.08)';
});

// ─── MOBILE MENU ───
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── FADE IN ON SCROLL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── FILE UPLOAD LABEL ───
const fileInput = document.querySelector('.form-file-input');
const fileLabel = document.querySelector('.form-file-label');
if (fileInput && fileLabel) {
  fileInput.addEventListener('change', () => {
    const name = fileInput.files[0]?.name;
    fileLabel.textContent = name ? `✓ ${name}` : 'Attach your file (AI, DWG, EPS, PDF, ZIP)';
  });
}

// ─── QUOTE FORM (Netlify) ───
const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = quoteForm.querySelector('.form-submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const formData = new FormData(quoteForm);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      quoteForm.style.display = 'none';
      document.querySelector('.form-success').style.display = 'block';
    } catch {
      btn.textContent = 'Send Job Request →';
      btn.disabled = false;
      alert('Something went wrong. Please email hello@ruleonecnc.com directly.');
    }
  });
}

// ─── SMOOTH ANCHOR ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
