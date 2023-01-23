const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...words] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const wordSet = Array.from(new Set(words));

wordSet.sort((a, b) => {
  if (a.length !== b.length) return a.length - b.length;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

console.log(wordSet.join('\n'));
