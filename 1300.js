/*
1  2  3  4  5  6
2  4  6  8 10 12
3  6  9 12 15 18
4  8 12 16 20 24
5 10 15 20 25 30
6 12 18 24 30 36

이분탐색

내가 찾는 정답을 X라 하면
각 행별로 X보다 작은 수의 개수(편의상 a)와
X와 같은 수의 개수(편의상 b)를 센다.

주어진 k가 a+1 ~ a+b 사이면 X는 내가 찾는 정답이 맞다.
k가 a 이하면 X를 줄여야 한다.
k가 a+b 초과면 X를 늘려야 한다.
*/
const count = (target, N) => {
  let smaller = 0;
  let same = 0;

  for (let i = 1; i <= N; i += 1) {
    smaller += Math.min(N, Math.floor(target / i));
    if (target % i === 0 && target / i <= N) {
      smaller -= 1;
      same += 1;
    }
  }

  return { smaller, same };
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, k] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

// process
let left = 0;
let right = N * N;

while (left < right) {
  const mid = Math.floor((left + right) / 2);
  const { smaller, same } = count(mid, N);

  if (k > smaller && k <= smaller + same) {
    left = mid;
    break;
  }

  if (k <= smaller) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

// output
console.log(left);
