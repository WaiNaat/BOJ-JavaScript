/*
bfs -> 구현귀찮음
dfs

지점 하나 찍고 bfs, 본인과 같은 높이를 지니는 격자 전부 찾아서 방문
이 과정에서 주변에 나보다 높은게 있으면 봉우리 아님, 아니면 봉우리
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...farm] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const visited = Array.from(new Array(row), () => new Array(col).fill(false));

const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

const isMountainPeak = (startR, startC) => {
  let isPeak = true;
  const stack = [[startR, startC]];
  const curHeight = farm[startR][startC];

  while (stack.length) {
    const [r, c] = stack.pop();

    if (!visited[r][c]) {
      visited[r][c] = true;

      const lookAround = DIRECTIONS.reduce(
        (isPeak, [dr, dc]) => {
          const r2 = r + dr;
          const c2 = c + dc;

          if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) return isPeak;

          if (farm[r2][c2] > curHeight) return false;

          if (farm[r2][c2] === curHeight) stack.push([r2, c2]);

          return isPeak;
        },
        true,
      );

      isPeak &&= lookAround;
    }
  }

  return isPeak;
};

let count = 0;
for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    if (!visited[r][c] && isMountainPeak(r, c)) count += 1;
  }
}

console.log(count);
