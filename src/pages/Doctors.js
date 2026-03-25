import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import doctors from '../data/doctors.json';

export function Doctors(container) {
  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <h1 class="page-head__title">Наши врачи</h1>
  </header>

  <div class="search" data-a style="--d:40ms">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <input type="search" placeholder="Имя или специальность" id="docSearch">
  </div>

  <nav class="chips" data-a style="--d:70ms">
    <a class="chip is-on" data-cat="Все">Все</a>
    <a class="chip" data-cat="Ортопедия">Ортопедия</a>
    <a class="chip" data-cat="Неврология">Неврология</a>
    <a class="chip" data-cat="Массаж">Массаж</a>
    <a class="chip" data-cat="Реабилитация">Реабилитация</a>
  </nav>

  <p class="results" data-a style="--d:90ms" id="docCount">${doctors.length} врачей</p>

  <main class="docs" data-a style="--d:100ms">
    ${doctors.map(d => `<a class="doc" data-nav="/doctors/${d.id}" data-spec="${d.spec}">
      <div class="doc__ava" style="--h:${d.hue};--s:${d.sat}">${d.initials}</div>
      <p class="doc__name">${d.shortName}</p>
      <p class="doc__spec">${d.spec}</p>
      <div class="doc__tags">${d.tags.map(t => '<span class="tag">' + t + '</span>').join('')}</div>
    </a>`).join('')}
  </main>
  <div class="bot" style="padding:0 20px"></div>

  ${TabBar('doctors')}
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
      container.querySelectorAll('.doc[data-spec]').forEach(doc => {
        const spec = doc.dataset.spec.toLowerCase();
        const show = cat === 'Все' ||
          (cat === 'Ортопедия' && spec.includes('ортопед')) ||
          (cat === 'Неврология' && spec.includes('невролог')) ||
          (cat === 'Массаж' && (spec.includes('терапевт') || spec.includes('массаж'))) ||
          (cat === 'Реабилитация' && (spec.includes('реабилитолог') || spec.includes('физиотерапевт')));
        doc.style.display = show ? '' : 'none';
        if (show) count++;
      });
      container.querySelector('#docCount').textContent = count + ' врачей';
    });
  });

  // Search filter
  const searchInput = container.querySelector('#docSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      let count = 0;
      container.querySelectorAll('.doc[data-spec]').forEach(doc => {
        const name = doc.querySelector('.doc__name').textContent.toLowerCase();
        const spec = doc.querySelector('.doc__spec').textContent.toLowerCase();
        const show = name.includes(q) || spec.includes(q);
        doc.style.display = show ? '' : 'none';
        if (show) count++;
      });
      container.querySelector('#docCount').textContent = count + ' врачей';
    });
  }
}
