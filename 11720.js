const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const numbers = input[1].split('').map(Number);
const sol = numbers.reduce((prev, cur) => prev + cur, 0);

console.log(sol);
