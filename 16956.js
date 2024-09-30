/*
울타리 개수 제한이 없음
그냥 모든 양 사방에 울타리 치고
늑대부터 출발하는 dfs

를 할 필요가 없이
그냥 모든 빈공간에 울타리를 친다고 하면
늑대랑 양이랑 애초에 인접한게 아니면 만날수가 없음
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...pasture] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col] = info.split(' ').map(Number);
const board = pasture.map((row) => row.split(''));
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let hasAdjacentSheep = false;

for (let r = 0; r < row && !hasAdjacentSheep; r += 1) {
  for (let c = 0; c < col && !hasAdjacentSheep; c += 1) {
    switch (board[r][c]) {
      case 'W': {
        hasAdjacentSheep ||= directions.some(([dr, dc]) => {
          const r2 = r + dr;
          const c2 = c + dc;
          return r2 >= 0 && r2 < row && c2 >= 0 && c2 < col && board[r2][c2] === 'S';
        });
        break;
      }
      case '.':
        board[r][c] = 'D';
        break;
      default:
        break;
    }
  }
}

console.log(hasAdjacentSheep ? 0 : 1);
if (!hasAdjacentSheep) {
  console.log(board.map((row) => row.join('')).join('\n'));
}
