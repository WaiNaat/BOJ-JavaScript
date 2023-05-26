/*
B진법으로 몇 자리 숫자인지를 찾는다
그다음에 나눗셈
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [value, base] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

const digits = [];

for (let digit = 1; digit <= value; digit *= base) {
  digits.push(digit);
}

const change = [];
let remainder = value;

while (digits.length) {
  const dividend = digits.pop();

  const quotient = Math.floor(remainder / dividend);
  remainder %= dividend;

  change.push(quotient);
}

const sol = change.map((value) => (
  value < 10
    ? value
    : String.fromCharCode(value - 10 + 'A'.charCodeAt(0))
));

console.log(sol.join(''));
