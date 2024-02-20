/*
각 칸마다 방문할 때 어떤 방향이었는지를 같이 기억해야 한다
같은 칸에 같은 방향으로 방문하면 가두기 성공
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...grid] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const isPrison = (startR, startC) => {
  let d = 0;
  let r = startR;
  let c = startC;
  const visited = new Set();

  while (!visited.has(`${r} ${c} ${d}`)) {
    visited.add(`${r} ${c} ${d}`);

    const [dr, dc] = DIRECTIONS[d];
    const r2 = r + dr * grid[r][c];
    const c2 = c + dc * grid[r][c];

    if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) {
      return false;
    }

    r = r2;
    c = c2;
    d += 1;
    d %= 4;
  }

  return true;
};

const availableRows = [];

for (let r = 0; r < row; r += 1) {
  if (isPrison(r, 0)) {
    availableRows.push(r + 1);
  }
}

console.log(availableRows.length);
if (availableRows.length > 0) {
  console.log(availableRows.join(' '));
}
