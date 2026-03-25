import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import services from '../data/services.json';

const iconMap = {
  clipboard: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
  clock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  heart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  scan: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/></svg>',
  flag: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 22v-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  activity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const chevronSvg = '<svg class="svc__chevron" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="m8 4 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function Services(container) {
  const categories = ['Все', ...new Set(services.map(s => s.category))];

  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <h1 class="page-head__title">Каталог услуг</h1>
  </header>

  <div class="search" data-a style="--d:40ms">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <input type="search" placeholder="Название услуги" id="svcSearch">
  </div>

  <nav class="chips" data-a style="--d:70ms">
    ${categories.map((c, i) => `<a class="chip${i === 0 ? ' is-on' : ''}" data-cat="${c}">${c}</a>`).join('')}
  </nav>

  <p class="results" data-a style="--d:90ms" id="svcCount">${services.length} услуг</p>

  <main data-a style="--d:100ms" id="svcList">
    ${services.map(s => `<a class="svc" data-nav="/services/${s.id}" data-category="${s.category}">
      <div class="svc__ic">${iconMap[s.icon] || iconMap.clipboard}</div>
      <div class="svc__info"><p class="svc__name">${s.name}</p><p class="svc__desc">${s.desc}</p></div>
      <div class="svc__right"><span class="svc__price">от ${s.price} \u20BD</span>${chevronSvg}</div>
    </a>`).join('')}
    <div class="bot"></div>
  </main>

  ${TabBar('services')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Chip filter
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      container.querySelector('.chip.is-on')?.classList.remove('is-on');
      chip.classList.add('is-on');
      const cat = chip.dataset.cat;
      let count = 0;
      container.querySelectorAll('.svc[data-category]').forEach(svc => {
        const show = cat === 'Все' || svc.dataset.category === cat;
        svc.style.display = show ? '' : 'none';
        if (show) count++;
      });
      container.querySelector('#svcCount').textContent = count + ' услуг';
    });
  });

  // Search filter
  const searchInput = container.querySelector('#svcSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      let count = 0;
      container.querySelectorAll('.svc[data-category]').forEach(svc => {
        const name = svc.querySelector('.svc__name').textContent.toLowerCase();
        const show = name.includes(q);
        svc.style.display = show ? '' : 'none';
        if (show) count++;
      });
      container.querySelector('#svcCount').textContent = count + ' услуг';
    });
  }
}
