import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import course from '../data/course.json';

export function Course(container) {
  const pct = Math.round((course.current / course.total) * 100);

  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <h1 class="page-head__title">Мой курс</h1>
  </header>

  <main>
    <div class="progress-card" data-a style="--d:40ms">
      <p class="progress__label">${course.treatment}</p>
      <h2 class="progress__title">Визит ${course.current} из ${course.total}</h2>
      <p class="progress__sub">Следующий: ${course.nextDate}</p>
      <div class="progress__bar"><div class="progress__fill" style="width:${pct}%"></div></div>
    </div>

    <div class="block" data-a style="--d:80ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Визиты</p>
      ${course.visits.map(v => {
        const dotClass = v.status === 'done' ? 'visit__dot--done' : v.status === 'next' ? 'visit__dot--next' : 'visit__dot--pending';
        const statusText = v.status === 'done' ? 'Пройден' : v.status === 'next' ? 'Следующий' : '';
        const statusClass = v.status === 'done' ? 'visit__status--done' : v.status === 'next' ? 'visit__status--next' : '';
        return `<div class="visit"><div class="visit__dot ${dotClass}"></div><div class="visit__info"><p class="visit__name">Визит ${v.num} \u2014 ${v.name}</p><p class="visit__date">${v.date}</p></div>${statusText ? '<span class="visit__status ' + statusClass + '">' + statusText + '</span>' : ''}</div>`;
      }).join('')}
    </div>

    <div class="block" data-a style="--d:120ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Напоминания</p>
      <a class="reminder" data-nav="/videos">
        <div class="reminder__ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m8 5.5 11 6.5-11 6.5z" fill="currentColor"/></svg></div>
        <div class="reminder__info"><p class="reminder__title">${course.reminder.title}</p><p class="reminder__time">${course.reminder.time}</p></div>
        <span class="reminder__btn">Открыть</span>
      </a>
    </div>

    <div class="block" data-a style="--d:160ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Самочувствие</p>
      <div class="diary__today">
        <p class="diary__q">Как вы себя чувствуете сегодня?</p>
        <div class="diary__moods">
          <div class="diary__mood" data-val="1">1</div>
          <div class="diary__mood" data-val="2">2</div>
          <div class="diary__mood" data-val="3">3</div>
          <div class="diary__mood" data-val="4">4</div>
          <div class="diary__mood" data-val="5">5</div>
        </div>
        <div class="diary__scale"><span>Плохо</span><span>Отлично</span></div>
      </div>
      <div class="diary__history">
        ${course.diary.map(d => {
          const filled = d.value;
          const empty = 5 - filled;
          const color = filled >= 4 ? 'var(--green)' : 'var(--warn)';
          return `<div class="diary__row"><span class="diary__day">${d.date}</span><div class="diary__dots">${Array(filled).fill('<div class="diary__d" style="background:var(--green)"></div>').join('')}${Array(empty).fill('<div class="diary__d" style="background:var(--line)"></div>').join('')}</div><span class="diary__val" style="color:${color}">${d.value}</span></div>`;
        }).join('')}
      </div>
    </div>

    <div class="bot"></div>
  </main>

  ${TabBar('more')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Mood selector
  container.querySelectorAll('.diary__mood').forEach(mood => {
    mood.addEventListener('click', () => {
      container.querySelectorAll('.diary__mood').forEach(m => m.classList.remove('sel'));
      mood.classList.add('sel');
    });
  });
}
