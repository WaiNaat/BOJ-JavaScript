/*
그냥 구현이잖아
x, y, d1, d2를 정했을 때 올바른지 확인하는 함수
임의의 좌표가 속하는 구역을 구하는 함수
  그냥 예제 그림을 보고 직접 노가다하기
  (문제 조건에 적힌 범위 부등식만으로는 함수를 만들 수 없음)
20^4=160000
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[size], ...city] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// x, y는 1-indexed 좌표
const isValidBoundary = (x, y, d1, d2) =>
  d1 >= 1 && d2 >= 1 && x >= 1 && x + d1 + d2 <= size && y - d1 >= 1 && y + d2 <= size;

// x, y는 1-indexed 좌표
function* generateAreaBoundary() {
  for (let x = 1; x <= size; x += 1) {
    for (let y = 1; y <= size; y += 1) {
      for (let d1 = 1; d1 < size; d1 += 1) {
        for (let d2 = 1; d2 < size; d2 += 1) {
          if (isValidBoundary(x, y, d1, d2)) {
            yield { x, y, d1, d2 };
          }
        }
      }
    }
  }
}

const getAreaName = (boundaryData) => {
  const { x, y, d1, d2 } = boundaryData;
  const areaName = Array.from({ length: size }, () => Array.from({ length: size }, () => 4));

  for (let r = 1; r < x + d1; r += 1) {
    for (let c = 1; c <= y - (r < x ? 0 : r - x + 1); c += 1) {
      areaName[r - 1][c - 1] = 0;
    }
  }

  for (let r = 1; r <= x + d2; r += 1) {
    for (let c = y + 1 + (r <= x ? 0 : r - x); c <= size; c += 1) {
      areaName[r - 1][c - 1] = 1;
    }
  }

  for (let r = x + d1; r <= size; r += 1) {
    for (let c = 1; c < y - d1 + d2 - (r >= x + d1 + d2 ? 0 : x + d1 + d2 - r); c += 1) {
      areaName[r - 1][c - 1] = 2;
    }
  }

  for (let r = x + d2 + 1; r <= size; r += 1) {
    for (let c = y - d1 + d2 + (r > x + d1 + d2 ? 0 : x + d1 + d2 - r + 1); c <= size; c += 1) {
      areaName[r - 1][c - 1] = 3;
    }
  }

  return areaName;
};

const getDiff = (boundaryData) => {
  const populations = Array.from({ length: 5 }, () => 0);
  const areaName = getAreaName(boundaryData);

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      populations[areaName[r][c]] += city[r][c];
    }
  }

  return Math.max(...populations) - Math.min(...populations);
};

let sol = Infinity;

for (const boundaryData of generateAreaBoundary()) {
  sol = Math.min(getDiff(boundaryData), sol);
}

console.log(sol);
