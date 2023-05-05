// 메모리 초과

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...sequence] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const appearedNumbers = new Set();

const sol = sequence.find((number) => {
  if (appearedNumbers.has(number)) return true;

  appearedNumbers.add(number);
  return false;
});

console.log(sol);
