/*
일단 최대맥박까지 운동한다
1분 운동할만큼 쉬고 1분 운동 반복
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [targetTime, min, max, increase, decrease] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let time;
let exerciseTime = 0;
let heartbeat = min;

for (time = 0; exerciseTime < targetTime; time += 1) {
  if (min + increase > max) break;
  if (heartbeat + increase <= max) {
    heartbeat += increase;
    exerciseTime += 1;
  } else {
    heartbeat = Math.max(min, heartbeat - decrease);
  }
}

console.log(exerciseTime === targetTime ? time : -1);
