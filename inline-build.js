import { readFileSync, writeFileSync, readdirSync } from 'fs';

const distDir = 'dist/assets/';
const files = readdirSync(distDir);
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));

let js = readFileSync(distDir + jsFile, 'utf8');
const css = cssFile ? readFileSync(distDir + cssFile, 'utf8') : '';

// Replace backtick strings with regular quotes for WebView compatibility
// Vite/rolldown minifies strings to backticks which some WebViews can't handle
js = js.replace(/`([^`]*)`/g, function(match, content) {
  // If contains ${, it's a real template literal — keep it
  if (content.indexOf('${') !== -1) return match;
  // Otherwise replace with double quotes, escaping inner quotes
  var escaped = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return '"' + escaped + '"';
});

const html = '<!DOCTYPE html>\\n' +
'<html lang="ru">\\n' +
'<head>\\n' +
'<meta charset="UTF-8">\\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">\\n' +
'<title>Династия</title>\\n' +
'<meta name="theme-color" content="#7F9540">\\n' +
'<script src="https://telegram.org/js/telegram-web-app.js"><\\/script>\\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\\n' +
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\\n' +
'<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">\\n' +
'<style>' + css + '</style>\\n' +
'</head>\\n' +
'<body>\\n' +
'<div id="root"></div>\\n' +
'<script>\\n' +
'try{\\n' + js + '\\n}catch(e){document.getElementById("root").innerHTML="<pre style=color:red;padding:20px>"+e.message+"\\\\n"+e.stack+"</pre>"}\\n' +
'<\\/script>\\n' +
'</body>\\n' +
'</html>';

writeFileSync('dist/index.html', html);
console.log('Inlined: JS=' + (js.length/1024).toFixed(1) + 'KB, CSS=' + (css.length/1024).toFixed(1) + 'KB');
