const INPUT_FILE = process.platform === 'linux' ? 'dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString().trim());

const sol = Array.from(new Array(N), (value, index) => N - index);

console.log(sol.join('\n'));
