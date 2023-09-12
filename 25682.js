/*
각 칸이 취할 수 있는 형태는 흰, 검
맨 왼쪽 위 칸의 색을 정하면 각 칸은 알아서 두 색 중 하나를 취함

누적합
sum(r, c, color)
  := 0행 0열이 color색이고 0행 0열부터 r행 c열까지 체스판일 때 바꿔야 하는 수
sum(r, c) = sum(r-1, c) + sum(r, c-1) - sum(r-1, c-1)
  여기에 본인을 바꿔야 하면 +1

좌상단 색이 검정이면 r+c가 짝수면 검정, 홀수면 하양
좌상단 색이 하양이면 r+c가 짝수면 하양, 홀수면 검정

change(r, c, size) := r행 c열부터 시작해서 길이가 size인 체스판을 만들 때 바꿔야 하는 수
change(r, c, size) =
  sum(r+size-1, c+size-1)
  - sum(r+size-1, c-1)
  - sum(r-1, c+size-1)
  + sum(r-1, c-1)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [values, ...fullBoard] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col, boardSize] = values.split(' ').map(Number);
const sumBlack = Array.from({ length: row }, () => new Array(col).fill(0));
const sumWhite = Array.from({ length: row }, () => new Array(col).fill(0));
const isCorrectColor = (r, c, topLeftColor) => {
  if (topLeftColor === 'B') {
    return (r + c) % 2 === 0 ? fullBoard[r][c] === 'B' : fullBoard[r][c] === 'W';
  }
  return (r + c) % 2 === 0 ? fullBoard[r][c] === 'W' : fullBoard[r][c] === 'B';
};

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    sumBlack[r][c] =
      (r > 0 ? sumBlack[r - 1][c] : 0) +
      (c > 0 ? sumBlack[r][c - 1] : 0) -
      (r > 0 && c > 0 ? sumBlack[r - 1][c - 1] : 0) +
      (isCorrectColor(r, c, 'B') ? 0 : 1);

    sumWhite[r][c] =
      (r > 0 ? sumWhite[r - 1][c] : 0) +
      (c > 0 ? sumWhite[r][c - 1] : 0) -
      (r > 0 && c > 0 ? sumWhite[r - 1][c - 1] : 0) +
      (isCorrectColor(r, c, 'W') ? 0 : 1);
  }
}

const getNeededChangeCount = (r, c) => {
  const black =
    sumBlack[r + boardSize - 1][c + boardSize - 1] -
    (c > 0 ? sumBlack[r + boardSize - 1][c - 1] : 0) -
    (r > 0 ? sumBlack[r - 1][c + boardSize - 1] : 0) +
    (r > 0 && c > 0 ? sumBlack[r - 1][c - 1] : 0);

  const white =
    sumWhite[r + boardSize - 1][c + boardSize - 1] -
    (c > 0 ? sumWhite[r + boardSize - 1][c - 1] : 0) -
    (r > 0 ? sumWhite[r - 1][c + boardSize - 1] : 0) +
    (r > 0 && c > 0 ? sumWhite[r - 1][c - 1] : 0);

  return Math.min(black, white);
};

let sol = Infinity;

for (let r = 0; r + boardSize - 1 < row; r += 1) {
  for (let c = 0; c + boardSize - 1 < col; c += 1) {
    const result = getNeededChangeCount(r, c);
    if (result < sol) sol = result;
  }
}

console.log(sol);
