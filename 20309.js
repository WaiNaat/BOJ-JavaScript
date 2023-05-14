/*
두 숫자의 위치를 바꾸는 방식으로 정렬
--> 이미 있는 방식임

근데 여기선
홀수번쨰 자리의 숫자는 홀수자리로만 이동가능
짝수도 마찬가지

배열을 정상적으로 정렬해 보고
만약 홀짝이 바뀌어야 정렬이 가능하다면 불가능

잠깐
"1 이상 N 이하의 정수가 주어진 배열에 한 번씩 등장한다."
정렬할 필요조차 없음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [_, ...originalArray] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

const canSort = originalArray.every((value, index) => (value + index + 1) % 2 === 0);

console.log(canSort ? 'YES' : 'NO');
