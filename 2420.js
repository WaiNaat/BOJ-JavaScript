const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, M] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

console.log(Math.abs(N - M));
