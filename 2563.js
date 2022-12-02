/*
도화지가 100*100이므로 그냥 배열 만들어서 색칠하면 끝
도화지가 처음으로 색칠될 때 넓이를 더해주면 됨.
*/
const PAPER_SIZE = 100;
const COLORED_PAPER_SIZE = 10;
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N], ...positions] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const paper = Array.from(new Array(PAPER_SIZE), () => new Array(PAPER_SIZE).fill(0));
let sol = 0;
positions.forEach(([col, row]) => {
  for (let r = row; r < row + COLORED_PAPER_SIZE; r += 1) {
    for (let c = col; c < col + COLORED_PAPER_SIZE; c += 1) {
      paper[r][c] += 1;
      if (paper[r][c] === 1) sol += 1;
    }
  }
});

// output
console.log(sol);
