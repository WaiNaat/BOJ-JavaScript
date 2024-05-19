/*
제일 작은 숫자를 0으로 매칭하는듯?
1. 숫자 정렬하기
2. 역으로 매핑하는 함수 만들기
*/
const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...coordinate] = require('fs')
  .readFileSync(INPUIT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const values = Array.from(new Set(coordinate).values()).sort((one, another) => one - another);
const compressMap = {};
values.forEach((value, index) => {
  compressMap[value] = index;
});

const sol = coordinate.map((value) => compressMap[value]);

console.log(sol.join(' '));
