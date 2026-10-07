// Rebuilds index.html from src/template.html and src/data.js. Run: node build.js
const fs = require('fs'), path = require('path');
const here = __dirname;
const tpl = fs.readFileSync(path.join(here, 'src/template.html'), 'utf8');
const data = fs.readFileSync(path.join(here, 'src/data.js'), 'utf8');
const page = tpl.replace('/*__DATA__*/', () => data);
const i = page.indexOf('<style>');
const html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  page.slice(0, i) + page.slice(i).replace('</style>\n', '</style>\n</head>\n<body>\n') + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(here, 'index.html'), html);
console.log('Wrote index.html');
