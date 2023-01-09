const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [T, ...strings] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const sol = [];
strings.forEach((string) => {
  sol.push(`${string[0]}${string[string.length - 1]}`);
});

console.log(sol.join('\n'));
