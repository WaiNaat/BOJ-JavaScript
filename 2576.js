const BOARD_SIZE = 5;
const WINNING_BINGO_COUNT = 3;

class Bingo {
  constructor(board) {
    this.board = board;
  }

  erase(number) {
    for (let r = 0; r < BOARD_SIZE; r += 1) {
      for (let c = 0; c < BOARD_SIZE; c += 1) {
        if (this.board[r][c] === number) {
          this.board[r][c] = 0;
          return;
        }
      }
    }
  }

  countBingo() {
    let count = this.countDiagonal();
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      count += this.countRow(i);
      count += this.countCol(i);
    }
    return count;
  }

  countRow(row) {
    for (let c = 0; c < BOARD_SIZE; c += 1) {
      if (this.board[row][c] !== 0) return 0;
    }
    return 1;
  }

  countCol(col) {
    for (let r = 0; r < BOARD_SIZE; r += 1) {
      if (this.board[r][col] !== 0) return 0;
    }
    return 1;
  }

  countDiagonal() {
    let count = 2;
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      if (this.board[i][i] !== 0) {
        count -= 1;
        break;
      }
    }
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      if (this.board[i][BOARD_SIZE - 1 - i] !== 0) {
        count -= 1;
        break;
      }
    }
    return count;
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const board = input.slice(0, 5).map((line) => line.split(' ').map(Number));
const calledNumbers = input.slice(5, 10).join(' ').split(' ').map(Number);

// process
const bingo = new Bingo(board);
let turn;
for (turn = 0; turn < calledNumbers.length; turn += 1) {
  bingo.erase(calledNumbers[turn]);
  if (bingo.countBingo() >= WINNING_BINGO_COUNT) break;
}
turn += 1;

// output
console.log(turn);
