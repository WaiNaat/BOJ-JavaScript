/*
집합 활용
수열 안의 각 숫자가
  x의 절반 미만이고
  (x-자기자신)이 수열에 들어있으면 조건을 만족하는 쌍
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, sequence, [target]] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const numbers = new Set(sequence);

let count = 0;
sequence.forEach((value) => {
  if (value < target / 2 && numbers.has(target - value)) {
    count += 1;
  }
});

console.log(count);
