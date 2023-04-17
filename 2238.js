const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const auctioneers = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(' '))
  .map(([name, value]) => [name, Number(value)]);

const prices = {};
auctioneers.forEach(([name, value]) => {
  if (!Object.prototype.hasOwnProperty.call(prices, value)) {
    prices[value] = [0, name];
  }

  prices[value][0] += 1;
});

const [[price, [_, personName]]] = Object.entries(prices).sort((a, b) => {
  const aCount = a[1][0];
  const aMoney = Number(a[0]);

  const bCount = b[1][0];
  const bMoney = Number(b[0]);

  if (aCount !== bCount) return aCount - bCount;
  return aMoney - bMoney;
});

console.log(personName, price);
