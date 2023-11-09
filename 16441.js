// 틀렸습니다
// 1퍼틀인데 왠진모름;;

/*
dfs인데 이동방향도 기억해야함
사방이 산으로 막혀있나? "산으로 둘러싸인 고리분지"
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...board] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => [...line]);

const [row, , col] = info.map(Number);
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
const stack = [];
const visited = new Set();
const isSafe = Array.from({ length: row }).map(() => new Array(col).fill(true));

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === 'W') {
      stack.push([r, c, 0], [r, c, 1], [r, c, 2], [r, c, 3]);
    }
  }
}

while (stack.length) {
  const [r, c, d] = stack.pop();

  if (board[r][c] === '#' || visited.has(`${r},${c},${d}`)) continue;
  visited.add(`${r},${c},${d}`);
  isSafe[r][c] = false;

  if (board[r][c] === '.') {
    DIRECTIONS.forEach(([dr, dc], index) => {
      const r2 = r + dr;
      const c2 = c + dc;

      if (board[r2][c2] === '#') return;

      stack.push([r2, c2, index]);
    });
  } else {
    const [dr, dc] = DIRECTIONS[d];
    const r2 = r + dr;
    const c2 = c + dc;

    if (board[r2][c2] === '#') {
      stack.push([r, c, 0], [r, c, 1], [r, c, 2], [r, c, 3]);
    }

    stack.push([r2, c2, d]);
  }
}

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (board[r][c] === '.' && isSafe[r][c]) board[r][c] = 'P';
  }
}

console.log(board.map((row) => row.join('')).join('\n'));
