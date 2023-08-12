/*
이분탐색
움직이는 값: 점수 기준치 X
비교용 값: 기준이 X점일 때 필요한 사탕 개수
기준: 최대 구매 가능한 사탕 수 K

필요한 사탕 개수가 살 수 있는 사탕 수보다 크면 점수 기준치 증가
필요한 사탕 개수가 살 수 있는 사탕 수보다 작으면 점수 기준치 감소
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, maxCandy, ...scores] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const countNecessaryCandies = (criteriaScore) =>
  scores.reduce((prev, score) => prev + Math.max(0, score - criteriaScore), 0);

let left = 0;
let right = 1_000_000_000_000;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (countNecessaryCandies(mid) > maxCandy) left = mid + 1;
  else right = mid;
}

console.log(left);
