/*
dfs 여러번하는문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const moves = Array.from(input.pop());
const [startR, startC] = input
  .pop()
  .split(' ')
  .map((value) => Number(value) - 1);
const [R, C] = input[0].split(' ').map(Number);
const area = input.slice(1);

const view = Array.from(new Array(R), () => new Array(C).fill('#'));
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const putWard = (putR, putC) => {
  const targetArea = area[putR][putC];
  const stack = [[putR, putC]];

  while (stack.length) {
    const [r, c] = stack.pop();

    if (view[r][c] === '.') continue;
    view[r][c] = '.';

    DIRECTIONS.forEach(([dr, dc]) => {
      const r2 = r + dr;
      const c2 = c + dc;

      if (r2 < 0 || r2 >= R || c2 < 0 || c2 >= C) return;
      if (area[r2][c2] !== targetArea) return;
      if (view[r2][c2] === '.') return;

      stack.push([r2, c2]);
    });
  }
};

let r = startR;
let c = startC;

moves.forEach((move) => {
  switch (move) {
    case 'U':
      r -= 1;
      break;
    case 'D':
      r += 1;
      break;
    case 'L':
      c -= 1;
      break;
    case 'R':
      c += 1;
      break;
    default:
      putWard(r, c);
  }
});

view[r][c] = '.';
DIRECTIONS.forEach(([dr, dc]) => {
  const r2 = r + dr;
  const c2 = c + dc;

  if (r2 < 0 || r2 >= R || c2 < 0 || c2 >= C) return;

  view[r2][c2] = '.';
});

console.log(view.map((row) => row.join('')).join('\n'));
