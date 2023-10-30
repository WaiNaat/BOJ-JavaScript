/*
꽃이 겹쳐있는지 보는 법
  가격을 지불하는 땅의 수가 15개가 아니면 겹친거
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[size], ...garden] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getPosition = (value) => [Math.floor(value / size), value % size];
const plantSeed = (r, c, board) => {
  if (r < 1 || r >= size - 1 || c < 1 || c >= size - 1) return;

  board[r][c] = true;
  board[r][c - 1] = true;
  board[r][c + 1] = true;
  board[r - 1][c] = true;
  board[r + 1][c] = true;
};
const getPrice = (a, b, c) => {
  const buy = Array.from({ length: size }).map(() => new Array(size));
  const [r1, c1] = getPosition(a);
  const [r2, c2] = getPosition(b);
  const [r3, c3] = getPosition(c);

  plantSeed(r1, c1, buy);
  plantSeed(r2, c2, buy);
  plantSeed(r3, c3, buy);

  let price = 0;
  let count = 0;

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (buy[r][c]) {
        count += 1;
        price += garden[r][c];
      }
    }
  }

  return count === 15 ? price : Infinity;
};

let sol = Infinity;

for (let i = 0; i < size ** 2; i += 1) {
  for (let j = i + 1; j < size ** 2; j += 1) {
    for (let k = j + 1; k < size ** 2; k += 1) {
      sol = Math.min(getPrice(i, j, k), sol);
    }
  }
}

console.log(sol);
