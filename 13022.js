/*
정규식은 힘들어보이니 그냥 세기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim().split('');

let isValid = true;

while (input.length) {
  let wCount = 0;
  let oCount = 0;
  let lCount = 0;
  let fCount = 0;

  while (input.length && input.at(-1) === 'f') {
    input.pop();
    fCount += 1;
  }

  while (input.length && input.at(-1) === 'l') {
    input.pop();
    lCount += 1;
  }

  while (input.length && input.at(-1) === 'o') {
    input.pop();
    oCount += 1;
  }

  while (input.length && input.at(-1) === 'w') {
    input.pop();
    wCount += 1;
  }

  if (!(wCount === oCount && oCount === lCount && lCount === fCount)) {
    isValid = false;
    break;
  }
}

console.log(isValid ? 1 : 0);
