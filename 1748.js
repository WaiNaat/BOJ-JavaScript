// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

// process
let sol = 0;
for (let exponent = 0; 10 ** (exponent) <= N; exponent += 1) {
  if (10 ** (exponent + 1) <= N) { // 10*exponent자리 숫자가 전부 차 있음
    sol += (10 ** (exponent + 1) - 10 ** exponent) * (exponent + 1) + 1;
  } else { // 10*exponent자리 숫자 중간에 N이 있음
    sol += (N - 10 ** exponent) * (exponent + 1) + 1;
  }
}

// output
console.log(sol);
