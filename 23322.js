/*
모든 숫자의 평준화가 가능한가?

0-index 기준
K번 숫자를 0번과 같게 만들면
K+1번도 0번=1번과 같게 만들 수 있음
같은 방식으로 전체의 평준화 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, numbers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let eat = 0;
let count = 0;
const base = numbers[0];

numbers.forEach((value) => {
  if (value === base) return;
  eat += value - base;
  count += 1;
});

console.log(eat, count);
