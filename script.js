// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ── SMOOTH SCROLL ──
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: 'smooth' });
  closeMobileMenu();
}

// ── MOBILE MENU ──
function toggleMenu() {
  const menu = document.getElementById('mobileNav');
  const ham  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ──
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 28);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.impact-num').forEach(el => {
  const raw = el.dataset.target;

  // Skip elements without number targets
  if (!raw) return;

  const suffix = el.dataset.suffix || '';
  animateCount(el, parseInt(raw), suffix);
});
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const strip = document.querySelector('.impact-strip');
if (strip) counterObserver.observe(strip);

// ── VOLUNTEER FORM ──
function submitForm() {
  const name  = document.getElementById('vol-name').value.trim();
  const email = document.getElementById('vol-email').value.trim();
  const role  = document.getElementById('vol-role').value;
  const phone = document.getElementById('vol-phone').value.trim();

  if (!name)  { showToast('⚠️', 'Please enter your name.'); return; }
  if (!email || !email.includes('@')) { showToast('⚠️', 'Please enter a valid email.'); return; }
  if (!role)  { showToast('⚠️', 'Please select how you\'d like to help.'); return; }

  showToast('🎉', `Thank you, ${name.split(' ')[0]}! We'll be in touch soon.`);

  // Reset
  ['vol-name','vol-email','vol-phone','vol-msg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('vol-role').value = '';
}

// ── TOAST ──
function showToast(emoji, msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = emoji;
  document.getElementById('toast-msg').textContent  = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4200);
}