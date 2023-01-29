// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const testCases = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(' ').map(Number));

// process
const sol = [];
testCases.forEach(([A, B], index) => {
  sol.push(`Case #${index + 1}: ${A + B}`);
});

// output
console.log(sol.join('\n'));
