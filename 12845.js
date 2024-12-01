/*
카드 합성 시 하나가 살고 하나가 죽음
죽는 카드는 최종 골드에 한 번만 기여를 할 수 있음
죽지 않는 카드는 최종 골드에 여러 번 기여할 수 있음
가장 레벨이 높은 카드를 계속 살리면 이득
-> 가장 레벨이 높은 카드가 본인 옆에거를 마지막까지 잡아먹으면 됨
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [cardCount, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const max = Math.max(...cards);
const sum = cards.reduce((sum, cur) => sum + cur, 0);
const sol = sum - max + max * (cardCount - 1);

console.log(sol);
