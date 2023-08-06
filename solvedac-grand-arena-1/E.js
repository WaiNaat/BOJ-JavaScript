// 틀렸습니다

/*
각 원소들에 대해 K로 나눈 나머지가 0,1,...,K-1인 개수를 구한다.
두 나머지를 더해 K로 나눈 나머지가 0이 아니면 된다.

나머지가 0인 원소는 '좋은 집합'에 0개 또는 1개만 들어갈 수 있다.
나머지가 i인 원소가 '좋은 집합'에 있다면 나머지가 K-i인 원소들은 '좋은 집합'에 없어야 한다.
나머지가 K/2인 원소는 '좋은 집합'에 0개 또는 1개만 들어갈 수 있다.

(1, K-1)
(2, K-2)
...
(i, K-i)
단, i < K/2

각 쌍은 선택X, 왼쪽, 오른쪽 세 가지 형태를 취할 수 있다.
각 쌍에서 선택된 측에서는 0개~(나머지가 ?인 원소 개수) 만큼 고를 수 있다.
최종적으로 원소의 개수가 0개, 1개인 '좋은 집합 후보'는 '좋은 집합'이 아니다.

각 쌍에서 나올 수 있는 경우의 수
  나머지가 왼쪽인게 x개, 오른쪽인게 y개 있다고 하면
  2^x + 2^y - 1개
이걸 i쌍만큼 다 곱하고
나머지가 0인 원소가 x개라면 x+1만큼 곱하고
나머지가 K/2인 원소가 x개라면 x+1만큼 곱하고
최종적으로 (N+1)만큼 빼면 되나?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, K, ...A] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const DIVISOR = 1_000_000_007;
const remainderCounts = new Array(K).fill(0);
const exponentRemainders = [1];

const getRemainderOfTwoToThePowerOf = (power) => {
  while (power >= exponentRemainders.length) {
    const last = exponentRemainders[exponentRemainders.length - 1];
    exponentRemainders.push((last * 2) % DIVISOR);
  }

  return exponentRemainders[power];
};

A.forEach((value) => {
  remainderCounts[value % K] += 1;
});

let sol = 1;

for (let i = 1; i < K / 2; i += 1) {
  const tuple =
    (getRemainderOfTwoToThePowerOf(remainderCounts[i]) +
      getRemainderOfTwoToThePowerOf(remainderCounts[K - i]) -
      1) %
    DIVISOR;

  sol = (sol * tuple) % DIVISOR;
}

sol = (sol * (remainderCounts[0] + 1)) % DIVISOR;

if (K % 2 === 0) {
  sol = (sol * (remainderCounts[K / 2] + 1)) % DIVISOR;
}

sol = (sol - (N + 1) + DIVISOR) % DIVISOR;

console.log(sol);
