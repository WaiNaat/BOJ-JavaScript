/*
이분탐색

본인이 본인 왼쪽 구멍보다 작다면 어차피 본인으로 떨어지는게 없음
  -> 본인 왼쪽값으로 평준화
  이러면 오름차순이 되므로 이분탐색으로 원하는 위치 확인 가능

움직이는 값: 구멍의 크기
구멍이 도토리보다
  크거나 같으면 -> 구멍을 줄임
  작으면 -> 구멍을 늘림
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, sizes, , acorns] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const realSizes = sizes.map((val, idx) => val + idx);
const holes = realSizes.reduce((result, val) => {
  result.push(Math.max(result.at(-1) ?? -Infinity, val));
  return result;
}, []);
const getHoleIndex = (size) => {
  let left = 0;
  let right = holes.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (holes[mid] >= size) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left + 1;
};

console.log(...acorns.map(getHoleIndex));
