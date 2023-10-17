const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[basketCount], ...operations] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map((value) => Number(value) - 1));

let baskets = Array.from({ length: basketCount + 1 }).map((_, index) => index + 1);

operations.forEach(([start, end]) => {
  baskets = [
    ...baskets.slice(0, start),
    ...baskets.slice(start, end + 1).reverse(),
    ...baskets.slice(end + 1),
  ];
});

console.log(baskets.join(' '));
