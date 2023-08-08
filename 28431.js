const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const socks = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n').map(Number);

let sol = -1;
for (let sock = 0; sock < 10; sock += 1) {
  if (socks.filter((s) => s === sock).length % 2 === 1) {
    sol = sock;
    break;
  }
}

console.log(sol);
