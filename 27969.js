/*
결국 근본은 괄호문제
올바른 괄호 = 8
  무조건 올바르므로 여는것만 계산
숫자 = 8
문자열 = 길이+12
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const ason = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ');

const sol = ason.reduce((prev, value) => {
  if (!Number.isNaN(Number(value))) return prev + 8;
  if (value === '[') return prev + 8;
  if (value === ']') return prev;
  return prev + value.length + 12;
}, 0);

console.log(sol);
