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
js = result.code;

// Write transpiled JS as separate file
writeFileSync('dist/app.js', js);

const html = [
  '<!DOCTYPE html>',
  '<html lang="ru">',
  '<head>',
  '<meta charset="UTF-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">',
  '<title>Династия</title>',
  '<meta name="theme-color" content="#7F9540">',
  '<script src="https://telegram.org/js/telegram-web-app.js"><' + '/script>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
  '<style>' + css + '</style>',
  '</head>',
  '<body>',
  '<div id="root"><p style="padding:40px;text-align:center;font-family:sans-serif;color:#999">Загрузка...</p></div>',
  '<script>',
  'try{window.Telegram.WebApp.ready();window.Telegram.WebApp.expand()}catch(e){}',
  'window.onerror=function(m,s,l,c){document.getElementById("root").innerHTML="<pre style=color:red;padding:20px>"+m+"\\nLine:"+l+":"+c+"</pre>"}',
  '<' + '/script>',
  '<script src="app.js"><' + '/script>',
  '</body>',
  '</html>'
].join('\n');

writeFileSync('dist/index.html', html);
console.log('Done: JS=' + (js.length/1024).toFixed(1) + 'KB CSS=' + (css.length/1024).toFixed(1) + 'KB → separate file');
