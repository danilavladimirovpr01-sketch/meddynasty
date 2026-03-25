export function Chips({ items, active, delay }) {
  const d = delay || 70;
  return `<nav class="chips" data-a style="--d:${d}ms">${items.map((item, i) =>
    `<span class="chip${i === active ? ' is-on' : ''}" data-chip="${i}">${item}</span>`
  ).join('')}</nav>`;
}

export function attachChipListeners(onChange) {
  document.querySelectorAll('.chip[data-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-chip]').forEach(c => c.classList.remove('is-on'));
      chip.classList.add('is-on');
      if (onChange) onChange(parseInt(chip.dataset.chip));
    });
  });
}
