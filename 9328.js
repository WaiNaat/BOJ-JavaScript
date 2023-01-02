/*
가장자리 뚫린 부분들 확인
해당 부분부터 dfs 진행
  지나갈 수 있는 문은 모두 지나감
  주울 수 있는 열쇠/문서는 모두 획득
  주울 수 없는 열쇠/문서는 따로 기록
위에서 따로 기록한 부분부터 같은 방법으로 dfs 다시 진행
열린 문의 개수 또는 얻은 문서의 수가 변화가 없을 때까지 반복
*/
const WALL = '*';
const EMPTY = '.';
const DOCUMENT = '$';
const VISITED = 1;
const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const findOpenSpace = (row, col, map) => {
  const openSpace = [];
  for (let c = 0; c < col; c += 1) {
    if (map[0][c] !== WALL) openSpace.push([0, c]);
    if (map[row - 1][c] !== WALL) openSpace.push([row - 1, c]);
  }
  for (let r = 1; r < row - 1; r += 1) {
    if (map[r][0] !== WALL) openSpace.push([r, 0]);
    if (map[r][col - 1] !== WALL) openSpace.push([r, col - 1]);
  }
  return openSpace;
};

const canOpenStartingDoor = (map, keys, startingPosition) => {
  const stack = [];
  const nextStack = [];
  startingPosition.forEach(([r, c]) => {
    const current = map[r][c];
    if (current === VISITED) return;
    if (current === EMPTY || current === DOCUMENT || current === current.toLowerCase()) {
      stack.push([r, c]);
    } else if (!keys.has(current.toLowerCase())) {
      nextStack.push([r, c]);
    } else {
      stack.push([r, c]);
    }
  });
  return { stack, nextStack };
};

const traverse = (row, col, MAP, keys, startingPosition) => {
  const map = MAP;
  const { stack, nextStack } = canOpenStartingDoor(map, keys, startingPosition);
  let newDocumentCount = 0;
  let newKeyCount = 0;

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    const current = map[r][c];
    if (current !== VISITED) {
      if (current === DOCUMENT) {
        newDocumentCount += 1;
      } else if (current !== EMPTY) {
        newKeyCount += 1;
        keys.add(current);
      }
      map[r][c] = VISITED;

      DIRECTIONS.forEach(([dr, dc]) => {
        const r2 = r + dr;
        const c2 = c + dc;
        if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= col) return;

        const next = map[r2][c2];
        if (next === WALL || next === VISITED) return;
        if (next === EMPTY || next === next.toLowerCase()) {
          stack.push([r2, c2]);
        } else if (keys.has(next.toLowerCase())) {
          stack.push([r2, c2]);
          map[r2][c2] = EMPTY;
        } else {
          nextStack.push([r2, c2]);
        }
      });
    }
  }
  return { newDocumentCount, newKeyCount, nextStack };
};

const steal = (row, col, map, keys) => {
  let answer = 0;
  let newDocumentCount = 1;
  let newKeyCount = 0;
  let nextStack = findOpenSpace(row, col, map);
  while (newDocumentCount + newKeyCount > 0) {
    ({ newDocumentCount, newKeyCount, nextStack } = traverse(row, col, map, keys, nextStack));
    answer += newDocumentCount;
  }
  return answer;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [T, ...input] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const testCaseCount = Number(T);
const sol = [];
let index = 0;

for (let testCase = 0; testCase < testCaseCount; testCase += 1) {
  const [row, col] = input[index].split(' ').map(Number);
  const map = input.slice(index + 1, index + 1 + row).map((line) => line.split(''));
  const keys = new Set(input[index + 1 + row].split(''));
  index += row + 2;

  sol.push(steal(row, col, map, keys));
}

// output
console.log(sol.join('\n'));
