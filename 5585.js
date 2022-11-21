const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const changes = [500, 100, 50, 10, 5, 1];
const price = Number(require('fs').readFileSync(inputFile).toString());

const result = changes.reduce(
  (prev, value) => {
    const prevResult = prev;
    prevResult.count += Math.floor(prevResult.money / value);
    prevResult.money %= value;
    return prevResult;
  },
  { money: 1000 - price, count: 0 },
);

console.log(result.count);
