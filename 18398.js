const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUIT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sol = inputs
  .filter(([, another]) => Number.isInteger(another))
  .map(([one, another]) => `${one + another} ${one * another}`);

console.log(sol.join('\n'));
