/*
dfs인데 빙판을 밟으면 미끄러져야함
사방이 산으로 막혀있나? "산으로 둘러싸인 고리분지"
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => [...line]);

const [row, col] = info.join('').split(' ').map(Number);
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
const stack = [];
const visited = Array.from({ length: row }).map(() => new Array(col));

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === 'W') {
      stack.push([r, c]);
    }
  }
}

while (stack.length) {
  const [r, c] = stack.pop();

  if (visited[r][c]) continue;
  visited[r][c] = true;

  DIRECTIONS.forEach(([dr, dc]) => {
    let r2 = r + dr;
    let c2 = c + dc;

    if (board[r2][c2] === '#') return;

    while (board[r2][c2] === '+') {
      r2 += dr;
      c2 += dc;
    }

    if (board[r2][c2] === '#') {
      r2 -= dr;
      c2 -= dc;
    }

    stack.push([r2, c2]);
  });
}

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === '.' && !visited[r][c]) board[r][c] = 'P';
  }
}

console.log(board.map((row) => row.join('')).join('\n'));
