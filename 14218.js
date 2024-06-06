/*
2초라 매번 bfs해도 될거같긴함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[cityCount, roadCount], ...input] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const next = Array.from({ length: cityCount + 1 }).map(() => []);
for (let i = 0; i < roadCount; i += 1) {
  const [one, another] = input[i];
  next[one].push(another);
  next[another].push(one);
}

const bfs = () => {
  const visited = Array.from({ length: cityCount + 1 }).fill(-1);
  const q = {
    list: [],
    left: 0,
    length: 0,
    enqueue(value) {
      this.list.push(value);
      this.length += 1;
    },
    dequeue() {
      if (this.length === 0) return undefined;
      this.left += 1;
      this.length -= 1;
      return this.list[this.left - 1];
    },
  };

  q.enqueue({ city: 1, count: 0 });

  while (q.length > 0) {
    const { city, count } = q.dequeue();

    if (visited[city] !== -1) continue;
    visited[city] = count;

    next[city].forEach((adj) => {
      if (visited[adj] !== -1) return;
      q.enqueue({ city: adj, count: count + 1 });
    });
  }

  return visited.slice(1).join(' ');
};

const sol = [];
for (let i = roadCount + 1; i < input.length; i += 1) {
  const [one, another] = input[i];
  next[one].push(another);
  next[another].push(one);
  sol.push(bfs());
}

console.log(sol.join('\n'));
