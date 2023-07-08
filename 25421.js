/*
opt(i, last) := i자리면서 일의 자리가 last인 정수 A의 개수
opt(i, last) = sum(
  opt(i-1, last-2),
  opt(i-1, last-1),
  opt(i-1, last),
  opt(i-1, last+1),
  opt(i-1, last+2),
)

opt(i, ?) 계산에 opt(i-1, ?)만 필요하므로 일차원 배열로 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const maxDigit = Number(require('fs').readFileSync(INPUT_FILE).toString());

const DIVISOR = 987_654_321;

let current = new Array(10).fill(1);
current[0] = 0;

for (let digit = 2; digit <= maxDigit; digit += 1) {
  const next = new Array(10);
  next[0] = 0;

  for (let i = 1; i < 10; i += 1) {
    next[i] = (
      (current[i - 2] ?? 0)
      + (current[i - 1] ?? 0)
      + current[i]
      + (current[i + 1] ?? 0)
      + (current[i + 2] ?? 0)
    ) % DIVISOR;
  }

  current = next;
}

console.log(current.reduce((prev, cur) => (prev + cur) % DIVISOR, 0));
