/*
bfs
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[dream], ...changes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: dream }).map(() => []);
changes.forEach(([from, to]) => {
  next[from].push(to);
});

const visited = Array.from({ length: dream + 1 });
const queue = {
  list: [],
  front: 0,
  isEmpty() {
    return this.list.length - this.front === 0;
  },
  enqueue(value) {
    this.list.push(value);
  },
  dequeue() {
    if (this.isEmpty()) return undefined;
    this.front += 1;
    return this.list[this.front - 1];
  },
};

queue.enqueue({ state: 1, count: 0 });

let sol = -1;
while (!queue.isEmpty()) {
  const { state, count } = queue.dequeue();

  if (state === dream) {
    sol = count;
    break;
  }
  if (visited[state]) {
    continue;
  }
  visited[state] = true;

  next[state].forEach((nextState) => {
    queue.enqueue({ state: nextState, count: count + 1 });
  });
}

console.log(sol);
