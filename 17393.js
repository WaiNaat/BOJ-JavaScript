/*
이분탐색
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[tileCount], inks, viscosities] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sol = inks.map((ink, idx) => {
  let left = idx + 1;
  let right = tileCount;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (viscosities[mid] <= ink) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const rightEnd = left - 1;

  return rightEnd - idx;
});

console.log(sol.join(' '));
