const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const hasCard = new Array(36).fill(false);

cards.forEach((value) => {
  hasCard[value] = true;
});

let sol = 0;
let isContinuous = false;

for (let i = 3; i <= 35; i += 1) {
  if (hasCard[i] && !isContinuous) {
    sol += i;
    isContinuous = true;
  } else if (!hasCard[i]) {
    isContinuous = false;
  }
}

console.log(sol);
