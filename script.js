// ===== VIDEO AUTOPLAY + AUTO UNMUTE ON FIRST INTERACTION =====
window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  if (!video) return;
  video.muted = true;
  video.volume = 0.8;
  const p = video.play();
  if (p !== undefined) {
    p.catch(() => {
      document.addEventListener('click', () => {
        video.play().catch(() => {});
      }, { once: true });
    });
  }

  let unmuted = false;
  const unmute = () => {
    if (unmuted) return;
    unmuted = true;
    video.muted = false;
    video.removeAttribute('muted');
    video.volume = 0.8;
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser strictly blocks it, fallback to muted
          video.muted = true;
          unmuted = false;
        });
      }
    }
  };

  // Only use explicit user interactions, NOT scroll or pointermove
  ['click', 'keydown', 'touchstart'].forEach(e => document.addEventListener(e, unmute, { once: true }));
});

// ===== FAQ TOGGLE =====
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

// ===== MOBILE NAV =====
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ===== POPULATE YEAR DROPDOWNS =====
(function() {
  const currentYear = new Date().getFullYear();
  ['dob_year_contact', 'dob_year_index'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    for (let y = currentYear; y >= 1940; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    }
  });
})();
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.style.background = window.scrollY > 50 ? 'rgba(6,0,26,0.96)' : 'rgba(6,0,26,0.82)';
});

// ===== CONTACT FORM WITH EMAILJS =====
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');

  const name    = form.querySelector('[name="name"]').value;
  const email   = form.querySelector('[name="email"]').value;
  const day     = form.querySelector('[name="dob_day"]') ? form.querySelector('[name="dob_day"]').value : '';
  const month   = form.querySelector('[name="dob_month"]') ? form.querySelector('[name="dob_month"]').value : '';
  const year    = form.querySelector('[name="dob_year"]') ? form.querySelector('[name="dob_year"]').value : '';
  const dob     = [day, month, year].filter(Boolean).join(' ') || 'Not provided';
  const service = form.querySelector('[name="service"]') ? form.querySelector('[name="service"]').value : 'Not specified';
  const message = form.querySelector('[name="message"]').value;

  const text = `Hello Psychic Tulsi Ram,%0A%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Email:* ${encodeURIComponent(email)}%0A` +
    `*Date of Birth:* ${encodeURIComponent(dob)}%0A` +
    `*Service:* ${encodeURIComponent(service)}%0A` +
    `*Message:* ${encodeURIComponent(message)}`;

  if (success) {
    success.classList.remove('hidden');
    setTimeout(() => success.classList.add('hidden'), 6000);
  }

  form.reset();

  setTimeout(() => {
    window.open(`https://wa.me/61452606444?text=${text}`, '_blank');
  }, 800);
}


// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.svc-box, .svc-detail-card, .why-box, .testi-box, .exp-box, .how-step, .connect-card').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== GOLDEN CURSOR PARTICLE EFFECT =====
(function() {
  const colors = ['#c9a84c', '#f0d080', '#ffe066', '#fff0a0', '#d4a017'];

  function spawnParticle(x, y) {
    const dot = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 60 + 30;
    const tx = Math.cos(angle) * speed;
    const ty = Math.sin(angle) * speed;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 500 + 400;

    dot.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 ${size * 2}px ${color};
      transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out;
    `;
    document.body.appendChild(dot);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dot.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
        dot.style.opacity = '0';
      });
    });

    setTimeout(() => dot.remove(), duration);
  }

  // Desktop
  let moveThrottle = false;
  document.addEventListener('mousemove', (e) => {
    if (moveThrottle) return;
    moveThrottle = true;
    setTimeout(() => moveThrottle = false, 30);
    for (let i = 0; i < 2; i++) spawnParticle(e.clientX, e.clientY);
  });

  document.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) spawnParticle(e.clientX, e.clientY);
  });

  // Mobile — attach to window to catch all touches
  let touchThrottle = false;
  window.addEventListener('touchmove', (e) => {
    if (touchThrottle) return;
    touchThrottle = true;
    setTimeout(() => touchThrottle = false, 30);
    const t = e.touches[0];
    for (let i = 0; i < 3; i++) spawnParticle(t.clientX, t.clientY);
  }, { passive: true, capture: true });

  window.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    for (let i = 0; i < 10; i++) spawnParticle(t.clientX, t.clientY);
  }, { passive: true, capture: true });
})();
