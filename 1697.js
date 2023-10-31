const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [start, end] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

class Queue {
  list = [];
  left = 0;
  length = 0;

  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  }

  dequeue() {
    if (!this.length) return null;
    this.left += 1;
    this.length -= 1;
    return this.list[this.left - 1];
  }
}

const q = new Queue();
const visited = new Array(100_001);
q.enqueue([start, 0]);

let sol;

while (q.length) {
  const [cur, distance] = q.dequeue();

  if (visited[cur]) continue;
  visited[cur] = true;

  if (cur === end) {
    sol = distance;
    break;
  }

  if (!visited[cur + 1] && cur < 100_000) q.enqueue([cur + 1, distance + 1]);
  if (!visited[cur - 1] && cur > 0) q.enqueue([cur - 1, distance + 1]);
  if (!visited[cur * 2] && cur <= 50_000) q.enqueue([2 * cur, distance + 1]);
}

console.log(sol);
