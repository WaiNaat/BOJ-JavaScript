// 시간 초과

/*
다익스트라 여러번하는문제?
  -> 다익은 O(E log V)
  -> 5000 * 5000 * log 1000 = 25,000,000 * 10
1초는 너무 짧아

모든 경로를 한번씩 막아보는 게 아니라
아무런 방해가 없을때 지나는 최적경로에서 하나씩 막기?

우순큐 구현
넣기
  배열 맨 뒤에 넣기
  부모 끌어내리기
빼기
  배열 맨 앞에거 빼기
  배열 맨 뒤에거 빼서 기억
  자식 끌어올리기로 빈자리 채우기
  마지막 남은 빈자리에 기억한거 넣기
  부모 끌어내리기
*/
class Heap {
  list = [null];
  length = 0;

  push(vertex, cost, prev) {
    this.list.push([vertex, cost, prev]);
    this.length += 1;
    this.pullParentDown(this.length);
  }

  pop() {
    if (!this.length) return null;

    const deleted = this.list[1];
    const last = this.list.pop();
    this.length -= 1;

    if (!this.length) return deleted;

    const leaf = this.fillEmpty();
    this.list[leaf] = last;
    this.pullParentDown(leaf);

    return deleted;
  }

  pullParentDown(start) {
    let me = start;
    const myValue = this.list[start];

    while (me > 1) {
      const parent = Math.floor(me / 2);
      const parentValue = this.list[parent];

      if (parentValue[1] <= myValue[1]) break;

      this.list[me] = parentValue;
      me = parent;
    }

    this.list[me] = myValue;
  }

  fillEmpty() {
    let empty = 1;

    while (empty * 2 <= this.length) {
      const left = empty * 2;
      const right = left + 1;

      const smaller =
        right > this.length || this.list[left][1] <= this.list[right][1] ? left : right;
      this.list[empty] = this.list[smaller];
      empty = smaller;
    }

    return empty;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[cityCount], ...roads] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const next = Array.from({ length: cityCount + 1 }).map(() => []);

roads.forEach(([one, another, cost]) => {
  next[one].push([another, cost]);
  next[another].push([one, cost]);
});

const getCost = (ban1, ban2, getPath) => {
  const visited = new Array(cityCount + 1).fill(0);
  const h = new Heap();

  h.push(1, 0, Infinity);

  while (h.length) {
    const [from, totalCost, prev] = h.pop();

    if (visited[from] > 0) continue;
    visited[from] = prev;

    if (from === cityCount) {
      const path = [];

      if (getPath) {
        let cur = cityCount;
        while (cur !== Infinity) {
          path.push(cur);
          cur = visited[cur];
        }
        return [totalCost, path];
      }

      return totalCost;
    }

    next[from].forEach(([to, cost]) => {
      if ((from === ban1 && to === ban2) || (from === ban2 && to === ban1)) return;
      h.push(to, totalCost + cost, from);
    });
  }

  return Infinity;
};

const [normalCost, path] = getCost(0, 0, true);
let maxCost = normalCost;

for (let i = 0; i < roads.length - 1 && maxCost < Infinity; i += 1) {
  maxCost = Math.max(maxCost, getCost(path[i], path[i + 1]));
}

const sol = maxCost - normalCost;
console.log(sol === Infinity ? -1 : sol);
