/*
무조건 0부터 시작해서 012012012... 순서임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...stores] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let next = 0;
let count = 0;

for (let i = 0; i < stores.length; i += 1) {
  if (stores[i] === next) {
    count += 1;
    next += 1;
    next %= 3;
  }
}

console.log(count);
