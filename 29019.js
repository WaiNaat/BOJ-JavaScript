/* 
cur := 연초 내 자산
next := 연말 내 자산
(cur - c) * (1 + r%) = next

테케당 계산 10만번 + 테케 50개
  -> 계산 자체는 그냥 하면 됨

log2(100_000년 * 생활비 1_000_000_000원) < 47
  -> 이분탐색 가능

빅인트 아슬아슬하게 안써도될듯?
뭐야 8초나주네
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const tests = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

tests.pop();

const isPossible = (money, year, cost, rate) => {
  let left = money;

  for (let y = 0; y < year; y += 1) {
    left -= cost;
    if (left < 0) return false;
    left = Math.floor((left * (100 + rate)) / 100);
  }

  return true;
};

const findMinimumMoney = (year, cost, rate) => {
  let left = 0;
  let right = year * cost + 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (isPossible(mid, year, cost, rate)) right = mid;
    else left = mid + 1;
  }

  return left;
};

const sol = tests.map(([year, cost, rate]) => {
  return findMinimumMoney(year, cost, rate);
});

console.log(sol.join('\n'));
