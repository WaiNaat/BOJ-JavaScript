/*
2^20 이면 그렇게 안 크지 않나?
  -> 완전탐색
G는 두 가지 형태를 취할 수 있음
  -> 이진법
올바른 괄호 문자열인지 검사
  -> 스택
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ruined] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const isProperParen = (list) => {
  const stack = [];

  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === '(') {
      stack.push(list[i]);
    } else if (list[i] === ')' && stack[stack.length - 1] === '(') {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
};

const gochujang = [];
ruined.forEach((paren, index) => {
  if (paren === 'G') gochujang.push(index);
});

const caseCount = 2 ** gochujang.length - 1;

for (let caseIndex = 0; caseIndex <= caseCount; caseIndex += 1) {
  const binary = caseIndex.toString(2).padStart(gochujang.length, '0');

  for (let i = 0; i < binary.length; i += 1) {
    ruined[gochujang[i]] = binary[i] === '0' ? '(' : ')';
  }

  if (isProperParen(ruined)) break;
}

console.log(ruined.join(''));
