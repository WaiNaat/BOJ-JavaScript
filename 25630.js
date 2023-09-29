const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, skewer] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const lastIndex = skewer.length - 1;
let count = 0;

for (let i = 0; i <= lastIndex / 2; i += 1) {
  if (skewer[i] !== skewer[lastIndex - i]) count += 1;
}

console.log(count);
