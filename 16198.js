/*
구슬 10개밖에 없어서 완탐가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...balls] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const gatherEnergy = (balls, energy) => {
  if (balls.length === 2) {
    return energy;
  }

  let max = 0;
  for (let i = 1; i < balls.length - 1; i += 1) {
    const result = gatherEnergy(
      [...balls.slice(0, i), ...balls.slice(i + 1)],
      energy + balls[i - 1] * balls[i + 1],
    );
    max = Math.max(max, result);
  }

  return max;
};

console.log(gatherEnergy(balls, 0));
