const PATTERN = /^(?:100+1+|01)+$/;

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...testCases] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const result = testCases.map((string) => (PATTERN.test(string) ? 'YES' : 'NO'));

// output
console.log(result.join('\n'));
