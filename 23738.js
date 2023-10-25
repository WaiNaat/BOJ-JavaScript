const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const word = require('fs').readFileSync(INPUT_FILE).toString().trim();

const special = {
  B: 'v',
  E: 'ye',
  H: 'n',
  P: 'r',
  C: 's',
  Y: 'u',
  X: 'h',
};

console.log(
  Array.from(word)
    .map((char) => special[char] ?? char.toLowerCase())
    .join(''),
);
