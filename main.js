document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

toggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

// PROJECT FILTER LOGIC
const tabs = document.querySelectorAll('.project-tabs .tab');
const cards = document.querySelectorAll('.project-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    if (!filter) return;

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// SKILLS TAB LOGIC
const skillTabs = document.querySelectorAll('.skills-tabs .tab');
const skillBoxes = document.querySelectorAll('.skill-card');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    skillBoxes.forEach(b => b.classList.remove('active'));

    tab.classList.add('active');
    const skillValue = tab.dataset.skill;
    const targetBox = document.querySelector(`.skill-card[data-skill="${skillValue}"]`);
    if (targetBox) {
      targetBox.classList.add('active');
    }
  });
});

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      status.style.display = 'block';
    } else {
      status.textContent = "Something went wrong. Try again.";
      status.style.display = 'block';
    }
  });
}
