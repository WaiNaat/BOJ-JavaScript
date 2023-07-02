const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const n = Number(require('fs').readFileSync(INPUT_FILE).toString());

const fibo = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597].map(BigInt);

for (let i = fibo.length; i <= n; i += 1) {
  fibo.push(fibo[i - 1] + fibo[i - 2]);
}

console.log(fibo[n].toString());
