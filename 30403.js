const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, target] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const rainbow = 'roygbiv';
const lower = new Set(rainbow);
const upper = new Set(rainbow.toUpperCase());

[...target].forEach((char) => {
  lower.delete(char);
  upper.delete(char);
});

let result = 0;

if (lower.size === 0) result += 1;
if (upper.size === 0) result += 2;

if (result === 0) {
  console.log('NO!');
} else if (result === 1) {
  console.log('yes');
} else if (result === 2) {
  console.log('YES');
} else {
  console.log('YeS');
}
