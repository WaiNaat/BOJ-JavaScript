/*
(0, 0)은 항상 공기
  여기부터 BFS 돌리면 녹는 치즈를 구할 수 있음
*/
class Node {
  constructor(r, c, time) {
    this.r = r;
    this.c = c;
    this.time = time;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(r, c, time) {
    const newNode = new Node(r, c, time);
    if (this.length === 0) this.first = newNode;
    else this.last.next = newNode;
    this.last = newNode;
    this.length += 1;
  }

  dequeue() {
    if (this.length === 0) throw new Error('Queue Empty');
    const { r, c, time } = this.first;

    this.length -= 1;
    if (this.length === 0) this.last = null;
    this.first = this.first.next;

    return { r, c, time };
  }
}

const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let time;
let meltCount;
for (time = 0; ; time += 1) {
  const melt = [];

  const visited = Array.from(new Array(row), () => new Array(col));
  const q = new Queue();
  q.enqueue(0, 0);

  while (q.length > 0) {
    const { r, c } = q.dequeue();

    if (!visited[r][c]) {
      visited[r][c] = true;

      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) return;

        if (board[r2][c2] === 1) melt.push([r2, c2]);
        else if (!visited[r2][c2]) q.enqueue(r2, c2);
      });
    }
  }

  if (melt.length === 0) break;
  let count = 0;
  melt.forEach(([r, c]) => {
    if (board[r][c] === 1) {
      board[r][c] = 0;
      count += 1;
    }
  });
  meltCount = count;
}

// output
console.log(`${time}\n${meltCount}`);
