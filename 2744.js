const isUpperCase = (char) => /^[A-Z]$/.test(char);

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

const sol = [];
input.forEach((char) => {
  if (isUpperCase(char)) sol.push(char.toLowerCase());
  else sol.push(char.toUpperCase());
});

console.log(sol.join(''));
