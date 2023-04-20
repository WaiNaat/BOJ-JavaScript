const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [boardSizeString, commands] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const boardSize = Number(boardSizeString);
const DIRECTIONS = {
  L: [0, -1, '-'],
  R: [0, 1, '-'],
  U: [-1, 0, '|'],
  D: [1, 0, '|'],
};

const board = Array.from(new Array(boardSize), () => new Array(boardSize).fill('.'));

const updateBoard = (r, c, mark) => {
  if (board[r][c] === mark) return;
  if (board[r][c] === '.') board[r][c] = mark;
  else board[r][c] = '+';
};

const robot = {
  row: 0,
  col: 0,

  move(direction) {
    const [dr, dc, mark] = DIRECTIONS[direction];

    const r2 = this.row + dr;
    const c2 = this.col + dc;

    if (r2 < 0 || r2 >= boardSize || c2 < 0 || c2 >= boardSize) return;

    updateBoard(this.row, this.col, mark);
    updateBoard(r2, c2, mark);

    this.row = r2;
    this.col = c2;
  },
};

commands?.trim().split('').forEach((direction) => robot.move(direction));

console.log(board.map((row) => row.join('')).join('\n'));
