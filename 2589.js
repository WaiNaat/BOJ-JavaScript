/*
bfs
지도가 커봐야 50*50이니까
모든 육지 각 칸에 대해서 bfs돌려도 충분할듯?
*/
class Node {
  constructor(r, c, distance) {
    this.r = r;
    this.c = c;
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

  enqueue(r, c, distance) {
    const newNode = new Node(r, c, distance);

    if (this.isEmpty()) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;
    this.length += 1;
  }

  dequeue() {
    const { r, c, distance } = this.first;

    this.length -= 1;
    if (this.length === 0) this.last = null;
    this.first = this.first.next;

    return { r, c, distance };
  }
}

const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const bfs = (map, row, col, startR, startC) => {
  const visited = Array.from(new Array(row), () => new Array(col));
  const q = new Queue();
  q.enqueue(startR, startC, 0);
  visited[startR][startC] = true;

  let maxDistance;
  while (!q.isEmpty()) {
    const { r, c, distance } = q.dequeue();

    maxDistance = distance;

    DIRECTIONS.forEach(([dr, dc]) => {
      const r2 = r + dr;
      const c2 = c + dc;

      if (r2 >= 0 && r2 < row && c2 >= 0 && c2 < col && map[r2][c2] === 'L' && !visited[r2][c2]) {
        visited[r2][c2] = true;
        q.enqueue(r2, c2, distance + 1);
      }
    });
  }

  return maxDistance;
};

const findMaxDistance = (map, row, col) => {
  let max = 0;
  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < col; c += 1) {
      if (map[r][c] === 'L') {
        max = Math.max(bfs(map, row, col, r, c), max);
      }
    }
  }
  return max;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [rowCol, ...map] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const [row, col] = rowCol.split(' ').map(Number);

// process & output
console.log(findMaxDistance(map, row, col));
