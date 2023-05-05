/*
배열을 사용할 경우 메모리 초과

char 하나씩 읽어서 숫자를 찾아야 함

처음 수열에 들어 있던 수의 합: 1부터 N-1까지 정수의 합
삽입 후 수열에 들어 있던 수의 합: 윗줄서 구한 합 + 삽입한 값
*/

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [length, sequence] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

let sum = ((Number(length) - 1) * Number(length)) / 2;
let currentNumber = [];

for (let i = 0; i < sequence.length; i += 1) {
  if (sequence[i] === ' ') {
    sum -= Number(currentNumber.join(''));
    currentNumber = [];
  } else {
    currentNumber.push(sequence[i]);
  }
}
sum -= Number(currentNumber.join(''));

console.log(-sum);
