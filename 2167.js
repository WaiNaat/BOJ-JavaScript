/*
누적 합
일단 가로누적합 구하고
그걸로 다시 세로누적합 구하면
(0,0)~(i,j)누적합 완성
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const [ROW, COL] = input[0].split(' ').map(Number);
const matrix = input.slice(1, 1 + ROW).map((line) => line.split(' ').map(Number));
const positions = input.slice(2 + ROW).map((line) => line.split(' ').map((value) => Number(value) - 1));

// process
for (let r = 0; r < ROW; r += 1) {
  for (let c = 1; c < COL; c += 1) {
    matrix[r][c] += matrix[r][c - 1];
  }
}

for (let r = 1; r < ROW; r += 1) {
  for (let c = 0; c < COL; c += 1) {
    matrix[r][c] += matrix[r - 1][c];
  }
}

const sol = [];
positions.forEach(([rStart, cStart, rEnd, cEnd]) => {
  let sum = matrix[rEnd][cEnd];
  if (cStart > 0) sum -= matrix[rEnd][cStart - 1];
  if (rStart > 0) sum -= matrix[rStart - 1][cEnd];
  if (rStart > 0 && cStart > 0) sum += matrix[rStart - 1][cStart - 1];
  sol.push(sum);
});

// output
console.log(sol.join('\n'));
