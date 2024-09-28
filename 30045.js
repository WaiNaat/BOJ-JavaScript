const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const sol = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .slice(1)
  .filter((s) => s.includes('OI') || s.includes('01')).length;

console.log(sol);
