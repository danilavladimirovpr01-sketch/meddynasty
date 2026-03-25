import { navigate } from '../router.js';

export function TabBar(active) {
  const tabs = [
    { id: 'home', label: 'Главная', hash: '/', icon: '<svg viewBox="0 0 24 24" fill="none"><path d="m3 12 2-2m0 0 7-7 7 7m-14 0v9a1 1 0 0 0 1 1h3m10-10 2 2m-2-2v9a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { id: 'services', label: 'Услуги', hash: '/services', icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6M9 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { id: 'doctors', label: 'Врачи', hash: '/doctors', icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { id: 'health', label: 'Здоровье', hash: '/videos', icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="1.5"/></svg>' },
    { id: 'more', label: 'Ещё', hash: '/course', icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>' }
  ];

  return `<nav class="tabs" aria-label="Навигация">${tabs.map(t =>
    `<a href="#${t.hash}" class="tab${t.id === active ? ' is-on' : ''}"${t.id === active ? ' aria-current="page"' : ''} data-tab="${t.id}">${t.icon}<span>${t.label}</span></a>`
  ).join('')}</nav>`;
}

export function attachTabListeners() {
  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = tab.getAttribute('href').slice(1);
      navigate(hash);
    });
  });
}
