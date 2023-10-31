const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const board = inputs.slice(0, 5);
const said = [null].concat(...inputs.slice(5));

const countBingo = () => {
  let count = 0;

  for (let i = 0; i < 5; i += 1) {
    if (
      board[i][0] === null &&
      board[i][1] === null &&
      board[i][2] === null &&
      board[i][3] === null &&
      board[i][4] === null
    ) {
      count += 1;
    }

    if (
      board[0][i] === null &&
      board[1][i] === null &&
      board[2][i] === null &&
      board[3][i] === null &&
      board[4][i] === null
    ) {
      count += 1;
    }
  }

  if (
    board[0][0] === null &&
    board[1][1] === null &&
    board[2][2] === null &&
    board[3][3] === null &&
    board[4][4] === null
  ) {
    count += 1;
  }

  if (
    board[0][4] === null &&
    board[1][3] === null &&
    board[2][2] === null &&
    board[3][1] === null &&
    board[4][0] === null
  ) {
    count += 1;
  }

  return count;
};

let turn;

for (turn = 1; turn <= 25; turn += 1) {
  for (let r = 0; r < 5; r += 1) {
    const idx = board[r].findIndex((value) => value === said[turn]);
    if (idx > -1) board[r][idx] = null;
  }
  if (countBingo() >= 3) break;
}

console.log(turn);
