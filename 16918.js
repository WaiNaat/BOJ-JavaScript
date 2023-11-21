/*
그냥 구현
각 칸에 폭탄이 설치된 시간을 적어두기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...grid] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col, targetTime] = info.split(' ').map(Number);
const board = grid.map((line) => line.split('').map((char) => (char === '.' ? null : 0)));
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

for (let time = 2; time <= targetTime; time += 1) {
  if (time % 2 === 0) {
    for (let r = 0; r < row; r += 1) {
      for (let c = 0; c < col; c += 1) {
        if (board[r][c] === null) board[r][c] = time;
      }
    }
  } else {
    const boom = [];

    for (let r = 0; r < row; r += 1) {
      for (let c = 0; c < col; c += 1) {
        if (board[r][c] === time - 3) {
          boom.push([r, c]);
        }
      }
    }

    boom.forEach(([r, c]) => {
      board[r][c] = null;
      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;

        if (r2 < 0 || c2 < 0 || r2 >= row || c2 >= col) return;

        board[r2][c2] = null;
      });
    });
  }
}

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === null) board[r][c] = '.';
    else board[r][c] = 'O';
  }
}

console.log(board.map((row) => row.join('')).join('\n'));
