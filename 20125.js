/*
십자 표시를 찾으면 됨

판의 크기는 최대 1백만
  -> 그냥 찾아보면 될듯?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const boardSize = Number(info);

const findHeart = () => {
  for (let r = 1; r < boardSize - 2; r += 1) {
    for (let c = 1; c < boardSize - 1; c += 1) {
      if (
        board[r][c] === '*' &&
        board[r - 1][c] === '*' &&
        board[r + 1][c] === '*' &&
        board[r][c - 1] === '*' &&
        board[r][c + 1] === '*'
      ) {
        return [r, c];
      }
    }
  }
  return null;
};

const [heartR, heartC] = findHeart();
let leftArm = 0;
let rightArm = 0;
let waist = 0;
let leftLeg = 0;
let rightLeg = 0;

for (let c = heartC - 1; c >= 0 && board[heartR][c] === '*'; c -= 1) {
  leftArm += 1;
}

for (let c = heartC + 1; c < boardSize && board[heartR][c] === '*'; c += 1) {
  rightArm += 1;
}

for (let r = heartR + 1; r < boardSize && board[r][heartC] === '*'; r += 1) {
  waist += 1;
}

for (let r = heartR + waist + 1; r < boardSize && board[r][heartC - 1] === '*'; r += 1) {
  leftLeg += 1;
}

for (let r = heartR + waist + 1; r < boardSize && board[r][heartC + 1] === '*'; r += 1) {
  rightLeg += 1;
}

console.log(heartR + 1, heartC + 1);
console.log(leftArm, rightArm, waist, leftLeg, rightLeg);
