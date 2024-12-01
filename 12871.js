const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [s, t] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const isSame = s.repeat(t.length) === t.repeat(s.length);

console.log(isSame ? 1 : 0);
