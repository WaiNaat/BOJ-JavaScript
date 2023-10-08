/*
일종의 방향 그래프 최단거리 알고리즘같은데 흠..

(r, c, 변신X) -> (4방향, 변신X)
  비용 1
(r, c, 변신X) -> (r, c, 변신O)
  비용 t
(r, c, 변신O) -> (4방향에서가장가까운워프지점, 변신O)
  비용 1
(r, c, 변신O) -> (r, c, 변신X)
  비용 0

4방향에서가장가까운워프지점 을 빨리구하는법은 없나?

다익스트라
1. 우순큐에서 가장 이동비용이 작은거 뽑기
  1-1. 방문하지 않았다면 방문처리 후 진행
  1-2. 방문했다면 무시하고 다시 1번으로 돌아감
2. 뽑은것들의 각 인접 꼭짓점마다
  2-1. 방문했다면 무시
  2-2. 방문하지 않았다면 이동비용 계산해서 우순큐에 넣기
3. 반복

우순큐 (python heapq 구현법 사용)
push
  배열 맨 끝에 넣고 부모가 자기보다 비용이 크면 끌어내림
pop
  배열 맨 앞에 지우고 맨 뒤에 뽑아서 기억
  빈자리는 그 두 자식들 중 더 비용이 작은 애로 올림
  마지막 빈자리에 아까 뽑았던 친구 넣고 부모 끌어내리기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [info, ...board] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

class Heap {
  list = [null];

  isEmpty() {
    return this.list.length === 1;
  }

  push(cost, r, c, isTransformed) {
    this.list.push([cost, r, c, isTransformed]);
    this.pullParentDown(this.list.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;

    const value = this.list[1];
    const lastValue = this.list.pop();

    if (this.isEmpty()) return value;

    const leafNode = this.fillEmptySpace();
    this.list[leafNode] = lastValue;
    this.pullParentDown(leafNode);

    return value;
  }

  pullParentDown(start) {
    let myPos = start;
    const [myCost, ...myPosition] = this.list[myPos];

    while (myPos > 1) {
      const parentPos = Math.floor(myPos / 2);
      const [parentCost] = this.list[parentPos];

      if (myCost >= parentCost) break;

      this.list[myPos] = this.list[parentPos];
      myPos = parentPos;
    }

    this.list[myPos] = [myCost, ...myPosition];
  }

  fillEmptySpace() {
    if (this.isEmpty()) return 0;

    let emptyPos = 1;

    while (emptyPos * 2 < this.list.length) {
      const leftChildPos = emptyPos * 2;
      const rightChildPos = leftChildPos + 1;

      const leftChild = this.list[leftChildPos];
      const rightChild = this.list[rightChildPos];

      if (!leftChild && !rightChild) return emptyPos;

      const leftChildCost = leftChild ? leftChild[0] : Infinity;
      const rightChildCost = rightChild ? rightChild[0] : Infinity;

      if (leftChildCost < rightChildCost) {
        this.list[emptyPos] = leftChild;
        emptyPos = leftChildPos;
      } else {
        this.list[emptyPos] = rightChild;
        emptyPos = rightChildPos;
      }
    }

    return emptyPos;
  }
}

const [boardSize, transformCost, ...targetPos] = info.split(' ').map(Number);
const [targetR, targetC] = targetPos.map((value) => value - 1);
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const findNearestWarpPoints = (r, c) => {
  const points = [];

  DIRECTIONS.forEach(([dr, dc]) => {
    let r2 = r + dr;
    let c2 = c + dc;

    while (r2 >= 0 && r2 < boardSize && c2 >= 0 && c2 < boardSize) {
      if (board[r2][c2] === '#') {
        points.push([r2, c2]);
        return;
      }

      r2 += dr;
      c2 += dc;
    }
  });

  return points;
};

const visited = new Set();
const toVisitedEntity = (r, c, isTransformed) => `${r},${c},${isTransformed ? 'O' : 'X'}`;
const heap = new Heap();
let sol;

heap.push(0, 0, 0, false, '-');

while (!heap.isEmpty()) {
  const [turnCount, r, c, isTransformed] = heap.pop();

  if (r === targetR && c === targetC) {
    sol = turnCount;
    break;
  }

  if (visited.has(toVisitedEntity(r, c, isTransformed))) continue;
  visited.add(toVisitedEntity(r, c, isTransformed));

  if (isTransformed) {
    // 워프 지점으로 이동
    findNearestWarpPoints(r, c).forEach(([r2, c2]) => {
      heap.push(turnCount + 1, r2, c2, true);
    });

    // 변신 해제
    heap.push(turnCount, r, c, false);
  } else {
    // 주변으로 한 칸 이동
    DIRECTIONS.forEach(([dr, dc]) => {
      const r2 = r + dr;
      const c2 = c + dc;

      if (r2 < 0 || r2 >= boardSize || c2 < 0 || c2 >= boardSize) return;

      heap.push(turnCount + 1, r2, c2, false);
    });

    // 변신
    heap.push(turnCount + transformCost, r, c, true);
  }
}

console.log(sol);
