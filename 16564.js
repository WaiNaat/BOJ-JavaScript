/*
이분 탐색

움직이는 값: 팀 목표레벨 T
기준점: 올릴 수 있는 최대 총합 레벨 K
비교하는 값: 팀 목표레벨 T를 위해서 올려야 하는 레벨의 총합

비교하는 값이 기준점보다 크면 목표레벨을 줄임
비교하는 값이 기준점보다 작거나 같으면 목표레벨을 늘림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, levelUpLimit, ...levels] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const getLevelsNeeded = (teamLevel) => levels.reduce(
  (prev, level) => prev + Math.max(teamLevel - level, 0),
  0,
);

let left = Math.min(...levels);
let right = Math.max(...levels) + levelUpLimit + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (getLevelsNeeded(mid) > levelUpLimit) right = mid;
  else left = mid + 1;
}

console.log(left - 1);
