const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, target] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

if (target.length <= 25) {
  console.log(target);
} else if (!target.slice(11, -12).includes('.')) {
  console.log(`${target.slice(0, 11)}...${target.slice(-11)}`);
} else {
  console.log(`${target.slice(0, 9)}......${target.slice(-10)}`);
}
