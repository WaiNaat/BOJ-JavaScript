/*
(0,0)은 항상 공기임
  >> 여기부터 dfs 돌리면 치즈 가장자리 확인가능
dfs를 돌리면 결국 치즈 외부의 공기는 한번씩 방문
  >> 각 공기마다 본인 주변에 치즈가 있을 경우 해당 치즈에 표시
  표시가 2개 이상이 된 치즈는 녹아야 함
*/
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...grid] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// functions
const findMeltingCheese = () => {
  const result = [];
  const visited = Array.from(new Array(row), () => new Array(col).fill(0));
  const stack = [[0, 0]];

  while (stack.length > 0) {
    const [r, c] = stack.pop();

    if (!visited[r][c]) {
      visited[r][c] = true;
      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) return;
        if (grid[r2][c2] === 1) {
          visited[r2][c2] += 1;
          if (visited[r2][c2] === 2) result.push([r2, c2]);
          return;
        }
        if (grid[r2][c2] === 0 && !visited[r2][c2]) stack.push([r2, c2]);
      });
    }
  }

  return result;
};

const melt = (meltingCheese) => {
  let count = 0;
  meltingCheese.forEach(([r, c]) => {
    grid[r][c] = 0;
    count += 1;
  });
  return count;
};

// process
let meltCount = 1;
let time;
for (time = 0; meltCount > 0; time += 1) {
  const meltingCheeseArray = findMeltingCheese();
  meltCount = melt(meltingCheeseArray);
}

// output
console.log(time - 1);
