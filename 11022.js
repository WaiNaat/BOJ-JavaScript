const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const testCases = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(' ').map(Number));

const sol = [];
testCases.forEach(([A, B], index) => {
  sol.push(`Case #${index + 1}: ${A} + ${B} = ${A + B}`);
});

console.log(sol.join('\n'));
