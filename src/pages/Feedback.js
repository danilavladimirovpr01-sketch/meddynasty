import { navigate } from '../router.js';
import { TabBar, attachTabListeners } from '../components/TabBar.js';

export function Feedback(container) {
  container.innerHTML = `<div class="app">
  <header class="page-head" data-a style="--d:0ms">
    <a class="page-head__back" data-nav="/">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <h1 class="page-head__title">Оценка визита</h1>
  </header>

  <div class="fb" id="fbForm" data-a style="--d:40ms">
    <div class="fb__hero">
      <div class="fb__icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
      <h2 class="fb__title">Как прошёл визит?</h2>
      <p class="fb__sub">Мануальная терапия \u00B7 25 марта</p>
    </div>

    <div class="ratings" id="ratings">
      <div class="rate" data-rate="good">
        <div class="rate__emoji"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#5A8F3C" stroke-width="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#5A8F3C" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="1" fill="#5A8F3C"/><circle cx="15" cy="9" r="1" fill="#5A8F3C"/></svg></div>
        <div class="rate__text"><p class="rate__label">Хорошо</p><p class="rate__desc">Всё понравилось</p></div>
        <div class="rate__check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </div>
      <div class="rate" data-rate="ok">
        <div class="rate__emoji"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#D4951A" stroke-width="1.5"/><path d="M8 15h8" stroke="#D4951A" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="1" fill="#D4951A"/><circle cx="15" cy="9" r="1" fill="#D4951A"/></svg></div>
        <div class="rate__text"><p class="rate__label">Нормально</p><p class="rate__desc">В целом ок</p></div>
        <div class="rate__check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </div>
      <div class="rate" data-rate="bad">
        <div class="rate__emoji"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#C4513D" stroke-width="1.5"/><path d="M16 16s-1.5-2-4-2-4 2-4 2" stroke="#C4513D" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="1" fill="#C4513D"/><circle cx="15" cy="9" r="1" fill="#C4513D"/></svg></div>
        <div class="rate__text"><p class="rate__label">Плохо</p><p class="rate__desc">Есть проблемы</p></div>
        <div class="rate__check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </div>
    </div>

    <div class="detail" id="detail">
      <p class="detail__label">Хотите рассказать подробнее?</p>
      <textarea class="detail__area" placeholder="Что понравилось или что можно улучшить..." rows="4"></textarea>
      <p class="detail__hint">Необязательно, но очень поможет нам стать лучше</p>
    </div>

    <div class="cta-wrap" id="ctaWrap" style="display:none">
      <button class="btn btn--green btn--full" id="submitBtn">Отправить</button>
    </div>
  </div>

  <div class="thanks" id="thanks">
    <div class="thanks__ic"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <h2 class="thanks__title">Спасибо!</h2>
    <p class="thanks__text">Ваша оценка поможет нам стать лучше. Если есть вопросы \u2014 мы на связи.</p>
  </div>

  <div class="bot"></div>

  ${TabBar('more')}
</div>`;

  attachTabListeners();

  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Rate selection
  container.querySelectorAll('.rate').forEach(rate => {
    rate.addEventListener('click', () => {
      container.querySelectorAll('.rate').forEach(r => r.classList.remove('sel'));
      rate.classList.add('sel');
      container.querySelector('#detail').classList.add('show');
      container.querySelector('#ctaWrap').style.display = 'block';
    });
  });

  // Submit
  const submitBtn = container.querySelector('#submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      container.querySelector('#fbForm').style.display = 'none';
      container.querySelector('#thanks').classList.add('show');
    });
  }
}
