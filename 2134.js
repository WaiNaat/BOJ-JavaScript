// 시간 초과
// 아니 입력값 받는 양식이 틀렸는데 어케 시간초과가나온거임???

/*
인부의 수가 중요한가? 글쎄
  한 명이 열 개 나르나
  열 명이 한 개씩 나르나
  회사 입장에서 드는 비용은 같음

가능한 한 낮은 층의 물건을
가능한 한 낮은 층으로 옮긴다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[floorCountFrom, floorCountTo], itemsFrom, itemsTo] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let movedItemCount = 0;
let cost = 0;
let floorFrom = 0;
let floorTo = 0;

while (floorFrom < floorCountFrom && floorTo < floorCountTo) {
  if (itemsFrom[floorFrom] === 0) floorFrom += 1;
  if (itemsTo[floorTo] === 0) floorTo += 1;

  if (floorFrom === floorCountFrom || floorTo === floorCountTo) break;

  const moveCount = Math.min(itemsFrom[floorFrom], itemsTo[floorTo]);
  itemsFrom[floorFrom] -= moveCount;
  itemsTo[floorTo] -= moveCount;

  cost += (floorFrom + floorTo + 2) * moveCount;
  movedItemCount += moveCount;
}

console.log(movedItemCount, cost);
