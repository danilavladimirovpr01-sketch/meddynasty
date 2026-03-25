import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import doctors from '../data/doctors.json';

export function DoctorDetail(container, params) {
  const doc = doctors.find(d => d.id === params.id) || doctors[0];

  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/doctors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <h1 class="page-head__title">Врач</h1>
  </header>

  <div class="profile" data-a style="--d:40ms">
    <div class="profile__ava">${doc.initials}</div>
    <h2 class="profile__name">${doc.name}</h2>
    <p class="profile__spec">${doc.spec} \u00B7 стаж ${doc.experience}</p>
    <div class="profile__tags">${doc.tags.map(t => '<span class="tag">' + t + '</span>').join('')}</div>
  </div>

  <main>
    <div class="video" data-a style="--d:80ms">
      <div class="video__play"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m8 5.5 11 6.5-11 6.5z" fill="currentColor"/></svg></div>
      <span class="video__label">Видео-визитка \u00B7 0:45</span>
    </div>

    ${doc.helpsIf && doc.helpsIf.length ? `<div class="block" data-a style="--d:120ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Этот врач поможет если:</p>
      <div class="helps">
        ${doc.helpsIf.map(h => `<div class="help"><div class="help__ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><p class="help__text">${h}</p></div>`).join('')}
      </div>
    </div>` : ''}

    <div class="block" data-a style="--d:160ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>О враче</p>
      <p class="bio">${doc.bio}</p>
    </div>

    ${doc.services && doc.services.length ? `<div class="block" data-a style="--d:200ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6M9 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Услуги</p>
      ${doc.services.map(s => `<a class="dsvc" data-nav="/services/${doc.id}"><span class="dsvc__name">${s.name}</span><span class="dsvc__price">${s.price} \u20BD</span></a>`).join('')}
    </div>` : ''}

    <div class="cta-wrap" data-a style="--d:240ms">
      <a class="btn btn--green btn--full">Записаться к врачу</a>
    </div>
    <div class="bot"></div>
  </main>

  ${TabBar('doctors')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
}
