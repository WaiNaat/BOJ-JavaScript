/*
세상에서 제일 귀찮은 입력 파싱문제
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const inputs = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

inputs.pop();

const sol = [];
let i = 0;

while (i < inputs.length) {
  const length = Number(inputs[i]);
  i += 1;

  let fastest = 'Z'.repeat(100);

  for (let count = 0; count < length; count += 1) {
    if (inputs[i].toLowerCase() < fastest.toLowerCase()) fastest = inputs[i];
    i += 1;
  }

  sol.push(fastest);
}

console.log(sol.join('\n'));
