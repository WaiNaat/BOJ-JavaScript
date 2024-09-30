/*
이분탐색

움직이는 값: 가로등의 높이
기준: 해당 높이일 때 전부 커버가 가능한지
커버 가능하면 -> 높이 줄임
커버 불가능하면 -> 높이 늘림

커버 가능한지를 선형시간에 확인하기
첫번째 가로등이 0번까지 커버하는지 확인
모든 가로등이 본인 다음것까지 커버하는지 확인
마지막 가로등이 N까지 커버하는지 확인
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [length, , ...positions] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

positions.push(length);
const canCover = (height) => {
  if (positions[0] - height > 0) {
    return false;
  }

  for (let i = 0; i < positions.length - 1; i += 1) {
    const half = (positions[i] + positions[i + 1]) / 2;
    if (positions[i] + height < half) {
      return false;
    }
  }

  if (positions.at(-2) + height < length) {
    return false;
  }

  return true;
};

let left = 1;
let right = length + 1;
while (left < right) {
  const mid = Math.floor((left + right) / 2);
  if (canCover(mid)) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(left);
