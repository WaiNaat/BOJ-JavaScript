const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...data] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const prices = [];

data.forEach(([dogCount, neededFood, price]) => {
  prices.push((dogCount * neededFood * price).toFixed(2));
});

console.log(prices.map((price) => `$${price}`).join('\n'));
