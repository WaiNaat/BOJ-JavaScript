const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const board = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

let count = 0;

for (let row = 0; row < 8; row += 2) {
  for (let col = 0; col < 8; col += 2) {
    if (board[row][col] === 'F') count += 1;
  }
}

for (let row = 1; row < 8; row += 2) {
  for (let col = 1; col < 8; col += 2) {
    if (board[row][col] === 'F') count += 1;
  }
}

console.log(count);
