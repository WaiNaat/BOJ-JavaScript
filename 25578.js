/*
8 12
최대공약수 4
정답 2

18 27
최대공약수 9
정답 3

2 3
이동경로 2 -> 6 -> 3
비용 2
ㅋㅋ

두 수 a와 b가
- 하나가 다른 하나의 약수다
  a b
- 둘 다 홀수다
  a 1 b
- 최대공약수가 1보다 크다
  a (1이 아닌 최소공약수) b
- 서로소이다
  a (최소공배수) b
  둘 다 홀수면 위에서 걸렀으니까 짝수가 남음
  1을 거쳤을 때 비용 2가 되어서 손해 발생
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getGreatestCommonDivisor = (one, another) => {
  if (another === 0) return one;
  return getGreatestCommonDivisor(another, one % another);
};

const getSmallestDivisor = (value) => {
  for (let i = 2; i <= Math.sqrt(value); i += 1) {
    if (value % i === 0) return i;
  }

  return value;
};

const sol = [];

tests.forEach(([one, another]) => {
  let big = one;
  let small = another;
  if (big < small) {
    big = another;
    small = one;
  }

  if (big % small === 0) {
    sol.push(`${one} ${another}`);
    return;
  }

  if (big % 2 === 1 && small % 2 === 1) {
    sol.push(`${one} ${1} ${another}`);
    return;
  }

  const gcd = getGreatestCommonDivisor(big, small);

  if (gcd > 1) {
    sol.push(`${one} ${getSmallestDivisor(gcd)} ${another}`);
    return;
  }

  const lcm = (one * another) / gcd;

  sol.push(`${one} ${lcm} ${another}`);
});

console.log(sol.join('\n'));
