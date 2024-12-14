/*
완탐
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, chickenCount], ...likes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

function* chickenGenerator() {
  for (let i = 0; i < chickenCount; i += 1) {
    for (let j = i + 1; j < chickenCount; j += 1) {
      for (let k = j + 1; k < chickenCount; k += 1) {
        yield [i, j, k];
      }
    }
  }
}

const sol = Math.max(
  ...Array.from(chickenGenerator()).map((chickens) => {
    return likes
      .map((member) => Math.max(...chickens.map((chicken) => member[chicken])))
      .reduce((sum, cur) => sum + cur, 0);
  }),
);

console.log(sol);
