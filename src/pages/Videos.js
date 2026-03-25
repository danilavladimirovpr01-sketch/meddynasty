import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import videos from '../data/videos.json';

export function Videos(container) {
  const categories = ['Все', ...new Set(videos.map(v => v.category))];

  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <h1 class="page-head__title">Видео</h1>
  </header>

  <nav class="chips" data-a style="--d:40ms">
    ${categories.map((c, i) => `<a class="chip${i === 0 ? ' is-on' : ''}" data-cat="${c}">${c}</a>`).join('')}
  </nav>

  <main class="vids" data-a style="--d:80ms">
    ${videos.map(v => `<a class="vid" data-category="${v.category}">
      <div class="vid__thumb" style="background-image:url('${v.thumb}');background-size:cover;background-position:center"><div class="vid__play"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m8 5.5 11 6.5-11 6.5z" fill="currentColor"/></svg></div><span class="vid__dur">${v.duration}</span><span class="vid__cat">${v.category}</span></div>
      <div class="vid__info"><p class="vid__title">${v.title}</p><p class="vid__meta">${v.doctor} \u00B7 ${v.date}</p></div>
    </a>`).join('')}
    <div class="bot"></div>
  </main>

  ${TabBar('health')}
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
      container.querySelectorAll('.vid[data-category]').forEach(vid => {
        vid.style.display = (cat === 'Все' || vid.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}
