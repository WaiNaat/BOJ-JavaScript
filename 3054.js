const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const word = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

const board = Array.from(new Array(5), () => new Array(word.length * 4 + 1).fill('.'));

const fillDiamond = (col, char) => {
  board[0][col] = char;
  board[1][col - 1] = char;
  board[1][col + 1] = char;
  board[2][col - 2] = char;
  board[2][col + 2] = char;
  board[3][col - 1] = char;
  board[3][col + 1] = char;
  board[4][col] = char;
};

word.forEach((char, i) => {
  board[2][2 + 4 * i] = char;
  fillDiamond(2 + 4 * i, '#');
});

word.forEach((char, i) => {
  if (i % 3 !== 2) return;

  fillDiamond(2 + 4 * i, '*');
});

console.log(board.map((row) => row.join('')).join('\n'));
