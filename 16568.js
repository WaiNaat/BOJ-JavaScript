/*
opt(i) := 앞에 i명이 있을 때 걸리는 최소 시간
opt(i) =
  opt(i-1)
  opt(i-1-a)
  opt(i-1-b)
  셋 중 최솟값에 1초를 더한 값
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [total, teleportA, teleportB] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

const time = [0, 1];

for (let i = 2; i <= total; i += 1) {
  time.push(1 + Math.min(
    time[i - 1],
    time[i - 1 - teleportA] ?? Infinity,
    time[i - 1 - teleportB] ?? Infinity,
  ));
}

console.log(time[total]);
