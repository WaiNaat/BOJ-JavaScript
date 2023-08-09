/*
인부의 수가 중요한가? 글쎄
  한 명이 열 개 나르나 열 명이 한 개씩 나르나
  회사 입장에서 드는 비용은 같음

가능한 한 낮은 층의 물건을
가능한 한 낮은 층으로 옮긴다.

옮기는 개수 = min(물건 개수, 목표건물 수용량)
각 건물별로 옮기는 개수만큼 옮길 때 비용 계산하기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [fromHeight, , , ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const fromItems = inputs.slice(0, fromHeight);
const toItems = inputs.slice(fromHeight);

const arraySum = (array) => array.reduce((prev, cur) => prev + cur, 0);

const getMoveCost = (array, moveCount) => {
  let remainderCount = moveCount;
  let cost = 0;

  for (let i = 0; i < array.length; i += 1) {
    if (remainderCount <= array[i]) {
      cost += remainderCount * (i + 1);
      return cost;
    }

    cost += array[i] * (i + 1);
    remainderCount -= array[i];
  }

  return cost;
};

const moveCount = Math.min(arraySum(fromItems), arraySum(toItems));
const costFrom = getMoveCost(fromItems, moveCount);
const costTo = getMoveCost(toItems, moveCount);

console.log(moveCount, costFrom + costTo);
