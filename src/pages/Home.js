import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import doctors from '../data/doctors.json';
import services from '../data/services.json';

export function Home(container) {
  const featured = doctors[0];
  const others = doctors.slice(1);
  const topServices = services.slice(0, 3);

  const h = new Date().getHours();
  let greeting = 'Добрый день';
  if (h >= 5 && h < 12) greeting = 'Доброе утро';
  else if (h >= 12 && h < 17) greeting = 'Добрый день';
  else if (h >= 17 && h < 22) greeting = 'Добрый вечер';
  else greeting = 'Доброй ночи';

  container.innerHTML = `<div class="app">
  <header class="hero" data-a style="--d:0ms">
    <div class="hero__top">
      <img src="logo.svg" alt="Династия" class="hero__logo">
      <button class="hero__btn" aria-label="Уведомления">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <div class="hero__dot"></div>
      </button>
    </div>
    <p class="hero__greeting">${greeting}</p>
    <h1 class="hero__title">Забота о здоровье<br>начинается здесь</h1>
    <div class="hero__search">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      <input type="search" placeholder="Найти услугу или врача" aria-label="Поиск">
    </div>
  </header>

  <main>
    <section class="widgets" data-a style="--d:60ms" aria-label="Быстрые действия">
      <a class="widget" data-nav="/services">
        <div class="widget__icon">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="6" y="10" width="36" height="32" rx="6" fill="#E8F0D0" stroke="#7F9540" stroke-width="2"/>
            <path d="M16 6v8M32 6v8" stroke="#7F9540" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M6 20h36" stroke="#7F9540" stroke-width="2"/>
            <path d="M24 26v10M19 31h10" stroke="#7F9540" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="widget__label">Запись на приём</span>
      </a>
      <a class="widget" data-nav="/doctors">
        <div class="widget__icon">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="6" y="6" width="36" height="26" rx="5" fill="#E8F0D0" stroke="#7F9540" stroke-width="2"/>
            <path d="M18 38h12M24 32v6" stroke="#7F9540" stroke-width="2" stroke-linecap="round"/>
            <circle cx="24" cy="17" r="5" stroke="#7F9540" stroke-width="2"/>
            <path d="M24 22v2" stroke="#7F9540" stroke-width="2" stroke-linecap="round"/>
            <circle cx="24" cy="26" r="1.5" fill="#7F9540"/>
          </svg>
        </div>
        <span class="widget__label">Врачи онлайн</span>
      </a>
      <a class="widget" data-nav="/feedback">
        <div class="widget__icon">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M8 24 24 10l16 14" stroke="#7F9540" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22v16a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V22" stroke="#7F9540" stroke-width="2"/>
            <rect x="14" y="20" width="20" height="18" rx="3" fill="#E8F0D0"/>
            <path d="M24 26v8M20 30h8" stroke="#7F9540" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="widget__label">Вызов на дом</span>
      </a>
    </section>

    <div class="chips" data-a style="--d:80ms">
      <a class="chip is-on">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6M9 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Все
      </a>
      <a class="chip">Ортопедия</a>
      <a class="chip">Неврология</a>
      <a class="chip">Массаж</a>
      <a class="chip">Реабилитация</a>
      <a class="chip">Диагностика</a>
    </div>

    <section class="sec" data-a style="--d:150ms">
      <div class="sec__head">
        <h2 class="sec__title">Рекомендуем</h2>
        <a class="sec__more" data-nav="/doctors">Все врачи</a>
      </div>
      <a class="doc-feat" data-nav="/doctors/${featured.id}">
        <div class="doc-feat__ava">${featured.initials}</div>
        <div class="doc-feat__info">
          <p class="doc-feat__name">${featured.name}</p>
          <p class="doc-feat__spec">${featured.spec}, стаж ${featured.experience}</p>
          <div class="doc-feat__tags">
            ${featured.tags.map(t => `<span class="doc-feat__tag">${t}</span>`).join('')}
          </div>
        </div>
      </a>
      <div class="doc-row" style="margin-top:14px">
        ${others.map(d => `<a class="doc-sm" data-nav="/doctors/${d.id}"><div class="doc-sm__ava" style="--h:${d.hue};--s:${d.sat}">${d.initials}</div><span class="doc-sm__name">${d.shortName.split(' ')[0]} ${d.shortName.split(' ')[1]?.[0] || ''}.</span></a>`).join('')}
      </div>
    </section>

    <section class="sec" data-a style="--d:220ms">
      <div class="sec__head">
        <h2 class="sec__title">Топ услуг</h2>
        <a class="sec__more" data-nav="/services">Все</a>
      </div>
      <div class="svcs">
        ${topServices.map((s, i) => `<a class="svc" data-nav="/services/${s.id}"><div class="svc__num">${i + 1}</div><div class="svc__info"><p class="svc__name">${s.name}</p><p class="svc__desc">${s.desc}</p></div><span class="svc__price">от ${s.price} \u20BD</span></a>`).join('')}
      </div>
    </section>

    <a class="cta" data-a style="--d:280ms" data-nav="/feedback">
      <div class="cta__text">
        <p class="cta__title">Задать вопрос</p>
        <p class="cta__sub">Администратор перезвонит в течение 15 минут</p>
      </div>
      <div class="cta__btn" aria-label="Написать">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 2 11 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="m22 2-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </a>

    <div class="team" data-a style="--d:330ms">
      <img src="./team.jpg" alt="Команда клиники Династия">
      <div class="team__overlay">
        <p class="team__title">Наша команда</p>
        <p class="team__sub">12 специалистов с опытом от 8 лет</p>
      </div>
    </div>

    <div class="tip" data-a style="--d:390ms">
      <div class="tip__row">
        <span class="tip__badge">Совет</span>
        <span class="tip__time">Март 2026</span>
      </div>
      <p class="tip__text">Весной суставы чувствительны к перепадам температуры. Начните день с лёгкой разминки перед выходом</p>
    </div>

    <div class="bot"></div>
  </main>

  ${TabBar('home')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Chip toggle
  container.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', (e) => {
      e.preventDefault();
      container.querySelector('.chip.is-on')?.classList.remove('is-on');
      c.classList.add('is-on');
    });
  });
}
