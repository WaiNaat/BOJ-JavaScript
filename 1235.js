const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...numbers] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

let sol;
for (let length = 1; length <= numbers[0].length; length += 1) {
  if (new Set(numbers.map((number) => number.slice(-length))).size === numbers.length) {
    sol = length;
    break;
  }
}

console.log(sol);
