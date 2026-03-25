import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';
import services from '../data/services.json';

export function ServiceDetail(container, params) {
  const svc = services.find(s => s.id === params.id) || services[0];

  const stepsHtml = svc.steps && svc.steps.length ? `
    <div class="block" data-a style="--d:80ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Как пройдёт приём</p>
      <div class="steps">
        ${svc.steps.map((st, i) => `<div class="step"><div class="step__dot">${i + 1}</div>${i < svc.steps.length - 1 ? '<div class="step__line"></div>' : ''}<div class="step__text"><p class="step__name">${st.title}</p><p class="step__desc">${st.desc}</p></div></div>`).join('')}
      </div>
    </div>` : '';

  const checklistHtml = svc.checklist && svc.checklist.length ? `
    <div class="block" data-a style="--d:120ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Что взять с собой</p>
      ${svc.checklist.map(item => `<div class="check"><div class="check__box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="check__label">${item}</span></div>`).join('')}
    </div>` : '';

  const calcHtml = svc.priceMax ? `
    <div class="block" data-a style="--d:160ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 6h8M8 10h3M13 10h3M8 14h3M13 14h3M8 18h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Ориентировочная стоимость</p>
      <div class="calc">
        <div class="calc__item"><p class="calc__label">Минимум</p><p class="calc__val">${svc.price} \u20BD</p></div>
        <div class="calc__item"><p class="calc__label">Типично</p><p class="calc__val">${svc.priceTypical} \u20BD</p></div>
        <div class="calc__item"><p class="calc__label">Максимум</p><p class="calc__val">${svc.priceMax} \u20BD</p></div>
      </div>
    </div>` : '';

  const memoHtml = svc.memo ? `
    <div class="block" data-a style="--d:190ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Памятка после приёма</p>
      <a href="#" class="memo">
        <div class="memo__ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <div class="memo__info"><p class="memo__name">${svc.memo.name}</p><p class="memo__size">PDF \u00B7 ${svc.memo.size}</p></div>
        <svg class="memo__dl" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>` : '';

  const timelineHtml = svc.timeline && svc.timeline.length ? `
    <div class="block" data-a style="--d:220ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Восстановление</p>
      <div class="tl">
        ${svc.timeline.map(t => `<div class="tl__item"><span class="tl__day">${t.day}</span><p class="tl__text">${t.text}</p></div>`).join('')}
      </div>
    </div>` : '';

  const faqHtml = svc.faq && svc.faq.length ? `
    <div class="block" data-a style="--d:250ms">
      <p class="block__title"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r=".5" fill="currentColor" stroke="currentColor"/></svg>Частые вопросы</p>
      ${svc.faq.map(f => `<div class="faq"><div class="faq__q">${f.q}<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="faq__a">${f.a}</div></div>`).join('')}
    </div>` : '';

  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/services"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <h1 class="page-head__title">Услуга</h1>
  </header>

  <div class="hero" data-a style="--d:40ms">
    <p class="hero__cat">${svc.category}</p>
    <h2 class="hero__title">${svc.name}</h2>
    <p class="hero__price">от ${svc.price} \u20BD${svc.duration ? ' <span>\u00B7 ' + svc.duration + '</span>' : ''}</p>
  </div>

  <main>
    ${stepsHtml}
    ${checklistHtml}
    ${calcHtml}
    ${memoHtml}
    ${timelineHtml}
    ${faqHtml}

    <div class="cta-wrap" data-a style="--d:280ms">
      <a class="btn btn--green btn--full">Записаться на приём</a>
    </div>

    <div class="bot"></div>
  </main>

  ${TabBar('services')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // FAQ toggle
  container.querySelectorAll('.faq__q').forEach(q => {
    q.addEventListener('click', () => {
      q.classList.toggle('open');
      q.nextElementSibling.classList.toggle('open');
    });
  });

  // Checklist toggle
  container.querySelectorAll('.check__box').forEach(box => {
    box.addEventListener('click', () => box.classList.toggle('done'));
  });
}
