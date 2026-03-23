const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');

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

const updateHeaderState = () => {
  if (!header || !heroSection) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
  const threshold = heroBottom - header.offsetHeight;
  const isTransparent = window.scrollY < threshold;
  header.classList.toggle('is-transparent', isTransparent);
};

updateHeaderState();
window.addEventListener('scroll', () => requestAnimationFrame(updateHeaderState));
window.addEventListener('resize', updateHeaderState);
