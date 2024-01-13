/*
최대 깊이 5의 dfs를 반복하는 문제?
그렇다고 칸마다 1000번씩 dfs를 할 수는 없으니
각 지점 방문시마다 해당 단어가 신이 좋아하는 문자열이면 세기
중복방문 허용
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const [row, col] = info.split(' ').map(Number);
const world = inputs.slice(0, row);
const words = inputs.slice(row);
const counts = {};
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

words.forEach((word) => {
  counts[word] = 0;
});

const traverse = (startR, startC) => {
  const stack = [[startR, startC, '']];

  while (stack.length > 0) {
    const [r, c, prevWord] = stack.pop();
    const word = prevWord + world[r][c];

    if (counts[word] !== undefined) counts[word] += 1;

    if (word.length === 5) continue;

    DIRECTIONS.forEach(([dr, dc]) => {
      const r2 = (r + dr + row) % row;
      const c2 = (c + dc + col) % col;

      stack.push([r2, c2, word]);
    });
  }
};

for (let r = 0; r < row; r += 1) {
  for (let c = 0; c < col; c += 1) {
    traverse(r, c);
  }
}

console.log(words.map((word) => counts[word]).join('\n'));
