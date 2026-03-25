var routes = {};

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function start(appEl) {
  function resolve() {
    try {
      var hash = window.location.hash.slice(1) || '/';
      var handler = routes[hash];
      var params = {};

      if (!handler) {
        var keys = Object.keys(routes);
        for (var i = 0; i < keys.length; i++) {
          var pattern = keys[i];
          var paramNames = [];
          var regexStr = pattern.replace(/:(\w+)/g, function(_, name) {
            paramNames.push(name);
            return '([^/]+)';
          });
          var regex = new RegExp('^' + regexStr + '$');
          var match = hash.match(regex);
          if (match) {
            handler = routes[pattern];
            for (var j = 0; j < paramNames.length; j++) {
              params[paramNames[j]] = match[j + 1];
            }
            break;
          }
        }
      }

      if (handler) {
        appEl.innerHTML = '';
        handler(appEl, params);
        requestAnimationFrame(function() {
          var app = appEl.querySelector('.app');
          if (app) app.classList.add('ready');
        });
      }
    } catch(e) {
      appEl.innerHTML = '<pre style="color:red;padding:20px;font-size:11px;word-break:break-all">ROUTER: ' + e.message + '\n\n' + e.stack + '</pre>';
    }
  }

  window.addEventListener('hashchange', resolve);
  resolve();
}
