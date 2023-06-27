const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, string] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const countDiff = (string1, string2) => {
  let count = 0;

  for (let i = 0; i < string1.length; i += 1) {
    if (string1[i] !== string2[i]) count += 1;
  }

  return count;
};

let isVitaminString = false;
const head = [];
const tail = [];

for (let i = 0; i < string.length && !isVitaminString; i += 1) {
  head.push(string[i]);
  tail.push(string[string.length - 1 - i]);

  if (countDiff(head, [...tail].reverse()) === 1) isVitaminString = true;
}

console.log(isVitaminString ? 'YES' : 'NO');
