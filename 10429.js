// 틀렸습니다

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
const isPossible = (startR, startC, targetValue, maxCount) => {
  const path = [`${startR} ${startC}`];
  const visited = Array.from({ length: 3 }).map(() => new Array(3));
  visited[startR][startC] = true;

  const dfs = (r, c, value, operator, count) => {
    if (count === maxCount) {
      return value === targetValue;
    }

    let newValue = value;
    if (operator === '+') newValue += board[r][c];
    else if (operator === '-') newValue -= board[r][c];

    for (let i = 0; i < DIRECTIONS.length; i += 1) {
      const [dr, dc] = DIRECTIONS[i];
      const r2 = r + dr;
      const c2 = c + dc;

      if (r2 < 0 || c2 < 0 || r2 >= 3 || c2 >= 3 || visited[r2][c2]) continue;

      path.push(`${r2} ${c2}`);
      visited[r2][c2] = true;

      if (dfs(r2, c2, newValue, operator ? null : board[r][c], count + (operator ? 1 : 0))) {
        return true;
      }

      visited[r2][c2] = false;
      path.pop();
    }

    return false;
  };

  const result = dfs(startR, startC, 0, '+', 0);
  if (result) path.pop();

  return result ? path : [];
};

let sol;

for (let r = 0; r < 3; r += 1) {
  for (let c = 0; c < 3; c += 1) {
    if (typeof board[r][c] === 'number') {
      const result = isPossible(r, c, target, numbers);
      if (result.length) sol = result;
    }
  }
}

console.log(sol ? 1 : 0);
if (sol) console.log(sol.join('\n'));
