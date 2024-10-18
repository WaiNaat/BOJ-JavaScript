/*
아 한번 낚아도 물고기가 안 없어지는구나 이러면 쉽지

opt(i, j):= (i,j)에 낚싯대를 던졌을 때 낚아올릴 수 있는 물고기의 수
fish(i, j):= (i,j)의 물고기 수
opt(i, j) = opt(i-1, j-1) + opt(i-1, j) - opt(i-1, j-2) + fish(i, j)
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const fish = inputs.slice(0, row);
const opt = Array.from({ length: row }, () => Array.from({ length: col }, () => 0));

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    opt[r][c] =
      (opt[r - 1]?.[c - 1] ?? 0) + (opt[r - 1]?.[c] ?? 0) - (opt[r - 2]?.[c - 1] ?? 0) + fish[r][c];
  }
}

const gatherings = inputs.slice(row).map(([r, c]) => opt[r - 1][c - 1]);

console.log(gatherings.join('\n'));
