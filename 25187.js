/*
dfs
탐색 과정에서 두 가지를 신경써야 함
1. 이 물탱크는 어느 집단에 속하는가?
2. 이 집단의 청정수와 고인물의 개수는?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const [waterTankCount, pipeCount] = inputs[0];
const isClean = inputs[1];
const pipeLines = inputs.slice(2, 2 + pipeCount);
const targets = inputs.slice(2 + pipeCount);

const nextWaterTanks = Array.from({ length: waterTankCount }).map(() => new Set());

pipeLines.forEach(([one, another]) => {
  nextWaterTanks[one - 1].add(another - 1);
  nextWaterTanks[another - 1].add(one - 1);
});

let groupName = 0;
const myGroupName = new Array(waterTankCount);
const isGroupClean = [null];

const dfs = (start) => {
  if (myGroupName[start]) return;

  groupName += 1;
  let cleanScore = 0;
  const stack = [start];

  while (stack.length) {
    const cur = stack.pop();

    if (myGroupName[cur]) continue;
    myGroupName[cur] = groupName;

    if (isClean[cur]) cleanScore += 1;
    else cleanScore -= 1;

    nextWaterTanks[cur].forEach((next) => {
      if (!myGroupName[next]) stack.push(next);
    });
  }

  isGroupClean.push(cleanScore > 0 ? 1 : 0);
};

const sol = [];

targets.forEach((target) => {
  dfs(target - 1);
  sol.push(isGroupClean[myGroupName[target - 1]]);
});

console.log(sol.join('\n'));
