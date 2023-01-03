const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const word = require('fs').readFileSync(INPUT_FILE).toString().trim();

const smallACode = 'a'.charCodeAt(0);
const sol = new Array(26).fill(-1);
for (let index = 0; index < word.length; index += 1) {
  const alphabet = word.charCodeAt(index) - smallACode;
  if (sol[alphabet] === -1) sol[alphabet] = index;
}

console.log(sol.join(' '));
