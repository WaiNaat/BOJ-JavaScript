/*
opt(i, 건너뜀?) := i번쨰 선택지를 완료했고 현재 건너뛰기를 (안)썼을 때 최대 인원수

그리디하게 두 선택지 중 항상 더 큰 결과를 불러오는 애를 골라야 함
-> 다음이 더하기, 곱하기라면 큰 수가 유리
-> 다음이 빼기, 나누기더라도 큰 수가 많이 남김

opt(i, 안건너뜀) = opt(i-1, 안건너뜀)에 각 연산한 결과 중 최댓값
opt(i, 건너뜀) = opt(i-1, 건너뜀)에 각 연산한 결과 또는 opt(i-1, 안건너뜀) 중 최댓값

opt(i, ?) 처리에 opt(i-1, ?)만 필요하므로 opt배열을 유지할 필요 ㄴ
opt(i-1, ?)=0이면 연산결과는 항상 0
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...choices] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' '));

const doOperation = (value, operation) => {
  if (value <= 0) return 0;

  const operator = operation[0];
  const operand = Number(operation[1]);

  if (operator === '+') return value + operand;
  if (operator === '-') return value - operand;
  if (operator === '*') return value * operand;
  return Math.floor(value / operand);
};

let resultNoSkip = 1;
let resultSkip = 0;

choices.forEach(([left, right]) => {
  const nextResultNoSkip = Math.max(
    doOperation(resultNoSkip, left),
    doOperation(resultNoSkip, right),
  );

  const nextResultSkip = Math.max(
    resultNoSkip,
    doOperation(resultSkip, left),
    doOperation(resultSkip, right),
  );

  resultNoSkip = nextResultNoSkip;
  resultSkip = nextResultSkip;
});

const result = Math.max(resultNoSkip, resultSkip, 0);

console.log(result > 0 ? result : 'ddong game');
