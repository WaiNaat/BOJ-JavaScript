/*
녹는건 그냥 구현
  착하게 0으로 패딩도해줬음 >> 항상 다 녹아 없어짐이 보장됨
덩어리 세는건 DFS/BFS
  처음에 녹일때 0이 아닌 칸을 세고
  DFS한번돌려서 0이 아닌 칸을 셈.
  다르면 덩어리 쪼개졌다는뜻
*/
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const WATER = 0;

const countWaters = (r, c, map) => {
  const waterCount = DIRECTIONS.reduce(
    (prev, [dr, dc]) => {
      if (map[r + dr][c + dc] === WATER) return prev + 1;
      return prev;
    },
    0,
  );
  return waterCount;
};

const melt = (row, col, map) => {
  const nextMap = Array.from(new Array(row), () => new Array(col).fill(0));
  let icebergCount = 0;

  for (let r = 1; r < row - 1; r += 1) {
    for (let c = 1; c < col - 1; c += 1) {
      if (map[r][c] > 0) {
        const waterCount = countWaters(r, c, map);
        nextMap[r][c] = Math.max(map[r][c] - waterCount, 0);
        if (nextMap[r][c] > 0) icebergCount += 1;
      }
    }
  }

  return { icebergCount, nextMap };
};

const dfs = (rStart, cStart, row, col, map) => {
  const visited = Array.from(new Array(row), () => new Array(col).fill(0));
  const stack = [[rStart, cStart]];
  let count = 0;

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (!visited[r][c]) {
      visited[r][c] = true;
      count += 1;
      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (!visited[r2][c2] && map[r2][c2] > 0) stack.push([r2, c2]);
      });
    }
  }

  return count;
};

const firstIcebergBlockSize = (row, col, map) => {
  for (let r = 1; r < row - 1; r += 1) {
    for (let c = 1; c < col - 1; c += 1) {
      if (map[r][c] > 0) return dfs(r, c, row, col, map);
    }
  }
  return 0;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...array] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
let time;
let divided = false;
let map = array;
for (time = 1; ;time += 1) {
  const { icebergCount, nextMap } = melt(row, col, map);
  if (icebergCount === 0) break;
  if (icebergCount !== firstIcebergBlockSize(row, col, nextMap)) {
    divided = true;
    break;
  }
  map = nextMap;
}

// output
console.log(divided ? time : 0);
