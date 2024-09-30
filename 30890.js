/*
왼손: 오른손 개수 시간마다 한번씩 침
오른손: 왼손 개수 시간마다 한번씩 침
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [x, y] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

const sol = [];
let left = x;
let right = y;
let leftTime = right;
let rightTime = left;

while (left > 0 || right > 0) {
  if (leftTime === rightTime) {
    sol.push(3);
    left -= 1;
    right -= 1;
    leftTime += y;
    rightTime += x;
  } else if (leftTime < rightTime) {
    sol.push(1);
    leftTime += y;
    left -= 1;
  } else {
    sol.push(2);
    rightTime += x;
    right -= 1;
  }
}

console.log(sol.join(''));
