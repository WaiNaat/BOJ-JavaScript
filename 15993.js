/*
dp
opt(i, 홀/짝):= i를 만드는 경우의 수가 홀수/짝수인 경우
opt(i, 홀) = opt(i-1, 짝) + opt(i-2, 짝) + opt(i-3, 짝)
opt(i, 짝) = opt(i-1, 홀) + opt(i-2, 홀) + opt(i-3, 홀)

1
11 2
12 21 111 3
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...numbers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const DIVISOR = 1_000_000_009;
const optOdd = [0, 1, 1, 2];
const optEven = [0, 0, 1, 2];
const sol = numbers
  .map((num) => {
    while (optOdd.length <= num) {
      const nextOdd = (optEven.at(-1) + optEven.at(-2) + optEven.at(-3)) % DIVISOR;
      const nextEven = (optOdd.at(-1) + optOdd.at(-2) + optOdd.at(-3)) % DIVISOR;
      optOdd.push(nextOdd);
      optEven.push(nextEven);
    }
    return `${optOdd[num]} ${optEven[num]}`;
  })
  .join('\n');

console.log(sol);
