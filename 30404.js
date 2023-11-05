/*
여러 꽥꽥에 박수 한번만 치는게 유리함
  -> 박수는 가능한 한 늦게 쳐서 최대한 겹치게 하기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, timeLimit, ...quacks] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let clapCount = 0;
let lastClapTime = 0;

quacks.forEach((quack) => {
  if (quack <= lastClapTime) return;

  clapCount += 1;
  lastClapTime = quack + timeLimit;
});

console.log(clapCount);
