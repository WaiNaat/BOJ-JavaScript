/*
시계 많아봤자 1500개
근데 'R분'은 대체 뭐지?

1500^2=225만

시계가 1개일 때, 2개일 때, ...이렇게 센다면?
  1500^3=33억ㅋㅋ

첫 시간과 임의의 시간 하나를 골라서 R값을 고정한다. O(N)
다음 시간 기록에 대해 시계들을 순회한다 O(N)
총 시간 기록 O(N)
  -> 무조건 시간초과

1. R값을 하나 정한다.
2. 각 시간 기록에 대해 index와 R을 이용하면 초기 시간을 역산할 수 있다.
3. 초기 시간의 개수를 센다.
*/
const toMinutes = (timeString) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return (hour - 1) * 60 + minute;
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...times] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(toMinutes);

const MAX_TIME = 12 * 60;

let sol = Infinity;

for (let gap = 1; gap <= MAX_TIME; gap += 1) {
  const initialTimes = new Set();
  times.forEach((time, index) => {
    initialTimes.add((time + MAX_TIME * index - gap * index) % MAX_TIME);
  });
  sol = Math.min(initialTimes.size, sol);
}

console.log(sol);
