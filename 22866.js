/*
스택

우선 각 건물에서 본인 왼쪽에 누구를 볼 수 있는지 알아봄.
1. 스택 꼭대기가 본인 이하라서 안보이면 전부 pop
2. 남은 애들이 볼 수 있는 건물
3. 본인을 스택에 넣음

오른쪽에 보이는애들은 거꾸로 하면 됨.
*/
// function
const callback = function lookLeft(height, index, heightStack, indexStack, count, nearest) {
  while (
    heightStack.length > 0
    && heightStack[heightStack.length - 1] <= height
  ) {
    heightStack.pop();
    indexStack.pop();
  }

  const lookCount = count;
  const nearestIndex = nearest;

  lookCount[index] += heightStack.length;
  if (
    heightStack.length > 0
    && Math.abs(nearestIndex[index] - index) > Math.abs(index - indexStack[indexStack.length - 1])
  ) {
    nearestIndex[index] = indexStack[indexStack.length - 1];
  }

  heightStack.push(height);
  indexStack.push(index);
};

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...heights] = require('fs').readFileSync(inputFile).toString().trim()
  .split(/\s/)
  .map(Number);

// process
const lookCount = new Array(N).fill(0);
const nearestBuilding = new Array(N).fill(Infinity);

let heightStack = [];
let indexStack = [];
heights.forEach((height, index) => {
  callback(height, index, heightStack, indexStack, lookCount, nearestBuilding);
});

heightStack = [];
indexStack = [];
heights.reverse().forEach((height, index) => {
  const originalIndex = N - index - 1;
  callback(height, originalIndex, heightStack, indexStack, lookCount, nearestBuilding);
});

// output
const sol = [];
for (let i = 0; i < N; i += 1) {
  if (lookCount[i] > 0) {
    sol.push(`${lookCount[i]} ${nearestBuilding[i] + 1}`);
  } else {
    sol.push('0');
  }
}
console.log(sol.join('\n'));
