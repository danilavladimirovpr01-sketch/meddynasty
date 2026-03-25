export function SearchBar({ placeholder }) {
  return `<div class="search" data-a style="--d:40ms">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <input type="search" placeholder="${placeholder}">
  </div>`;
}
