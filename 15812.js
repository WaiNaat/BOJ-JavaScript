/*
장애물이 없음 -> bfs 굳이 안해도 맨해튼 거리 기반으로 시간 계산 가능
독주머니 2개 위치 고르기 + 각 마을별로 중독되는 시간 구하기
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...planet] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col] = info.split(' ').map(Number);
const voids = [];
const towns = [];

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (planet[r][c] === '0') {
      voids.push([r, c]);
    } else {
      towns.push([r, c]);
    }
  }
}

let sol = Infinity;

for (let i = 0; i < voids.length; i += 1) {
  for (let j = i + 1; j < voids.length; j += 1) {
    const [r1, c1] = voids[i];
    const [r2, c2] = voids[j];
    const times = Array.from({ length: towns.length }, () => Infinity);

    towns.forEach(([r, c], town) => {
      const d1 = Math.abs(r - r1) + Math.abs(c - c1);
      const d2 = Math.abs(r - r2) + Math.abs(c - c2);
      times[town] = Math.min(d1, d2);
    });

    sol = Math.min(sol, Math.max(...times));
  }
}

console.log(sol);
