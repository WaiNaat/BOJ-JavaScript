/*
시작점이 1자리, 2자리, ... 일 경우부터 출발해본다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const writing = require('fs').readFileSync(INPUT_FILE).toString().trim();

let startValue;
let endValue;

for (
  startValue = writing[0];
  startValue.length <= writing.length;
  startValue += writing[startValue.length]
) {
  let answer = '';
  endValue = Number(startValue);

  for (endValue = Number(startValue); answer.length < writing.length; endValue += 1) {
    answer += endValue.toString();
  }

  if (answer === writing) break;
}

console.log(startValue, endValue - 1);
