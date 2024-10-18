/*
음수인 그래프에서 최단경로 찾기
벨만-포드

총 N개의 정점이 있을 때 N-1번이면 최단경로를 찾을 수 있음
N번째에 최단경로 테이블에 변동이 생기면 음수 사이클이 있다는 뜻
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[cityCount], ...buses] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const costs = Array.from({ length: cityCount + 1 }, () => Infinity);
costs[1] = 0;

for (let moveCount = 0; moveCount < cityCount - 1; moveCount += 1) {
  buses.forEach(([start, end, time]) => {
    costs[end] = Math.min(costs[start] + time, costs[end]);
  });
}

const hasNegativeCycle = buses.some(([start, end, time]) => {
  return costs[start] + time < costs[end];
});

const sol = costs.map((cost) => (cost === Infinity ? -1 : cost));

if (hasNegativeCycle) {
  console.log(-1);
} else {
  console.log(sol.slice(2).join('\n'));
}
