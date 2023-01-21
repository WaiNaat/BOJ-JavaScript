const reverseNumber = (number) => Number(number.toString().split('').reverse().join(''));

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [A, B] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map((number) => reverseNumber(number));

console.log(Math.max(A, B));
