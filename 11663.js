/*
일단 점 정렬
선분의 시작을 이분탐색
선분의 끝을 이분탐색
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, points, ...lines] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

points.sort((one, another) => one - another);

const findLeftIndex = (value) => {
  let left = 0;
  let right = points.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (value <= points[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

const findRightIndex = (value) => {
  let left = 0;
  let right = points.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (value < points[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

const sol = lines.map(([left, right]) => {
  return findRightIndex(right) - findLeftIndex(left);
});

console.log(sol.join('\n'));
