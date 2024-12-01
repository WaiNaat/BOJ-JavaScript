/*
25_000_000 << 완탐가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const ingredients = Array.from(
  inputs
    .reduce((result, [name, amount]) => {
      result.set(name, (result.get(name) ?? 0) + Number(amount));
      return result;
    }, new Map())
    .values(),
);

const hasGoldenRatio = () => {
  for (let i = 0; i < ingredients.length; i += 1) {
    for (let j = i + 1; j < ingredients.length; j += 1) {
      if (
        Math.floor(ingredients[i] * 1.618) === ingredients[j] ||
        ingredients[i] === Math.floor(ingredients[j] * 1.618)
      ) {
        return true;
      }
    }
  }
  return false;
};

console.log(hasGoldenRatio() ? 'Delicious!' : 'Not Delicious...');
