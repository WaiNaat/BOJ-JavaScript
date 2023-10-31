const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[basketCount], ...operations] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const baskets = Array.from({ length: basketCount + 1 }).map((_, index) => index);

operations.forEach(([one, another]) => {
  const temp = baskets[one];
  baskets[one] = baskets[another];
  baskets[another] = temp;
});

console.log(baskets.slice(1).join(' '));
