// 메모리 초과

/*
간선의 수가 대략 1백만 개인 그래프
최대깊이가 k인 dfs
  중간급유 기회를 다 썼으면 다음은 무조건 도착지
  중간급유가 가능할 경우 무조건 급유 (방문하되 급유하지 않는건 손해)
  최대깊이가 정해져있기 때문에 중복방문 막을필요 X
O(V+E)니까 할만한듯

노드 콜스택 크기때문에 재귀X
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, maxStopoverCount], ...airports] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getFuel = (startX, startY, endX, endY) => {
  const distance = Math.sqrt((startX - endX) ** 2 + (startY - endY) ** 2);
  return Math.floor(distance / 10) + (distance % 10 === 0 ? 0 : 1);
};

const stack = [
  {
    x: 0,
    y: 0,
    stopoverCount: 0,
    maxFuel: 0,
  },
];

let sol = Infinity;
while (stack.length > 0) {
  const { x, y, stopoverCount, maxFuel } = stack.pop();

  if (x === 10000 && y === 10000) {
    if (maxFuel < sol) sol = maxFuel;
  } else {
    stack.push({
      x: 10000,
      y: 10000,
      maxFuel: Math.max(maxFuel, getFuel(x, y, 10000, 10000)),
      stopoverCount,
    });

    if (stopoverCount < maxStopoverCount) {
      airports.forEach(([nextX, nextY]) => {
        if (x === nextX && y === nextY) return;
        stack.push({
          x: nextX,
          y: nextY,
          stopoverCount: stopoverCount + 1,
          maxFuel: Math.max(maxFuel, getFuel(x, y, nextX, nextY)),
        });
      });
    }
  }
}

console.log(sol);
