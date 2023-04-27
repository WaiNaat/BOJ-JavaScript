/*
1. 판을 만든다
2. 글자를 쓴다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [wordRow, wordCol, U, L, R, D, ...puzzle] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map((candidate) => (Number.isNaN(Number(candidate)) ? candidate.split('') : Number(candidate)));

const makeGetNextBoardRow = (colLength) => {
  let flag = false;
  const row1 = '#.'.repeat(Math.ceil(colLength / 2)).split('');
  const row2 = '.#'.repeat(Math.ceil(colLength / 2)).split('');

  while (row1.length > colLength) {
    row1.pop();
    row2.pop();
  }

  return () => {
    flag = !flag;

    if (flag) return [...row1];
    return [...row2];
  };
};

const board = [];
const getNextBoardRow = makeGetNextBoardRow(wordCol + L + R);
for (let i = 0; i < wordRow + U + D; i += 1) board.push(getNextBoardRow());

puzzle.forEach((row, index) => {
  board[U + index].splice(L, wordCol, ...row);
});

console.log(board.map((row) => row.join('')).join('\n'));
