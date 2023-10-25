/*
점프
- 모든 잉크 소모
- 맨해튼 거리?가 소모한 잉크 이하인 공간 내의 장애물이 전부 물든다
- 색깔은 덮어씌워진다

잉크 색
- 대충 돌고 돈다는 뜻

칸 1만개 * 명령 100개
  -> bfs 없어도 물들이기 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, palette, ...rest] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n');

const [, boardSize] = info.split(' ').map(Number);
const commands = rest.pop().split('');
const board = rest.map((row) => row.split(''));

const canMove = (r, c) =>
  r >= 0 &&
  r < boardSize &&
  c >= 0 &&
  c < boardSize &&
  (board[r][c] === '@' || board[r][c] === '.');

const isObstacle = (r, c) => board[r][c] !== '@' && board[r][c] !== '.';

let position = (() => {
  for (let r = 0; r < boardSize; r += 1) {
    for (let c = 0; c < boardSize; c += 1) {
      if (board[r][c] === '@') return [r, c];
    }
  }
  return null;
})();

let ink = 0;
let color = 0;

const DIRECTIONS = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

commands.forEach((command) => {
  if (command === 'j') {
    ink += 1;
    return;
  }

  const [r, c] = position;

  if (command === 'J') {
    for (let r2 = 0; r2 < boardSize; r2 += 1) {
      for (let c2 = 0; c2 < boardSize; c2 += 1) {
        if (Math.abs(r - r2) + Math.abs(c - c2) <= ink && board[r2][c2] && isObstacle(r2, c2)) {
          board[r2][c2] = palette[color];
        }
      }
    }
    color = (color + 1) % palette.length;
    ink = 0;
    return;
  }

  const [dr, dc] = DIRECTIONS[command];
  const r2 = r + dr;
  const c2 = c + dc;

  if (!canMove(r2, c2)) return;

  board[r][c] = '.';
  board[r2][c2] = '@';
  position = [r2, c2];
});

console.log(board.map((row) => row.join('')).join('\n'));
