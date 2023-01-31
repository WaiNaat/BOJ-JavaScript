const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const totalPrice = Number(input[0]);
const items = input.slice(2).map((line) => line.split(' ').map(Number));

const calculatedPrice = items.reduce(
  (previousPrice, [price, amount]) => previousPrice + price * amount,
  0,
);

console.log(totalPrice === calculatedPrice ? 'Yes' : 'No');
