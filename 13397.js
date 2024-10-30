/*
이게 이분탐색이라고?

그러면 그나마 가능성은 문제에서 요구하는
"구간의 점수의 최댓값" 이게 움직이는거임

움직이는 값: 구간의 점수의 최댓값 k
만약 k로 배열을 나누는게 가능하다면 k를 줄임
불가능하면 k를 늘림

배열을 나누는 게 가능하다는 걸 아는 방법?
M등분
구간에 숫자가 하나만 있으면 구간의 점수가 0이라서 유리함
  -> 구간의 점수가 k를 넘지 않는 선에서 앞쪽 구간이 최대한 많이 가져가주면 뒤쪽이 편함
  만약 앞쪽이 다 커버가능해서 M등분이 안되면 하나씩 떼서 뒤에 주는 컨셉
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, targetSectionCount], list] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const canDivide = (maxScore) => {
  let sectionCount = 1;
  let currentSectionMin = Infinity;
  let currentSectionMax = -Infinity;

  list.forEach((value) => {
    const nextSectionMin = Math.min(currentSectionMin, value);
    const nextSectionMax = Math.max(currentSectionMax, value);
    const nextSectionScore = nextSectionMax - nextSectionMin;

    if (nextSectionScore <= maxScore) {
      currentSectionMin = nextSectionMin;
      currentSectionMax = nextSectionMax;
    } else {
      currentSectionMin = value;
      currentSectionMax = value;
      sectionCount += 1;
    }
  });

  return sectionCount <= targetSectionCount;
};

let left = 0;
let right = 10_000;

while (left < right) {
  const mid = Math.floor((left + right) / 2);
  if (canDivide(mid)) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(left);
