/*
2^20=100만 이므로 완탐 가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[variableCount], ...clauses] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const toBooleanArray = (value) => {
  return Array.from(value.toString(2).padStart(variableCount, '0')).map((val) => val === '1');
};
const isTrue = (status) => {
  return clauses.every(([a, b]) => {
    return (a > 0 ? status[a - 1] : !status[-a - 1]) || (b > 0 ? status[b - 1] : !status[-b - 1]);
  });
};
const canBeTrue = () => {
  for (let i = 0; i < 2 ** variableCount; i += 1) {
    const testCase = toBooleanArray(i);
    const result = isTrue(testCase);
    if (result) {
      return true;
    }
  }
  return false;
};

console.log(canBeTrue() ? 1 : 0);
