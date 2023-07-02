/*
opt(i) := 2*i 크기의 직사각형을 채우는 방법의 수
opt(i) = opt(i-1) + opt(i-2)
  i-1까지 채우고 세로로 하나(|) 놓거나
  i-2까지 채우고 가로로 둘(=) 놓거나
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const size = Number(require('fs').readFileSync(INPUT_FILE).toString());

const DIVISOR = 10007;
const cases = [1, 1];

for (let i = 2; i <= size; i += 1) {
  cases.push((cases[i - 1] + cases[i - 2]) % DIVISOR);
}

console.log(cases[size]);
