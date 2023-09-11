/*  
중앙 잡고
1 2 2 4 4 6 6 8 8 ... 이렇게 그리면 됨
맨 마지막에는 2 빼고 그리기

1 6 10 14 ... 까지 그리면 됨

중앙 좌표: (size-1)*2 행 size*2 열
  단, size=1이면 0열
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const size = Number(require('fs').readFileSync(INPUT_FILE).toString());

const maxLength = size > 1 ? size * 4 - 2 : 1;
const board = Array.from({ length: maxLength + 1 }, () => new Array(maxLength - 1).fill(' '));
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let currentDirection = 0;
let r = size > 1 ? size * 2 : 0;
let c = (size - 1) * 2;

board[r][c] = '*';

for (let length = 2; length <= maxLength; length += 2) {
  for (let repeat = 0; repeat < 2; repeat += 1) {
    const [dr, dc] = DIRECTIONS[currentDirection];

    for (let line = 0; line < length; line += 1) {
      r += dr;
      c += dc;
      board[r][c] = '*';
    }

    currentDirection = (currentDirection + 1) % 4;
  }
}

if (size > 1) {
  board[0].pop();
  board[0].pop();
}

console.log(board.map((row) => row.join('').trim()).join('\n'));
