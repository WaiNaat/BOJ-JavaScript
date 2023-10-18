const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[startPlayer], ...positions] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map((value) => Number(value) - 1));

const board = Array.from({ length: 3 }).map(() => new Array(3).fill('-'));

const isGameEnded = (mark) => {
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) return true;
    if (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark) return true;
  }

  if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) return true;
  if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) return true;

  return false;
};

let player = startPlayer;
let winner = 0;

for (let i = 0; i < positions.length; i += 1) {
  const [r, c] = positions[i];
  board[r][c] = player;

  if (isGameEnded(player)) {
    winner = player + 1;
    break;
  }
  player = (player + 1) % 2;
}

console.log(winner);
