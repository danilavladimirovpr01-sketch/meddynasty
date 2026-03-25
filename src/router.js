const routes = {};

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function start(appEl) {
  function resolve() {
    const hash = window.location.hash.slice(1) || '/';
    let handler = routes[hash];
    let params = {};

    if (!handler) {
      for (const [pattern, h] of Object.entries(routes)) {
        const regex = new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$');
        const match = hash.match(regex);
        if (match) {
          handler = h;
          params = match.groups || {};
          break;
        }
      }
    }

    if (handler) {
      appEl.innerHTML = '';
      handler(appEl, params);
      requestAnimationFrame(() => {
        appEl.querySelector('.app')?.classList.add('ready');
      });
    }
  }

  window.addEventListener('hashchange', resolve);
  resolve();
}
