/*
opt(i) := i번 칸에서 출발했을 때 밟는 칸의 수
height(i) := i번 칸 점프대의 높이
opt(i) = opt(i + height(i) + 1) + 1
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [length, ...jumpPads] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const counts = new Array(length);

for (let i = length - 1; i >= 0; i -= 1) {
  counts[i] = 1 + (counts[i + jumpPads[i] + 1] ?? 0);
}

console.log(counts.join(' '));
