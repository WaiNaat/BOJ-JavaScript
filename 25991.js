const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...values] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const size = values.reduce((prev, cur) => prev + cur ** 3, 0);
const sol = Math.cbrt(size);

console.log(sol);
