const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, boxes, books] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let remainders = 0;
let book = 0;

for (let box = 0; box < boxes.length; box += 1) {
  while (book < books.length && boxes[box] >= books[book]) {
    boxes[box] -= books[book];
    book += 1;
  }
  remainders += boxes[box];
}

console.log(remainders);
