/*
cost(i, 옮기는법) := i번 구간에서 옮기는법 으로 옮길 때 드는 비용
opt(i, 옮기는법) :=
  처음부터 i번 구간까지 돌을 옮기는데
  마지막에는 옮기는법 으로 옮길 때 드는 최소비용

opt(i, 끌고가기) =
  opt(i-1, 끌고) + cost(i, 끌고)
  opt(i-1, 들고) + cost(i, 끌고) + 추가비용
  둘 중 더 작은 값

opt(i, ?) 를 계산할 때 opt(i-1, ?) 만 필요하므로
opt를 배열로 유지할 필요 없음
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[sectionCount, changeCost], dragCosts, liftCosts] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let lastDragCost = dragCosts[0];
let lastLiftCost = liftCosts[0];

for (let section = 1; section < sectionCount; section += 1) {
  const nextDragCost = dragCosts[section] + Math.min(lastDragCost, lastLiftCost + changeCost);
  const nextLiftCost = liftCosts[section] + Math.min(lastLiftCost, lastDragCost + changeCost);

  lastDragCost = nextDragCost;
  lastLiftCost = nextLiftCost;
}

console.log(Math.min(lastDragCost, lastLiftCost));
