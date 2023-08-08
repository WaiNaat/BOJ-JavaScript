/*
현재 승률이 100%면 절대 승률이 변하지 않음
현재 승률이 99%면 절대 승률을 100%으로 만들 수 없음(버림이니까)
판수를 늘릴수록 승률이 오름

(Y+k)/(X+k) > Y/X
가 되는 첫 k를 구하는 문제

이분탐색으로 가시죠
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [totalCount, winCount] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const winRate = totalCount > 0 ? Math.floor((winCount * 100) / totalCount) : 0;
const getWinRate = (newGameCount) =>
  Math.floor(((winCount + newGameCount) * 100) / (totalCount + newGameCount));

let sol = -1;

if (winRate < 99) {
  let left = 1;
  let right = totalCount === 0 ? 2 : totalCount;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (getWinRate(mid) > winRate) right = mid;
    else left = mid + 1;
  }

  sol = left;
}

console.log(sol);
