// 틀렸습니다

/*
걸리는 시간: 1 1 3 3 3
동시에: 3개까지
주어진 시간: 4시간

1 1
3 3 3
이렇게 봐야 함

1 1 3
이렇게는 못 봄

-----

걸리는 시간: 1 1 1 1 2
동시에: 2개까지
주어진 시간: 2시간

1 1
1 1
이렇게 봐야 함

1 2
이렇게는 못 봄

-----

일단 애니 정렬

숫자가 너무 커서 2차원 dp는 안됨

마지막에 볼 가장 긴 애니를 확정하면 무조건 K개씩 보는게 이득
-> O(i)로 i번째 애니를 반드시 마지막에 볼때 볼 수 있는 개수 계산가능

움직이는 값: 마지막에 보는 가장 긴 애니
기준점: M시간동안 볼 수 있는 애니 수
비교값: 마지막에 보는 애니를 더 짧은 시간으로 / 긴 시간으로 했을 때 볼 수 있는 애니 수

비교값 두 개 중 더 큰 쪽으로 이동
같으면? 더 긴 애니?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [animeCount, timeLimit, threadCount, ...animeTimes] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

animeTimes.sort((a, b) => a - b);

const countWatchableAnime = (lastAnime) => {
  let time = 0;
  let count = 0;
  let idx = lastAnime;

  while (idx >= 0 && idx < animeCount) {
    time += animeTimes[idx];

    if (time > timeLimit) break;

    count += Math.min(threadCount, idx + 1);
    idx -= threadCount;
  }

  return count;
};

const getMid = (left, right) => Math.floor((left + right) / 2);

let left = 0;
let right = animeCount;

while (left < right) {
  const mid = getMid(left, right);

  if (countWatchableAnime(getMid(left, mid)) > countWatchableAnime(getMid(mid, right))) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(countWatchableAnime(left - 1));
