const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const A = inputs.slice(0, row);
const B = inputs.slice(row);

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    A[r][c] += B[r][c];
  }
}

const sol = [];
A.forEach((line) => sol.push(line.join(' ')));

console.log(sol.join('\n'));
