/*
그냥 귀찮은 문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...homework] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const [row, col] = info.join('').split(' ').map(Number);

const findProblem = (r, c) =>
  homework[r * 3 + 1]
    .slice(c * 8, c * 8 + 8)
    .filter((char) => char !== '.')
    .join('');

const isCorrect = (problem) => {
  const [left, right] = problem.split('=');
  const [a, b] = left.split('+').map(Number);
  const c = Number(right);
  return a + b === c;
};

const markCorrect = (problemR, problemC) => {
  const problemLength = findProblem(problemR, problemC).length;
  for (let c = 1; c < 1 + problemLength; c += 1) {
    homework[problemR * 3][problemC * 8 + c] = '*';
    homework[problemR * 3 + 2][problemC * 8 + c] = '*';
  }
  homework[problemR * 3 + 1][problemC * 8] = '*';
  homework[problemR * 3 + 1][problemC * 8 + problemLength + 1] = '*';
};

const markWrong = (r, c) => {
  homework[r * 3][c * 8 + 3] = '/';
  homework[r * 3 + 1][c * 8 + 2] = '/';
  homework[r * 3 + 2][c * 8 + 1] = '/';
};

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    const problem = findProblem(r, c);
    if (isCorrect(problem)) markCorrect(r, c);
    else markWrong(r, c);
  }
}

console.log(homework.map((row) => row.join('')).join('\n'));
