/*
일종의 dp + 이분탐색

opt(i) := i점까지 올 수 있는 새의 최대 크기
gap(i) := i번 장애물 사이의 간격
opt(i) = min(opt(i-1), gap(i))

이러면 opt는 내림차순으로 정렬될 수밖에 없음

움직이는 값: 점수(opt배열의 index)
비교 대상: 주어진 새의 크기
기준: 해당 점수까지 오는 데 필요한 새의 크기

필요한 크기보다 새가 크다면 점수를 줄임
필요한 크기보다 새가 작거나 같다면 점수를 늘림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, top, bottom, , birds] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const gap = Array.from({ length: top.length + 1 }).map(
  (_, index) => top[index - 1] - bottom[index - 1],
);
const opt = [Infinity];

for (let i = 1; i < gap.length; i += 1) {
  opt.push(Math.min(opt[i - 1], gap[i]));
}

const sol = birds.map((bird) => {
  let left = 0;
  let right = opt.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (opt[mid] < bird) right = mid;
    else left = mid + 1;
  }

  return left - 1;
});

console.log(sol.join('\n'));
