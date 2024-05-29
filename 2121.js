/*
점 하나를 찍고 그걸 좌하단 점이라 친 다음, 나머지 세 점이 있는지 확인하면 되는 문제
점 유무는 모든 점을 set에서 관리하면 판별 가능
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, [width, height], ...points] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const pointSet = new Set(points.map(([x, y]) => `${x} ${y}`));
let sol = 0;

points.forEach(([x, y]) => {
  if (
    pointSet.has(`${x + width} ${y}`) &&
    pointSet.has(`${x} ${y + height}`) &&
    pointSet.has(`${x + width} ${y + height}`)
  ) {
    sol += 1;
  }
});

console.log(sol);
