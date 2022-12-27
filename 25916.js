/*
수열에서 연속된 구간합 중 M 이하면서 최대인 값 찾기
  >> 슬라이딩 윈도우

햄스터 오른쪽 끝을 한칸 늘림
M보다 커지면 이하가 될 때까지 왼쪽 끝을 줄임
반복
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [holeCount, maxSize, ...holes] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

// process
let curSize = 0;
let left = 0;
let right = -1;
let possibleMaxSize = 0;

while (right <= holeCount) {
  right += 1;
  curSize += holes[right];

  while (curSize > maxSize && left <= right) {
    curSize -= holes[left];
    left += 1;
  }

  if (curSize > possibleMaxSize) possibleMaxSize = curSize;
}

// output
console.log(possibleMaxSize);
