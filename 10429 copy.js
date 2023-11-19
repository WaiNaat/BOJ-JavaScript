/*
숫자부터 dfs를 돌리면 필연적으로 수식을 완성할 수 있음
숫자가 5개니까 무식하게 돌리면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...game] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [target, numbers] = info.split(' ').map(Number);
const board = game.map((line) => line.split('').map((char) => Number(char) || char));
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const calculate = (path) => {
  let result = board[path[0][0]][path[0][1]];
  let i = 1;

  while (i < path.length) {
    const operator = board[path[i][0]][path[i][1]];
    const value = board[path[i + 1][0]][path[i + 1][1]];
    result += (operator === '+' ? 1 : -1) * value;
    i += 2;
  }

  return result;
};

const isPossible = (startR, startC, targetValue, maxCount) => {
  const path = [[startR, startC]];
  const visited = Array.from({ length: 3 }).map(() => new Array(3));
  visited[startR][startC] = true;

  const dfs = (r, c) => {
    if (path.length === maxCount * 2 - 1) {
      return calculate(path) === targetValue ? path : [];
    }

    for (let i = 0; i < DIRECTIONS.length; i += 1) {
      const [dr, dc] = DIRECTIONS[i];
      const r2 = r + dr;
      const c2 = c + dc;

      if (r2 < 0 || c2 < 0 || r2 >= 3 || c2 >= 3 || visited[r2][c2]) continue;

      path.push([r2, c2]);
      visited[r2][c2] = true;

      const result = dfs(r2, c2);
      if (result.length) return result;

      visited[r2][c2] = null;
      path.pop();
    }

    return [];
  };

  return dfs(startR, startC);
};

const getPath = (targetValue, maxCount) => {
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (typeof board[r][c] === 'number') {
        const result = isPossible(r, c, targetValue, maxCount);
        if (result.length) return result;
      }
    }
  }

  return [];
};

const sol = getPath(target, numbers);

console.log(sol.length ? 1 : 0);
if (sol.length) console.log(sol.map((line) => line.join(' ')).join('\n'));
