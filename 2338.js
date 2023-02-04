const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [A, B] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(BigInt);

console.log(`${A + B}\n${A - B}\n${A * B}`);
