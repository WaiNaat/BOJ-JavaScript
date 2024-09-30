/*
bfs
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [size, startR, startC, endR, endC] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const directions = [
  [-2, -1],
  [-2, 1],
  [0, -2],
  [0, 2],
  [2, -1],
  [2, 1],
];
const q = {
  list: [],
  first: 0,
  length: 0,
  enqueue(val) {
    this.list.push(val);
    this.length += 1;
  },
  dequeue() {
    if (this.length === 0) return undefined;
    this.length -= 1;
    this.first += 1;
    return this.list[this.first - 1];
  },
};

q.enqueue([startR, startC, 0]);

const visited = Array.from({ length: size }, () => Array.from({ length: size }));
let sol = -1;
while (q.length > 0) {
  const [r, c, moveCount] = q.dequeue();

  if (visited[r][c]) {
    continue;
  }
  visited[r][c] = true;

  if (r === endR && c === endC) {
    sol = moveCount;
    break;
  }

  directions.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= size || c2 < 0 || c2 >= size || visited[r2][c2]) {
      return;
    }

    q.enqueue([r2, c2, moveCount + 1]);
  });
}

console.log(sol);
