/*
그냥 완전탐색?

우변을 0~99까지 바꾸면서
좌변도 0+우변부터 시작해서 하나씩 되나 안되나 확인

임의의 두자리 숫자를 성냥개비 개수로 바꾸는 함수 필요

기호들에 쓸 성냥개비 4개
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const matchCount = Number(require('fs').readFileSync(INPUT_FILE).toString());

const matchAmountForDigit = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

const matchAmountForNumber = (value) => {
  const tens = Math.floor(value / 10);
  const units = value % 10;
  return matchAmountForDigit[tens] + matchAmountForDigit[units];
};

const isPossibleEquation = (left1, left2, right) => (
  matchAmountForNumber(left1)
  + matchAmountForNumber(left2)
  + matchAmountForNumber(right)
  + 4
  === matchCount
);

const validateEquations = (rightSideValue) => {
  for (let left = 0; left <= Math.floor(rightSideValue / 2); left += 1) {
    if (isPossibleEquation(left, rightSideValue - left, rightSideValue)) return left;
  }
  return -1;
};

let equation = '';

for (let rightSide = 0; rightSide < 100; rightSide += 1) {
  const left = validateEquations(rightSide);

  if (left > -1) {
    equation = `${left.toString().padStart(2, '0')}+${(rightSide - left).toString().padStart(2, '0')}=${rightSide.toString().padStart(2, '0')}`;
    break;
  }
}

console.log(equation.length ? equation : 'impossible');
