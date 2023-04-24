/*
1. black이면 제외
2. grey면 제외
  좌우에 있다면 왼쪽먼저 없애는게 유리한가? 그런듯
3. white면 제외

제외된 값은 정말 제외시켜야 함
사유: AB AA 면 1B 0G 0W임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' '));

inputs.pop();

const computeScore = (answerString, guessString) => {
  const answer = answerString.split('');
  const guess = guessString.split('');

  let blackCount = 0;
  let greyCount = 0;
  let whiteCount = 0;

  guess.forEach((char, index) => {
    if (answer[index] === char) {
      answer[index] = '';
      guess[index] = '';
      blackCount += 1;
    }
  });

  guess.forEach((char, index) => {
    if (!char) return;

    if (answer[index - 1] === char) {
      answer[index - 1] = '';
      guess[index] = '';
      greyCount += 1;
    } else if (answer[index + 1] === char) {
      answer[index + 1] = '';
      guess[index] = '';
      greyCount += 1;
    }
  });

  guess.forEach((char, index) => {
    if (!char) return;

    if (answer.includes(char)) {
      answer[answer.findIndex((answerChar) => char === answerChar)] = '';
      guess[index] = '';
      whiteCount += 1;
    }
  });

  return { blackCount, greyCount, whiteCount };
};

const sol = [];
inputs.forEach(([answer, guess]) => {
  const { blackCount, greyCount, whiteCount } = computeScore(answer, guess);
  sol.push(`${guess}: ${blackCount} black, ${greyCount} grey, ${whiteCount} white`);
});

console.log(sol.join('\n'));
