/*
한 번의 연산으로 얻는 값
1. 홀수합+2, 짝수합+1
2. 홀수합+1, 짝수합+2
3. 홀수합+1, 짝수합+1

연산 한 번으로 홀수합과 짝수합의 차이를 1씩 줄일 수 있음
단, 수열의 길이가 3일 때는 짝수합을 증가시킬 수 없음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...sequence] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const { oddSum, evenSum } = sequence.reduce(
  ({ oddSum, evenSum, isOdd }, value) => ({
    oddSum: oddSum + (isOdd ? value : 0),
    evenSum: evenSum + (isOdd ? 0 : value),
    isOdd: !isOdd,
  }),
  { oddSum: 0, evenSum: 0, isOdd: true },
);

if (sequence.length === 3 && oddSum > evenSum) {
  console.log(-1);
} else {
  console.log(Math.abs(oddSum - evenSum));
}
