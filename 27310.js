const target = require('fs').readFileSync(0, 'utf-8').toString().trim();

const underscoreCount = Array.from(target).filter((char) => char === '_').length;
const sol = target.length + 2 + underscoreCount * 5;

console.log(sol);
