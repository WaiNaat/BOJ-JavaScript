/*
이분탐색
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[length], ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const list = inputs
  .slice(0, length)
  .flat()
  .sort((a, b) => a - b);
const questions = inputs.slice(length).flat();
const find = (value) => {
  let left = 0;
  let right = length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (list[mid] < value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const hasValue = list[left] === value;
  return hasValue ? left : -1;
};

const sol = questions.map(find);

console.log(sol.join('\n'));
