/*
(0, 0)은 항상 공기
  여기부터 DFS 돌리면 녹는 치즈를 구할 수 있음
*/
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const AIR = 0;
const CHEESE = 1;

const findMeltingCheese = (board, row, col) => {
  const melt = [];
  const visited = Array.from(new Array(row), () => new Array(col));
  const stack = [[0, 0]];

  while (stack.length > 0) {
    const [r, c] = stack.pop();

    if (!visited[r][c]) {
      visited[r][c] = true;
      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) return;
        if (board[r2][c2] === CHEESE) melt.push([r2, c2]);
        else if (!visited[r2][c2]) stack.push([r2, c2]);
      });
    }
  }

  return melt;
};

const melt = (meltingCheese, board) => {
  const b = board;
  let count = 0;
  meltingCheese.forEach(([r, c]) => {
    if (b[r][c] === CHEESE) {
      b[r][c] = AIR;
      count += 1;
    }
  });
  return count;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let time;
let meltCount;
for (time = 0; ; time += 1) {
  const meltingCheese = findMeltingCheese(board, row, col);
  if (meltingCheese.length === 0) break;
  meltCount = melt(meltingCheese, board);
}

// output
console.log(`${time}\n${meltCount}`);
