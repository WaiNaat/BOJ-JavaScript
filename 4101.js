const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const testCases = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

testCases.pop();

const sol = [];
testCases.forEach(([left, right]) => { sol.push(left > right ? 'Yes' : 'No'); });

console.log(sol.join('\n'));
