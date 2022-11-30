/*
목표지점부터 BFS
*/
// 큐 구현
class Node {
  constructor(row, col, distance) {
    this.r = row;
    this.c = col;
    this.distance = distance;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  enqueue(row, col, distance) {
    const newNode = new Node(row, col, distance);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
      this.length = 1;
      return;
    }
    this.last.next = newNode;
    this.last = newNode;
    this.length += 1;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('Queue Empty');

    const delNode = this.first;

    this.length -= 1;
    this.first = delNode.next;
    if (this.isEmpty()) this.last = null;

    delNode.next = null;
    return delNode;
  }
}

// constant
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// functions
const initialize = (row, col, inputMap) => {
  const map = inputMap;
  let rStart;
  let cStart;

  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < col; c += 1) {
      if (map[r][c] === 2) {
        rStart = r;
        cStart = c;
        map[r][c] = -1;
      } else if (map[r][c] === 1) {
        map[r][c] = -1;
      }
    }
  }

  return { rStart, cStart };
};

const bfs = (rStart, cStart, row, col, inputMap) => {
  const map = inputMap;
  const queue = new Queue();
  queue.enqueue(rStart, cStart, 0);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    const { r, c, distance } = node;

    if (map[r][c] < 0) {
      map[r][c] = distance;

      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (r2 >= 0 && r2 < row && c2 >= 0 && c2 < col && map[r2][c2] === -1) {
          queue.enqueue(r2, c2, distance + 1);
        }
      });
    }
  }
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...map] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const { rStart, cStart } = initialize(row, col, map);
bfs(rStart, cStart, row, col, map);

// output
console.log(map.map((line) => line.join(' ')).join('\n'));
