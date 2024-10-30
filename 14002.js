/*
opt(i) := 수열의 i번까지 봤을 때 LIS의 길이
opt(i) = max(opt(k)) + 1, where k < i

opt 업뎃할때 이전 index 기억해서 나중에 더듬어가기

15 20 11 12 13 14 15 30 20 50
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[length], sequence] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const opt = Array.from({ length }, () => 0);
const prev = Array.from({ length }, () => -1);

sequence.forEach((value, index) => {
  let max = 0;
  let maxIndex = -1;

  for (let i = 0; i < index; i += 1) {
    if (sequence[i] < value && max < opt[i]) {
      max = opt[i];
      maxIndex = i;
    }
  }

  opt[index] = max + 1;
  prev[index] = maxIndex;
});

let max = 0;
let maxIndex = -1;

opt.forEach((value, index) => {
  if (value > max) {
    max = value;
    maxIndex = index;
  }
});

const sol = [];
for (let cur = maxIndex; cur !== -1; cur = prev[cur]) {
  sol.push(sequence[cur]);
}

console.log(sol.length);
console.log(...sol.reverse());
