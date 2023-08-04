/*
sum(i, i+1, i+2, ..., i+k-1)
  = i*k + k(k-1)/2
  = N
  k는 L 이상 100 이하
k=L부터 100까지 돌면서 이 식을 만족하는 i가 있는지 찾기
*/
const INPUT_FILE = process.platform === 'linux' ? 'dev/stdin' : './input';
const [sum, minLength] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let length;
let start = -1;

for (length = minLength; length <= 100; length += 1) {
  const equation = sum - (length * (length - 1)) / 2;
  if (equation >= 0 && equation % length === 0) {
    start = equation / length;
    break;
  }
}

if (start === -1) {
  console.log(-1);
} else {
  const sol = Array.from({ length }).map((_, idx) => start + idx);
  console.log(sol.join(' '));
}
