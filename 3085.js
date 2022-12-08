/*
단 한 번만 먹을 수 있음
초기상태에서 최대로 먹을 수 있는거 계산
각 사탕별로 상하좌우 움직여보고 계산
  max(N)=50이라 충분히 가능
*/
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const longestStreakAtCol = (col, boardSize, board) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let currentColor;
  for (let row = 0; row < boardSize; row += 1) {
    if (board[row][col] !== currentColor) {
      longestStreak = Math.max(currentStreak, longestStreak);
      currentStreak = 1;
      currentColor = board[row][col];
    } else {
      currentStreak += 1;
    }
  }
  longestStreak = Math.max(currentStreak, longestStreak);
  return longestStreak;
};

const longestStreakAtRow = (row, boardSize, board) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let currentColor;
  for (let col = 0; col < boardSize; col += 1) {
    if (board[row][col] !== currentColor) {
      longestStreak = Math.max(currentStreak, longestStreak);
      currentStreak = 1;
      currentColor = board[row][col];
    } else {
      currentStreak += 1;
    }
  }
  longestStreak = Math.max(currentStreak, longestStreak);
  return longestStreak;
};

const findInitialLongestStreak = (boardSize, board) => {
  let longestStreak = 0;
  for (let i = 0; i < boardSize; i += 1) {
    longestStreak = Math.max(
      longestStreakAtCol(i, boardSize, board),
      longestStreakAtRow(i, boardSize, board),
      longestStreak,
    );
  }
  return longestStreak;
};

const exchange = (r, c, r2, c2, gameBoard) => {
  const board = gameBoard;
  [board[r][c], board[r2][c2]] = [board[r2][c2], board[r][c]];
};

const eat = (r, c, dr, dc, boardSize, board) => {
  const r2 = r + dr;
  const c2 = c + dc;
  if (r2 < 0 || r2 >= boardSize || c2 < 0 || c2 >= boardSize) return -1;
  if (board[r][c] === board[r2][c2]) return -1;

  let eatCount;
  exchange(r, c, r2, c2, board);
  eatCount = longestStreakAtCol(c, boardSize, board);
  eatCount = Math.max(longestStreakAtRow(r, boardSize, board), eatCount);
  exchange(r, c, r2, c2, board);
  return eatCount;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [boardSize, ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

boardSize = Number(boardSize);
board = board.map((row) => row.split(''));

// process
let maxCandy = findInitialLongestStreak(boardSize, board);

for (let row = 0; row < boardSize; row += 1) {
  for (let col = 0; col < boardSize; col += 1) {
    maxCandy = DIRECTIONS.reduce(
      (prev, [dr, dc]) => Math.max(eat(row, col, dr, dc, boardSize, board), prev),
      maxCandy,
    );
  }
}

// output
console.log(maxCandy);
