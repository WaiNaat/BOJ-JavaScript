const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[boardSize], ...dabbabas] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const DIRECTIONS = [
  [0, 2],
  [0, -2],
  [-2, 0],
  [2, 0],
];
const currentPositions = new Set(dabbabas.map(([r, c]) => `${r},${c}`));
const nextPositions = new Set();

dabbabas.forEach(([r, c]) => {
  DIRECTIONS.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (
      r2 < 1 ||
      r2 > boardSize ||
      c2 < 1 ||
      c2 > boardSize ||
      currentPositions.has(`${r2},${c2}`)
    ) {
      return;
    }

    nextPositions.add(`${r2},${c2}`);
  });
});

console.log(nextPositions.size);
