/*
DP
opt(i, j, 방향) := i번 열 j번 행에 도착했고 마지막 이동경로가 '방향'일 때 최소 연료
opt(i, j, 왼쪽) 이 주어지면 opt(i+1, j+1, 오른쪽)과 opt(i+1, j, 가운데) 로 이동이 가능함.
비슷한 방식으로 opt(i, j, 오른쪽)과 opt(i, j, 가운데)가 어디로 이동이 가능한지 구할 수 있음.

opt(i+1, ?, ?) 계산에 opt(i, ?, ?)만 쓰이므로 next, cur 두 가지 배열로 처리 가능.
*/
const LEFT = 0;
const MID = 1;
const RIGHT = 2;

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...space] = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let cur = Array.from(new Array(3), () => [...space[0]]);

for (let r = 1; r < row; r += 1) {
  const next = Array.from(new Array(3), () => new Array(col).fill(Infinity));

  for (let c = 0; c < col; c += 1) {
    if (c > 0) next[LEFT][c - 1] = Math.min(cur[MID][c], cur[RIGHT][c], next[LEFT][c - 1]);
    next[MID][c] = Math.min(cur[LEFT][c], cur[RIGHT][c], next[MID][c]);
    if (c + 1 < col) next[RIGHT][c + 1] = Math.min(cur[MID][c], cur[LEFT][c], next[RIGHT][c + 1]);
  }

  for (let c = 0; c < col; c += 1) {
    for (let direction = 0; direction < 3; direction += 1) {
      next[direction][c] += space[r][c];
    }
  }

  cur = next;
}

// output
console.log(
  cur.reduce((result, currentLine) => Math.min(result, Math.min(...currentLine)), Infinity),
);
