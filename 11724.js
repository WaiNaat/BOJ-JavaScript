const makeGraph = (N, edges) => {
  const E = Array.from(new Array(N + 1), () => []);
  edges.forEach(([u, v]) => {
    E[u].push(v);
    E[v].push(u);
  });
  return E;
};

const dfs = (start, visited, E) => {
  const stack = [start];
  while (stack.length > 0) {
    const cur = stack.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      E[cur].forEach((next) => {
        stack.push(next);
      });
    }
  }
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N], ...edges] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const E = makeGraph(N, edges);
const visited = new Set();
let componentCount = 0;

for (let start = 1; start <= N; start += 1) {
  if (!visited.has(start)) {
    componentCount += 1;
    dfs(start, visited, E);
  }
}

// output
console.log(componentCount);
