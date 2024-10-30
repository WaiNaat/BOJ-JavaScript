/*
구현
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[height, peopleCount], ...hands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const positions = Array.from({ length: 10_001 });
hands.forEach(([a, b], i) => {
  positions[a] = i + 1;
  positions[b] = i + 1;
});

const order = positions.filter((person) => person !== undefined);
const target = (height - 1) % (peopleCount * 2);

console.log(order[target]);
