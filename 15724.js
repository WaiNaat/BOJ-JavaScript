/*
누적합
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const land = inputs.slice(0, row);
const questions = inputs.slice(1 + row);

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    land[r][c] += (land[r - 1]?.[c] ?? 0) + (land[r][c - 1] ?? 0) - (land[r - 1]?.[c - 1] ?? 0);
  }
}

const sol = questions.map((coordinates) => {
  const [r1, c1, r2, c2] = coordinates.map((val) => val - 1);
  return (
    land[r2][c2] -
    (land[r1 - 1]?.[c2] ?? 0) -
    (land[r2][c1 - 1] ?? 0) +
    (land[r1 - 1]?.[c1 - 1] ?? 0)
  );
});

console.log(sol.join('\n'));
