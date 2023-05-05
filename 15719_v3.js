/*
배열을 사용할 경우 메모리 초과

char 하나씩 읽어서 숫자를 찾아야 함

처음 수열에 들어 있던 수의 합: 1부터 N-1까지 정수의 합
삽입 후 수열에 들어 있던 수의 합: 윗줄서 구한 합 + 삽입한 값

숫자를 거꾸로 읽으면 현재 숫자를 배열에 저장할 필요조차 없다?
띄어쓰기 후 처음 만난애 = 일의 자리
그 다음 = 십의 자리
그 다음 = 백의 자리
띄어쓰기 = 자리 초기화
*/

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [length, sequence] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

let sum = ((Number(length) - 1) * Number(length)) / 2;
let base = 1;

for (let i = sequence.length - 1; i >= 0; i -= 1) {
  if (sequence[i] === ' ') {
    base = 1;
  } else {
    sum -= Number(sequence[i]) * base;
    base *= 10;
  }
}

console.log(-sum);
