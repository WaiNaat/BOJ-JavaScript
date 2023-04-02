const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [totalAmount, difference] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(BigInt);

const natalia = (totalAmount - difference) / 2n;

console.log(`${natalia + difference}\n${natalia}`);
