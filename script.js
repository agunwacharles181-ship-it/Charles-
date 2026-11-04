const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const yearSpan = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');

const _revealCSS = `
.reveal{opacity:0;transform:translateY(24px);transition:opacity 600ms cubic-bezier(.2,.9,.2,1),transform 600ms cubic-bezier(.2,.9,.2,1);will-change:opacity,transform;transition-delay:var(--reveal-delay,0ms)}
.reveal.visible{opacity:1;transform:translateY(0)}
`;
const _style = document.createElement('style');
_style.setAttribute('data-generated','reveal');
_style.textContent = _revealCSS;
document.head.appendChild(_style);

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item, idx) => {
  const d = item.dataset.revealDelay;
  const delay = d ? Number(d) : idx * 80; 
  item.style.setProperty('--reveal-delay', `${delay}ms`);
  observer.observe(item);
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = contactForm.querySelector('button');
    const originalText = button.textContent;

    button.textContent = 'Message Sent';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}
