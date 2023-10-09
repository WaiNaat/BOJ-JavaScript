/*
우순큐 bfs

push
  새로 들어온 값은 배열 맨 뒤에
  이후 부모를 끌어내림
pop
  맨 앞의 값을 비웠다 치고
  맨 뒤의 값은 빼놓고 기억
  빈 공간 채워나가기
  이후 마지막 빈 공간에 빼놓았던 값 넣고 끌어내리기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[R, C], ...farm] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const [harvestCount] = farm.pop();

class Heap {
  list = [null];

  isEmpty() {
    return this.list.length === 0;
  }

  push(corn, r, c) {
    this.list.push([corn, r, c]);
    this.pullParentDown(this.list.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;

    const target = this.list[1];
    const lastValue = this.list.pop();

    if (this.isEmpty()) return target;

    const emptyLeaf = this.fillEmptyNodes();
    this.list[emptyLeaf] = lastValue;
    this.pullParentDown(emptyLeaf);

    return target;
  }

  pullParentDown(start) {
    let myPos = start;
    const me = this.list[start];
    const [myCorn] = me;

    while (myPos > 1) {
      const parentPos = Math.floor(myPos / 2);
      const parent = this.list[parentPos];
      const [parentCorn] = parent;

      if (myCorn <= parentCorn) break;

      this.list[myPos] = parent;
      myPos = parentPos;
    }

    this.list[myPos] = me;
  }

  fillEmptyNodes() {
    let emptyPos = 1;

    while (emptyPos * 2 < this.list.length) {
      const leftChildPos = emptyPos * 2;
      const leftChild = this.list[leftChildPos];
      const [leftChildCorn] = leftChild;

      const rightChildPos = leftChildPos + 1;
      const rightChild = this.list[rightChildPos] ?? [-Infinity];
      const [rightChildCorn] = rightChild;

      if (leftChildCorn > rightChildCorn) {
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

const heap = new Heap();

for (let r = 0; r < R; r += 1) {
  heap.push(farm[r][0], r, 0);
  heap.push(farm[r][C - 1], r, C - 1);
}
for (let c = 1; c < C - 1; c += 1) {
  heap.push(farm[0][c], 0, c);
  heap.push(farm[R - 1][c], R - 1, c);
}

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
const visited = Array.from({ length: R }).map(() => new Array(C));
const sol = [];
let count = 0;

while (count < harvestCount) {
  const [, r, c] = heap.pop();

  if (visited[r][c]) continue;
  visited[r][c] = true;

  sol.push(`${r + 1} ${c + 1}`);
  count += 1;

  DIRECTIONS.forEach(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= R || c2 < 0 || c2 >= C) return;

    heap.push(farm[r2][c2], r2, c2);
  });
}

console.log(sol.join('\n'));
