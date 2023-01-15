/*
어떤 칸과 상어의 안전 거리
  일단 대각선으로 이동한 후 나머지를 수직수평으로 이동
  >> 수직거리와 수평거리 중 큰 거리만큼만 이동하는 셈
각 상어의 좌표를 구하면 굳이 그래프 탐색할 필요 없음
공간의 크기가 넓어야 2500이기 때문에 완전탐색 가능
*/
const SHARK = 1;

const findSharkPositions = (row, col, space) => {
  const positions = [];
  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < col; c += 1) {
      if (space[r][c] === SHARK) positions.push([r, c]);
    }
  }
  return positions;
};

const distance = (position1, position2) => {
  const rowDistance = Math.abs(position1[0] - position2[0]);
  const colDistance = Math.abs(position1[1] - position2[1]);
  return Math.max(rowDistance, colDistance);
};

const safeDistance = (r, c, positions) => {
  let result = Infinity;
  positions.forEach((position) => { result = Math.min(distance([r, c], position), result); });
  return result;
};

const findMaxSafeDistance = (row, col, positions) => {
  let result = 0;
  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < col; c += 1) {
      result = Math.max(safeDistance(r, c, positions), result);
    }
  }
  return result;
};

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[row, col], ...space] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const positions = findSharkPositions(row, col, space);
const maxSafeDistance = findMaxSafeDistance(row, col, positions);

// output
console.log(maxSafeDistance);
