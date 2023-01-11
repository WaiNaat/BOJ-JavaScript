/*
자기 직속 부하들에게 전화를 거는 순서가 중요
본인의 직속 부하들 중
  그 부하의 부하들에게 전파하는 데 가장 오래 걸리는 직원부터 전화해야 함

max(N)=50이므로 재귀를 이용한 dfs로 처리 가능
*/
const makeTree = (N, superiors) => {
  const subordinates = Array.from(new Array(N), () => []);
  superiors.forEach((superior, index) => {
    if (index > 0) subordinates[superior].push(index);
  });
  return subordinates;
};

const computeTransferTime = (current, subordinates) => {
  // base case
  if (subordinates[current].length === 0) return 0;

  // recursive step
  let times = [];
  subordinates[current].forEach((subordinate) => {
    times.push(computeTransferTime(subordinate, subordinates));
  });
  times.sort((a, b) => b - a);
  times = times.map((time, index) => time + index + 1);
  return Math.max(...times);
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...superiors] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

// process
const subordinates = makeTree(N, superiors);
const sol = computeTransferTime(0, subordinates);

// output
console.log(sol);
