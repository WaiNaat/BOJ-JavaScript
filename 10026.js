/*
dfs 돌리면 구역을 셀 수 있다.
*/
const DIRECIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const dfs = (board, startR, startC, visitedList, markList) => {
  const stack = [[startR, startC]];
  const visited = visitedList;
  while (stack.length > 0) {
    const [r, c] = stack.pop();

    if (!visited[r][c]) {
      visited[r][c] = true;

      DIRECIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;

        if (r2 < 0 || r2 >= board.length || c2 < 0 || c2 >= board.length) return;

        if (markList.includes(board[r2][c2])) stack.push([r2, c2]);
      });
    }
  }
};

const countAreas = (board, markList) => {
  const visited = Array.from(new Array(board.length), () => new Array(board.length));
  let count = 0;

  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board.length; c += 1) {
      if (!visited[r][c] && markList.includes(board[r][c])) {
        count += 1;
        dfs(board, r, c, visited, markList);
      }
    }
  }

  return count;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(''));

// process
const colorWeaknessCount = countAreas(board, ['R', 'G']) + countAreas(board, ['B']);
const noColorWeaknessCount = countAreas(board, ['R']) + countAreas(board, ['G']) + countAreas(board, ['B']);

// output
console.log(noColorWeaknessCount, colorWeaknessCount);
