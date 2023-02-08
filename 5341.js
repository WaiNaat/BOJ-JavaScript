const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

input.pop();
const sol = input.map((value) => (value * (value + 1)) / 2);

console.log(sol.join('\n'));
