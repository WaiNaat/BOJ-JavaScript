// 틀렸습니다ㅠㅠ

/*
프림 알고리즘
  우순큐에서 가장 싼 간선 뽑기
    단, 양 끝 중 하나는 트리에 있고 하나는 없어야 함
  두 정점을 mst에 넣기
  새로운 정점에서 뻗어나오는 간선들 우순큐에 넣기

일단 본인의 최소비용을 가중치라 치고 mst를 만들 수 있음
당선된 애들끼리 조작해서 합을 맞춤
나머지는 알빠 아니니까 그냥 최대비용으로 설정

합을 맞출 때는
  아무리 비싸져도 '나머지' 중에 제일 싼 애들보다 비싸면 안 됨
    같아도 되나? 아?마?도?
  당선자끼리는 섞여도 되나? 아마도

우순큐
넣기
  배열 맨 뒤에
  부모 끌어내리기
빼기
  배열 맨앞 제거
  맨뒤 제거후 기억
  빈자리 메우기
  리프에 기억한거 넣기
  부모 끌어내리기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[nodeCount, edgeCount, targetCost], ...edgeInfos] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const edges = Array.from({ length: nodeCount + 1 }).map(() => []);
edgeInfos.forEach(([one, another, min, max], index) => {
  edges[one].push([another, min, max, index]);
  edges[another].push([one, min, max, index]);
});

class Heap {
  list = [null]; // Array<[node, min, max, edgeInfoIndex]>
  length = 0;

  push(value) {
    this.list.push(value);
    this.length += 1;
    this.pullParentsDown(this.length);
  }

  pop() {
    if (!this.length) return null;

    const deleted = this.list[1];
    const last = this.list.pop();
    this.length -= 1;

    if (!this.length) return deleted;

    const leaf = this.fillEmpty();
    this.list[leaf] = last;
    this.pullParentsDown(leaf);

    return deleted;
  }

  pullParentsDown(start) {
    let me = start;
    const myValue = this.list[me];

    while (me > 1) {
      const parent = Math.floor(me / 2);

      if (!this.isLeftSmaller(me, parent)) break;

      this.list[me] = this.list[parent];
      me = parent;
    }

    this.list[me] = myValue;
  }

  fillEmpty() {
    let empty = 1;

    while (empty * 2 <= this.length) {
      const left = empty * 2;
      const right = left + 1;
      const smaller = right > this.length || this.isLeftSmaller(left, right) ? left : right;

      this.list[empty] = this.list[smaller];
      empty = smaller;
    }

    return empty;
  }

  isLeftSmaller(left, right) {
    if (this.list[left][1] > this.list[right][1]) return false;
    if (this.list[left][1] === this.list[right][1] && this.list[left][2] >= this.list[right][2])
      return false;
    return true;
  }
}

const h = new Heap();
const visited = new Set([1]);
const mst = [];
const costs = new Array(edgeCount);
let curCost = 0;

edges[1].forEach((value) => h.push(value));

while (h.length) {
  const [node, min, , index] = h.pop();

  if (visited.has(node)) continue;
  visited.add(node);

  curCost += min;
  costs[index] = min;
  mst.push(index);

  edges[node].forEach((value) => {
    if (visited.has(value[0])) return;
    h.push(value);
  });
}

let maxAllowed = Infinity;
for (let i = 0; i < costs.length; i += 1) {
  if (costs[i] === undefined) {
    costs[i] = edgeInfos[i][3];
    maxAllowed = Math.min(maxAllowed, edgeInfos[i][3])
  }
}

mst.forEach((edgeIndex) => {
  if (curCost < targetCost) {
    const available = edgeInfos[edgeIndex][3] - edgeInfos[edgeIndex][2];
    const added = Math.min(targetCost - curCost, available, maxAllowed);
    curCost += added;
    costs[edgeIndex] += added;
  }
});

console.log(curCost === targetCost ? `YES\n${costs.join('\n')}` : 'NO');
