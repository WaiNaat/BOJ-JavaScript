/*
1. 무조건 컴파일 에러
  길이가 1보다 큰 홀수
2. 무조건 0
  시작값 음수, 길이 1 아님
  시작값 양수, 길이 1
  시작값 0
3. 무조건 무한대
  시작값 양수, 길이 0
  시작값 음수, 길이 1
4. 계산
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [initialValue, arrowLength] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

if (arrowLength > 1 && arrowLength % 2 === 1) {
  console.log('ERROR');
} else if (
  initialValue === 0 ||
  (initialValue <= 0 && arrowLength !== 1) ||
  (initialValue >= 0 && arrowLength === 1)
) {
  console.log(0);
} else if (arrowLength === 0 || (initialValue < 0 && arrowLength === 1)) {
  console.log('INFINITE');
} else {
  console.log(Math.ceil(initialValue / (arrowLength / 2)) - 1);
}
