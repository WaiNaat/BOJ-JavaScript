/*
완전탐색
임의의 수를 정답이라 치고
민혁의 질문들에 대해 영수의 답변이 주어진 대로 나오는지 확인.
*/
const validateDuplicateNumber = (number) => {
  if (number.includes('0')) return false;
  if (new Set(number.split('')).size !== 3) return false;
  return true;
};

const validateCount = (answer, question, strikeAnswer, ballAnswer) => {
  let strikeCount = 0;
  let ballCount = 0;
  question.forEach((number, index) => {
    if (answer[index] === number) strikeCount += 1;
    else if (answer.includes(number)) ballCount += 1;
  });
  if (strikeCount === strikeAnswer && ballCount === ballAnswer) return true;
  return false;
};

const validateQuestionCallback = ({ result, answer }, [question, strikeCount, ballCount]) => {
  if (!result) return { result, answer };
  const q = question.toString().split('');
  const a = answer.split('');
  return { result: validateCount(a, q, strikeCount, ballCount), answer };
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N], ...QAs] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let sol = 0;
for (let number = 100; number < 1000; number += 1) {
  const answer = number.toString();
  if (validateDuplicateNumber(answer)) {
    const { result } = QAs.reduce(validateQuestionCallback, { result: true, answer });
    if (result) sol += 1;
  }
}

// output
console.log(sol);
