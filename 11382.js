const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [A, B, C] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

console.log(A + B + C);
