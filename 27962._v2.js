const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, target] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const isVitaminString = (one, another) => {
  let diffCount = 0;
  for (let i = 0; i < one.length; i += 1) {
    if (one[i] !== another[i]) diffCount += 1;
  }
  return diffCount === 1;
};

let sol = false;
for (let length = 1; length < target.length; length += 1) {
  if (isVitaminString(target.slice(0, length), target.slice(-length))) {
    sol = true;
  }
}

console.log(sol ? 'YES' : 'NO');
