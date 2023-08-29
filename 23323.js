/*
체력이 1일 때 하루에 먹이를 1씩 주면 연명 가능
  -> 먹이 한 개당 하루를 무조건 보장받는 방법

9 -> 4 -> 2 -> 1
8 -> 4 -> 2 -> 1
7 -> 3 -> 1

주어진 수가 2^i 이상 2^(i+1) 미만일 때 i+1일을 버티고 체력이 1이 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sol = [];

tests.forEach(([health, food]) => {
  const survivingDays = health.toString(2).length;
  sol.push(survivingDays + food);
});

console.log(sol.join('\n'));
