const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const board = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const canWin = () => {
  for (let r = 0; r < 10; r += 1) {
    for (let c = 0; c < 10; c += 1) {
      if (
        c <= 5 &&
        board[r][c] === 'X' &&
        board[r][c + 1] === 'X' &&
        board[r][c + 2] === 'X' &&
        board[r][c + 3] === 'X' &&
        board[r][c + 4] === 'X'
      ) {
        return true;
      }

      if (
        r <= 5 &&
        board[r][c] === 'X' &&
        board[r + 1][c] === 'X' &&
        board[r + 2][c] === 'X' &&
        board[r + 3][c] === 'X' &&
        board[r + 4][c] === 'X'
      ) {
        return true;
      }

      if (
        r <= 5 &&
        c <= 5 &&
        board[r][c] === 'X' &&
        board[r + 1][c + 1] === 'X' &&
        board[r + 2][c + 2] === 'X' &&
        board[r + 3][c + 3] === 'X' &&
        board[r + 4][c + 4] === 'X'
      ) {
        return true;
      }

      if (
        r <= 5 &&
        c >= 4 &&
        board[r][c] === 'X' &&
        board[r + 1][c - 1] === 'X' &&
        board[r + 2][c - 2] === 'X' &&
        board[r + 3][c - 3] === 'X' &&
        board[r + 4][c - 4] === 'X'
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkAll = () => {
  for (let r = 0; r < 10; r += 1) {
    for (let c = 0; c < 10; c += 1) {
      if (board[r][c] !== '.') continue;
      board[r][c] = 'X';
      if (canWin()) return true;
      board[r][c] = '.';
    }
  }
  return false;
};

console.log(checkAll() ? 1 : 0);
