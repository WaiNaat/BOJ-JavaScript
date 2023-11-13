const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [sum, diff] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

const A = (sum + diff) / 2;
const B = sum - A;

console.log(A >= 0 && B >= 0 && A % 1 === 0 ? `${A} ${B}` : -1);
