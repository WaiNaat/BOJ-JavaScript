/*
만나는 경우
  두 사람의 번호 차가 1이고 둘 중 작은 번호가 홀수일 때

다음 번호
  홀수면 1 더해서 나누기 2
  짝수면 나누기 2

대결하지 않는 경우
  가 있나?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
let [, jimin, hansoo] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

const getNextRoundEntryNumber = (value) => (value % 2 === 0 ? value / 2 : (value + 1) / 2);

let round;
for (
  round = 1;
  Math.abs(jimin - hansoo) !== 1 || Math.min(jimin, hansoo) % 2 !== 1;
  round += 1
) {
  jimin = getNextRoundEntryNumber(jimin);
  hansoo = getNextRoundEntryNumber(hansoo);
}

console.log(round);
