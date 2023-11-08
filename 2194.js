/*
각 칸별로 유닛의 좌상단이 해당 칸에 있을 수 있는지 여부 계산
있을 수 있는 칸 기준으로 bfs
다행히 시작점/끝점은 좌상단으로 줌
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col, unitRow, unitCol], ...walls] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const [endR, endC] = walls.pop();
const [startR, startC] = walls.pop();

const cannotPass = new Set();

walls.forEach(([r, c]) => {
  for (let dr = -(unitRow - 1); dr <= 0; dr += 1) {
    for (let dc = -(unitCol - 1); dc <= 0; dc += 1) {
      cannotPass.add(`${r + dr},${c + dc}`);
    }
  }
});

const q = {
  list: [[startR, startC, 0]],
  length: 1,
  start: 0,
  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  },
  dequeue() {
    if (!this.length) return null;
    this.start += 1;
    this.length -= 1;
    return this.list[this.start - 1];
  },
};

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = new Set();
let sol = -1;

while (q.length) {
  const [r, c, moves] = q.dequeue();

  if (visited.has(`${r},${c}`)) continue;
  visited.add(`${r},${c}`);

  if (r === endR && c === endC) {
    sol = moves;
    break;
  }

  DIRECTIONS.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (
      r2 <= 0 ||
      r2 + unitRow - 1 > row ||
      c2 <= 0 ||
      c2 + unitCol - 1 > col ||
      visited.has(`${r2},${c2}`) ||
      cannotPass.has(`${r2},${c2}`)
    ) {
      return;
    }

    q.enqueue([r2, c2, moves + 1]);
  });
}

console.log(sol);
