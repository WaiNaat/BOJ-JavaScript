/*
이분탐색

움직이는 값: 1인당 막걸리 용량
비교값: 움직이는 값만큼 분배했을 때 먹을 수 있는 인원수
기준점: 총 인원수

비교값이 기준점보다 작으면 1인당 용량 줄임
비교값이 기준점보다 크거나 같으면 1인당 용량 늘림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, peopleCount, ...kettles] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const howManyCanDrink = (cupSize) => kettles.reduce(
  (prev, kettle) => prev + Math.floor(kettle / cupSize),
  0,
);

let left = 0;
let right = Math.max(...kettles) + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (howManyCanDrink(mid) < peopleCount) right = mid;
  else left = mid + 1;
}

console.log(left - 1);
