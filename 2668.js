/*
첫 줄 := 정점 번호
둘째 줄 := 다음 정점 번호
로 이루어진 방향 그래프.
여기에서 사이클들을 모조리 찾으면 되는 문제.

사이클 확인법?
어차피 정점별로 나가는 길은 하나니까 길따라 돌아다면서 시작점부터 방문했던곳 기억.
이미 방문했던 곳 나오면 사이클.
*/
// function
const travel = function travel(start, visited, next, sol) {
  let currentVertex = start;
  const globalVisited = visited;
  const visitedOrder = [];
  const visitedAtThisTravel = new Set();

  while (!visitedAtThisTravel.has(currentVertex)) {
    if (globalVisited[currentVertex]) return;

    visitedOrder.push(currentVertex);
    visitedAtThisTravel.add(currentVertex);

    currentVertex = next[currentVertex];
  }

  let loopVertex;
  while (loopVertex !== currentVertex) {
    loopVertex = visitedOrder.pop();
    globalVisited[loopVertex] = true;
    sol.push(loopVertex);
  }
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const next = require('fs').readFileSync(inputFile).toString().trim()
  .split('\n')
  .map(Number);

const N = next[0];

// process
const visited = new Array(N + 1).fill(false);
const sol = [];
visited.forEach((value, index) => {
  if (!value && index > 0) travel(index, visited, next, sol);
});
sol.sort((a, b) => a - b);

// output
console.log(`${sol.length}\n${sol.join('\n')}`);
