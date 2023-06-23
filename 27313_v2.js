/*
5 4 3
1 1 3 3 3

1 1
3 3 3
이렇게 봐야 함

1 1 3
이렇게는 못 봄

-----

5 2 2
1 1 1 1 2

1 1
1 1
이렇게 봐야 함

1 2
이렇게는 못 봄

-----

일단 애니 오름차순 정렬

숫자가 너무 커서 2차원 dp는 안됨

마지막에 볼 가장 긴 애니를 확정하면 무조건 K개씩 묶어서 보는게 이득

opt(i) := i번째 애니를 반드시 마지막에 볼때 M시간 내로 볼 수 있는 최대 애니 개수
time(i) := i번째 애니를 반드시 마지막에 볼때 걸리는 최소 시간

time(i) = time(i - K) + (i번째 애니 시간)
  i-K<0이면 time(i-K)=0

opt(i) = opt(i - K) + min(K, i)
  i-K<0이면 opt(i-K)=0
  time(i) > (시간제한)이면 opt(i)=0
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [animeCount, timeLimit, threadCount, ...animeTimes] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

animeTimes.sort((a, b) => a - b);

const watchableCounts = [];
const totalTimes = [];

for (let i = 0; i < animeCount; i += 1) {
  const time = (totalTimes[i - threadCount] || 0) + animeTimes[i];
  const count = i - threadCount ? i + 1 : watchableCounts[i - threadCount] + threadCount;

  if (time > timeLimit) break;

  totalTimes.push(time);
  watchableCounts.push(count);
}

console.log(watchableCounts.length ? watchableCounts.pop() : 0);
