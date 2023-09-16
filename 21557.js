/*
어차피 최후의 2인은 양쪽 끝 두 개임
  -> 터질때 충격파로 양쪽 끝의 높이를 갉아먹어야 함

왼쪽과 오른쪽 중 큰놈부터 하나씩 깎음
맨 마지막에는 둘다 깎임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [fireworkCount, ...fireworks] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let left = fireworks[0];
let right = fireworks[fireworkCount - 1];

for (let boom = 0; boom < fireworkCount - 3; boom += 1) {
  if (left < right) right -= 1;
  else left -= 1;
}

left -= 1;
right -= 1;

console.log(Math.max(left, right));
