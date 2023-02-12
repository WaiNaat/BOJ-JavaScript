const fs = require('fs');

const readInput = () => {
  const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
  const testCases = fs.readFileSync(INPUT_FILE).toString().trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));
  return testCases.slice(1);
};

const solve = () => {
  const testCases = readInput();

  const sol = testCases.map(([a, b]) => a + b);

  console.log(sol.join('\n'));
};

solve();
