/*
딜러 패에서 가장 비싼걸 가져오고 본인것중 가장 싼걸 주면됨
본인이 음수 점수를 얻어야 한다면 백지카드 돌리기로 0점 얻는걸로 대처 가능
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, turn, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

cards.sort((a, b) => a - b);

let left = 0;
let right = cards.length - 1;
let sol = 0;
for (let t = 0; t < turn && left <= right; t += 1) {
  if (cards[right] > 0) {
    sol += cards[right];
    left += 1;
    right -= 1;
  }
}

console.log(sol);
