/*
투포인터같은데 흠..
색이 아홉 종류구나

9팩이 36만정도니까 조합으로 찾기는 좀 그럼

이분탐색 슬라이딩윈도우?
가능하면 -> 늘림
불가능하면 -> 줄임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...fruits] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const isPossible = (length) => {
  const counts = {};
  const used = new Set();

  for (let i = 0; i < length; i += 1) {
    counts[fruits[i]] ??= 0;
    counts[fruits[i]] += 1;
    used.add(fruits[i]);
  }

  if (used.size <= 2) return true;

  for (let i = length; i < fruits.length; i += 1) {
    counts[fruits[i - length]] -= 1;
    if (counts[fruits[i - length]] === 0) used.delete(fruits[i - length]);

    counts[fruits[i]] ??= 0;
    counts[fruits[i]] += 1;
    used.add(fruits[i]);

    if (used.size <= 2) return true;
  }

  return false;
};

let left = 2;
let right = fruits.length + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (isPossible(mid)) left = mid + 1;
  else right = mid;
}

console.log(left - 1);
