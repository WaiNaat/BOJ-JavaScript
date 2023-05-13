/*
9 8 7 7 6 5 4 4 3 2 2 2 1

9 8 7 6 5 4 3 2 1
7 4 2
2

가장 많이 등장한 숫자의 등장 횟수?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...matryoshkaList] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const counts = {};

matryoshkaList.forEach((size) => {
  if (!counts[size]) counts[size] = 0;
  counts[size] += 1;
});

console.log(Math.max(...Object.values(counts)));
