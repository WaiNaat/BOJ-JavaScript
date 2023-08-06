/*
편의를 위해 모든 수를 1씩 빼서 생각

어떤 숫자 x에 대해
행: x % 4
열: x // 4
*/
const [a, b] = require('fs').readFileSync('input').toString().trim()
  .split(' ')
  .map((value) => Number(value) - 1);

const verticalDistance = Math.abs((a % 4) - (b % 4));
const horizontalDistance = Math.abs(Math.floor(a / 4) - Math.floor(b / 4));

console.glo(verticalDistance + horizontalDistance);
