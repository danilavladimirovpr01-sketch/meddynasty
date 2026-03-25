import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { transformSync } from '@swc/core';

const distDir = 'dist/assets/';
const files = readdirSync(distDir);
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));

let js = readFileSync(distDir + jsFile, 'utf8');
const css = cssFile ? readFileSync(distDir + cssFile, 'utf8') : '';

// Transpile to ES5: converts template literals, arrow functions, let/const, etc.
const result = transformSync(js, {
  jsc: {
    target: 'es5',
    parser: { syntax: 'ecmascript' },
  },
  minify: true,
});
js = 'window.__OK=1;' + result.code;

writeFileSync('dist/app.js', js);

// DEBUG: deploy bare minimum test page to check if Telegram WebView works at all
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://telegram.org/js/telegram-web-app.js"><\/script>
</head>
<body style="font-family:sans-serif;padding:20px;background:#F7F6F2">
<h1 style="color:#7F9540">Test v3</h1>
<div id="log"></div>
<script>
var log = document.getElementById("log");
function add(msg) { log.innerHTML += "<p>" + msg + "</p>"; }
add("1. JS works");
add("2. Telegram: " + (typeof window.Telegram));
try {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    add("3. ready() OK");
    add("4. Platform: " + window.Telegram.WebApp.platform);
    add("5. Version: " + window.Telegram.WebApp.version);
  } else {
    add("3. No WebApp");
  }
} catch(e) { add("ERROR: " + e.message); }
add("6. DONE - " + new Date().toISOString());
<\/script>
</body>
</html>`;


writeFileSync('dist/index.html', html);
console.log('Done: JS=' + (js.length/1024).toFixed(1) + 'KB CSS=' + (css.length/1024).toFixed(1) + 'KB → separate file');
