/*
max(c_i)=10억이므로 단순 시뮬레이션 불가능

버스 기다리기 시작한 시각이 주어졌을 때 탑승 시각을 알아야 한다
  -> 누적합으로 1번 지점부터 어떤 지점까지 걸리는 시간을 구한다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, movingTimes, ...soldiers] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const timeSums = [0, 0];
movingTimes.forEach((time, idx) => timeSums.push(timeSums[idx + 1] + time));

const cycleTime = timeSums.pop();

const findNearestBoardingTime = (waitStartTime, busStop) => {
  const time = waitStartTime % cycleTime;
  const waitingTime = timeSums[busStop] - time + (timeSums[busStop] < time ? cycleTime : 0);
  return waitStartTime + waitingTime;
};

let sol = 0;
soldiers.forEach(([from, to, waitStartTime]) => {
  const boardingTime = findNearestBoardingTime(waitStartTime, from);
  const movingTime =
    from < to ? timeSums[to] - timeSums[from] : cycleTime - (timeSums[from] - timeSums[to]);
  const dropoffTime = boardingTime + movingTime;
  if (sol < dropoffTime) sol = dropoffTime;
});

console.log(sol);
