/*
1 + 2 + 3 + 4 + 5 + ... = n(n+1)/2
홀수면 시작점에서 분자가 크고 짝수면 분모가 크다

(n-1)n/2 < X <= n(n+1)/2 인 n 찾기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const X = Number(require('fs').readFileSync(INPUT_FILE).toString());

let n = 1;
while (((n - 1) * n) / 2 >= X || X > (n * (n + 1)) / 2) {
  n += 1;
}

const index = X - ((n - 1) * n) / 2;

if (n % 2 === 1) {
  console.log(`${n + 1 - index}/${index}`);
} else {
  console.log(`${index}/${n + 1 - index}`);
}
