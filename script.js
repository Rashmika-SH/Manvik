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

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.style.background = window.scrollY > 50 ? 'rgba(6,0,26,0.96)' : 'rgba(6,0,26,0.82)';
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const s = document.getElementById('form-success');
  if (s) { s.classList.remove('hidden'); e.target.reset(); setTimeout(() => s.classList.add('hidden'), 5000); }
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
