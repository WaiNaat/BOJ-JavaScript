const isAscending = (sequence) => {
  for (let i = 1; i < 8; i += 1) {
    if (sequence[i] < sequence[i - 1]) return false;
  }
  return true;
};

const isDescending = (sequence) => {
  for (let i = 1; i < 8; i += 1) {
    if (sequence[i] > sequence[i - 1]) return false;
  }
  return true;
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const sequence = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

let result = 'mixed';
if (isAscending(sequence)) result = 'ascending';
else if (isDescending(sequence)) result = 'descending';

console.log(result);