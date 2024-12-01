/*
색깔을 구분할 위치 2개를 고르는 완탐
행별로 하양 파랑 빨강 개수 누적합으로 구해놓으면 빠른 계산 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...grid] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col] = info.split(' ').map(Number);
const wCounts = Array.from({ length: row }, () => 0);
const bCounts = Array.from(wCounts);
const rCounts = Array.from(wCounts);

grid.forEach((row, idx) => {
  wCounts[idx] += wCounts[idx - 1] ?? 0;
  bCounts[idx] += bCounts[idx - 1] ?? 0;
  rCounts[idx] += rCounts[idx - 1] ?? 0;

  Array.from(row).forEach((char) => {
    switch (char) {
      case 'W':
        wCounts[idx] += 1;
        break;
      case 'B':
        bCounts[idx] += 1;
        break;
      case 'R':
        rCounts[idx] += 1;
        break;
      default:
        break;
    }
  });
});

let sol = Infinity;

for (let bStart = 1; bStart < row - 1; bStart += 1) {
  for (let rStart = bStart + 1; rStart < row; rStart += 1) {
    const wChange = bStart * col - wCounts[bStart - 1];
    const bChange = (rStart - bStart) * col - (bCounts[rStart - 1] - bCounts[bStart - 1]);
    const rChange = (row - rStart) * col - (rCounts.at(-1) - rCounts[rStart - 1]);
    const changeCount = wChange + bChange + rChange;
    sol = Math.min(changeCount, sol);
  }
}

console.log(sol);
