/*
dfs를 통해 각 노드가 알 수 있는 것
  1. 내 자식의 자식들 중 나랑 가장 멀리 떨어져 있는 녀석과의 거리
  2. 나를 루트로 하는 서브트리의 지름 = 1의 값들 중 가장 큰 두 값의 합
결국 dfs를 돌면서 2번을 계산해서 가장 큰 값을 찾으면 되는 문제

node.js 재귀 최대 횟수 제한에 걸리므로 재귀방식으로 풀기ㄴㄴ
그럼 어케함?
  call stack을 모방한 무언가를 구현
  1. 일단 dfs돌면서 계산은 하지말고 방문 순서만을 저장한 call stack 만들기
  2. 만들어진 call stack에서 하나씩 뽑아서 계산
*/
const makeEdgeList = (edges) => {
  const result = [];
  for (let i = 0; i < edges.length; i += 2) {
    result.push([edges[i], edges[i + 1]]);
  }
  return result;
};

const makeAdjacencyList = (V, input) => {
  const E = new Array(V + 1);
  input.forEach(([vertex, ...edges]) => {
    edges.pop();
    E[vertex] = makeEdgeList(edges);
  });
  return E;
};

const makeCallStack = (root, V, E) => {
  const stack = [root];
  const callStack = [];
  const parent = new Array(V + 1);

  while (stack.length > 0) {
    const cur = stack.pop();
    callStack.push(cur);
    E[cur].forEach(([next]) => {
      if (next === parent[cur]) return;
      parent[next] = cur;
      stack.push(next);
    });
  }

  return { callStack, parent };
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[V], ...input] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const E = makeAdjacencyList(V, input);
const { callStack, parent } = makeCallStack(1, V, E);
const maxChildDistance = new Array(V + 1);
let maxSubtreeDiameter = 0;

while (callStack.length > 0) {
  const cur = callStack.pop();
  const childDistances = [0, 0];

  E[cur].forEach(([vertex, distance]) => {
    if (vertex === parent[cur]) return;
    childDistances.push(distance + maxChildDistance[vertex]);
  });

  childDistances.sort((a, b) => b - a);
  const [furthest, secondFurthest] = childDistances;
  maxChildDistance[cur] = furthest;
  maxSubtreeDiameter = Math.max(furthest + secondFurthest, maxSubtreeDiameter);
}

// output
console.log(maxSubtreeDiameter);
