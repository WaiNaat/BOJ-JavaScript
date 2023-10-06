/*
1을 지울 수 있다면 지우는 게 무조건 좋은가?
  숫자는 획기적으로 줄이긴 함

일단 1을 다 없애고 시작
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = require('fs').readFileSync(INPUT_FILE).toString();

const removeOne = (value) => Number(value.toString().split('1').join(''));

let value = removeOne(target);
let operationCount = target.length - target.replaceAll('1', '').length;

while (value > 0) {
  if (value.toString().includes('1')) {
    value = removeOne(value);
  } else {
    value -= 1;
  }
  operationCount += 1;
}

console.log(operationCount);
