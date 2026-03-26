const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');
const navCta = document.querySelector('.nav-cta');
const navInner = document.querySelector('.nav-inner');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!navLinks || !menuToggle) return;
  if (!navLinks.classList.contains('open')) return;
  const target = event.target;
  if (navLinks.contains(target) || menuToggle.contains(target)) return;
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
});

const moveCtaForMobile = () => {
  if (!navCta || !navLinks || !navInner) return;
  if (window.innerWidth <= 860) {
    if (!navLinks.contains(navCta)) {
      navLinks.appendChild(navCta);
    }
  } else if (navLinks.contains(navCta)) {
    navInner.appendChild(navCta);
  }
};

const updateHeaderState = () => {
  if (!header || !heroSection) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
  const threshold = heroBottom - header.offsetHeight;
  const isTransparent = window.scrollY < threshold;
  header.classList.toggle('is-transparent', isTransparent);
};

updateHeaderState();
moveCtaForMobile();
window.addEventListener('scroll', () => requestAnimationFrame(updateHeaderState));
window.addEventListener('resize', () => {
  updateHeaderState();
  moveCtaForMobile();
});
