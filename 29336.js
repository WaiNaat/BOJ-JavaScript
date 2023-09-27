/*
그리디

만들어야 하는 문제의 개수에는 제한이 없음
  -> 한 문제를 강하게 키운다고 생각
하루가 지나면 역량이 올라감
  -> 최대한 기다렸다가 마지막에 몰아서 만드는 게 이득
T_i일에 가장 역량 높은 사람이 한 명씩 기여
  -> 역량이 매일 균등하게 오르기 때문에 최대한 적은 인원으로 조건을 만족해야함
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, abilities, ...requirements] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

abilities.sort((one, another) => one - another);

let finalQuality = 0;

requirements.forEach(([time, requirement]) => {
  while (abilities.length && finalQuality < requirement) {
    finalQuality += abilities.pop() + time;
  }

  if (finalQuality < requirement) {
    finalQuality = -Infinity;
  }
});

while (abilities.length) {
  finalQuality += abilities.pop() + requirements[requirements.length - 1][0];
}

console.log(finalQuality > 0 ? finalQuality : -1);
