// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...homework] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const numbers = [];
homework.forEach((line) => {
  line.split(/[a-z]+/).forEach((number) => {
    if (number === '') return;
    numbers.push(BigInt(number));
  });
});
numbers.sort((a, b) => (a > b ? 1 : -1));

// output
console.log(numbers.join('\n'));
