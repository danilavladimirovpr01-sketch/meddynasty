import { readFileSync, writeFileSync, readdirSync } from 'fs';

const distDir = 'dist/assets/';
const files = readdirSync(distDir);
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));

let js = readFileSync(distDir + jsFile, 'utf8');
const css = cssFile ? readFileSync(distDir + cssFile, 'utf8') : '';

// Replace backtick strings with double quotes for Telegram WebView compat
js = js.replace(/`([^`]*)`/g, function(match, content) {
  if (content.indexOf('${') !== -1) return match;
  return '"' + content.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
});

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
  '<div id="root"></div>',
  '<script>try{' + js + '}catch(e){document.getElementById("root").innerHTML="<pre style=color:red;padding:20px>"+e.message+"</pre>"}<' + '/script>',
  '</body>',
  '</html>'
].join('\n');

writeFileSync('dist/index.html', html);
console.log('Done: JS=' + (js.length/1024).toFixed(1) + 'KB CSS=' + (css.length/1024).toFixed(1) + 'KB');
