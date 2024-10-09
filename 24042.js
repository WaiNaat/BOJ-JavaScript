/*
아 결국 이 문제를 풀게되는구나

dp는 탐색순서가 불분명해서 안될거같음
-> 다익

push
  배열 맨 뒤에 넣기
  부모 끌어내리기
pop
  배열 맨 앞 제거
  배열 맨 뒤 제거 후 기억
  자식 끌어올리기
  빈 리프에 기억한거 넣기
  부모 끌어내리기
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[areaCount, crosswalkPeriod], ...greenLights] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// 힙 구현
class Heap {
  /**
   * @param compareFn `(target, compare) => boolean`, returns true if target has strictly more priority than compare
   */
  constructor(compareFn) {
    this.list = [null];
    this.isPrior = compareFn;
  }

  isEmpty() {
    return this.list.length === 1;
  }

  push(val) {
    this.list.push(val);
    this.pullParentDown(this.list.length - 1);
  }

  pop() {
    if (this.isEmpty()) return undefined;

    const first = this.list[1];
    const last = this.list.pop();

    if (this.isEmpty()) return first;

    const leaf = this.fillEmptyAndReturnEmptyLeaf(1);
    this.list[leaf] = last;
    this.pullParentDown(leaf);

    return first;
  }

  pullParentDown(startPos) {
    let cur;
    const target = this.list[startPos];

    for (
      cur = startPos;
      cur > 1 && this.isPrior(target, this.list[Math.floor(cur / 2)]);
      cur = Math.floor(cur / 2)
    ) {
      this.list[cur] = this.list[Math.floor(cur / 2)];
    }

    this.list[cur] = target;
  }

  fillEmptyAndReturnEmptyLeaf(startPos) {
    let empty = startPos;

    while (empty * 2 < this.list.length) {
      const left = empty * 2;
      const right = left + 1;
      const leftValue = this.list[left];
      const rightValue = this.list[right];

      if (right >= this.list.length) {
        this.list[empty] = leftValue;
        empty = left;
        continue;
      }

      if (this.isPrior(leftValue, rightValue)) {
        this.list[empty] = leftValue;
        empty = left;
      } else {
        this.list[empty] = rightValue;
        empty = right;
      }
    }

    return empty;
  }
}

// 연결된 횡단보도 목록
const next = Array.from({ length: areaCount + 1 }, () => []);
greenLights.forEach(([start, end], idx) => {
  next[start].push({ pos: end, order: idx });
  next[end].push({ pos: start, order: idx });
});

// 다음 파란불 시간 계산
const getNextGreenLightTime = (curTime, orderInGreenLights) => {
  const curOrder = curTime % crosswalkPeriod;
  return (
    curTime - curOrder + orderInGreenLights + (curOrder > orderInGreenLights ? crosswalkPeriod : 0)
  );
};

// 풀이
const h = new Heap((target, compare) => {
  return target.time < compare.time;
});
h.push({ pos: 1, time: 0 });

let sol;
const visited = new Set();
while (!h.isEmpty()) {
  const curData = h.pop();
  const { pos: cur, time } = curData;

  if (cur === areaCount) {
    sol = time;
    break;
  }

  if (visited.has(cur)) {
    continue;
  }
  visited.add(cur);

  next[cur].forEach(({ pos, order }) => {
    const nextPosArriveTime = getNextGreenLightTime(time, order) + 1;
    h.push({ pos, time: nextPosArriveTime });
  });
}

console.log(sol);
