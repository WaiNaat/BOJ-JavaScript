/*
연산들을 행/열별로 통합한다
배열의 각 칸을 한번씩 돌면서 해당 칸에 적용된 1번/2번 연산을 계산한다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[ROW, COL], ...operations] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const rowOperation = new Array(ROW).fill(0);
const colOperation = new Array(COL).fill(0);

operations.forEach(([operator, position, value]) => {
  if (operator === 1) {
    rowOperation[position - 1] += value;
  } else {
    colOperation[position - 1] += value;
  }
});

const sol = Array.from({ length: ROW }).map(() => new Array(COL).fill(0));

for (let r = 0; r < ROW; r += 1) {
  for (let c = 0; c < COL; c += 1) {
    sol[r][c] += rowOperation[r] + colOperation[c];
  }
}

console.log(sol.map((row) => row.join(' ')).join('\n'));
