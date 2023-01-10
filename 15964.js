const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [A, B] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

console.log((A + B) * (A - B));
