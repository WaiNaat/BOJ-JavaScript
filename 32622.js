/*
같은색끼리 뭉쳐놓기
본인 바로 직전 뭉탱이 개수 + 본인 개수 = 1회 뒤집은 후 총 점수
  두 번째 전 뭉탱이도 뒤집어지기 때문에 본인과 같은 색이 되지 않음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map((value) => value === '1');

const groups = [];
cards.forEach((isFront, idx) => {
  if (cards.at(idx - 1) === isFront) {
    groups.push((groups.pop() ?? 0) + 1);
  } else {
    groups.push(1);
  }
});

let max = 0;
groups.forEach((group, idx) => {
  max = Math.max((groups[idx - 1] ?? 0) + group, max, group);
});

console.log(max);
