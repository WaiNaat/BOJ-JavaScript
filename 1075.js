const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [value, dividend] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

const start = Math.floor(value / 100) * 100;
let lastTwoNumbers = 0;

for (
  lastTwoNumbers = 0;
  (start + lastTwoNumbers) % dividend !== 0;
  lastTwoNumbers += 1
) {}

console.log(lastTwoNumbers.toString().padStart(2, '0'));
