import { navigate } from '../router.js';

export function PageHeader({ title, backLink }) {
  return `<header class="page-head" data-a style="--d:0ms">
    <div class="page-head__back" data-back="${backLink}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <h1 class="page-head__title">${title}</h1>
  </header>`;
}

export function attachBackListeners() {
  document.querySelectorAll('.page-head__back[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigate(btn.dataset.back);
    });
  });
}
