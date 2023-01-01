/*
동시에 두 색깔이 터지면 2연쇄인가?
  >> 일단 그렇다고 가정 (틀렸습니다)
  >> 동시에 여러개가 터져도 1연쇄로 계산
연쇄
  >> dfs돌리면 몇 개가 상하좌우로 연결되어 있는지 나옴
중력
  >> 이건 그냥 구현
*/
const ROW = 12;
const COL = 6;
const EXPLODE_COUNT = 4;
const EMPTY = '.';
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// input
const INPUT_FILE = process.platform === 'linux' ? 'dev/stdin' : './input';
const field = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(''));

// functions
const findChainedPuyo = (startR, startC, color) => {
  const visited = Array.from(new Array(ROW), () => new Array(COL));
  const stack = [[startR, startC]];
  const chained = [[startR, startC]];
  visited[startR][startC] = true;

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    DIRECTIONS.forEach(([dr, dc]) => {
      const r2 = r + dr;
      const c2 = c + dc;
      if (r2 < 0 || r2 >= ROW || c2 < 0 || c2 >= COL) return;
      if (!visited[r2][c2] && field[r2][c2] === color) {
        stack.push([r2, c2]);
        chained.push([r2, c2]);
        visited[r2][c2] = true;
      }
    });
  }

  return chained;
};

const explodeChain = (chained) => {
  if (chained.length >= EXPLODE_COUNT) {
    chained.forEach(([r, c]) => { field[r][c] = EMPTY; });
  }
};

const pushDown = (startR, c) => {
  let r = startR;
  while (r < ROW - 1 && field[r + 1][c] === EMPTY) {
    field[r + 1][c] = field[r][c];
    field[r][c] = EMPTY;
    r += 1;
  }
};

const gravity = () => {
  for (let r = ROW - 2; r >= 0; r -= 1) {
    for (let c = 0; c < COL; c += 1) {
      if (field[r][c] !== EMPTY) pushDown(r, c);
    }
  }
};

const explode = (r, c) => {
  if (field[r][c] === EMPTY) return false;

  const chained = findChainedPuyo(r, c, field[r][c]);
  if (chained.length < EXPLODE_COUNT) return false;

  explodeChain(chained);
  return true;
};

// process
let chainCount = -1;
let exploded = true;
while (exploded) {
  exploded = false;
  chainCount += 1;
  for (let r = 0; r < ROW; r += 1) {
    for (let c = 0; c < COL; c += 1) {
      exploded = explode(r, c) || exploded;
    }
  }
  gravity();
}

// output
console.log(chainCount);
