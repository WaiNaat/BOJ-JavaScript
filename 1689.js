/*
그리디

좌표가 20억개라 하나씩 보면 안 됨

선분 끝나는점이 빠른게 우선순위인 힙 준비
선분 시작순 정렬
1. 현재 좌표를 힙 꼭대기 친구의 끝나는 시간-1로 지정
2. 현재 좌표 이전에 선분이 시작되는애들 전부 힙에 넣기
3. 겹치는 개수 계산
4. 다음 선분 시작점 이전에 끝나는애들 힙에서 제거
5. 반복
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[length], ...lines] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

class Heap {
  /**
   * @param compareFn `(a, b) => boolean` returns true if `a` is strictly prior to `b`
   */
  constructor(compareFn) {
    this.list = [null];
    this.length = 0;
    this.isPrior = compareFn;
  }

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    return this.list[1];
  }

  push(val) {
    this.list.push(val);
    this.length += 1;
    this.pullParentDown(this.length);
  }

  pop() {
    if (this.isEmpty()) return undefined;

    const first = this.list[1];
    const last = this.list.pop();
    this.length -= 1;

    if (this.isEmpty()) return first;

    const leaf = this.fillEmptyAndReturnEmptyLeaf(1);
    this.list[leaf] = last;
    this.pullParentDown(leaf);

    return first;
  }

  pullParentDown(startPos, rootPos = 1) {
    const me = this.list[startPos];
    let cur;
    for (
      cur = startPos;
      cur > rootPos && this.isPrior(me, this.list[Math.floor(cur / 2)]);
      cur = Math.floor(cur / 2)
    ) {
      this.list[cur] = this.list[Math.floor(cur / 2)];
    }
    this.list[cur] = me;
  }

  fillEmptyAndReturnEmptyLeaf(emptyPos) {
    let cur = emptyPos;
    while (cur * 2 <= this.length) {
      const left = cur * 2;
      const right = left + 1;
      const leftChild = this.list[left];
      const rightChild = this.list[right];

      if (right > this.length || this.isPrior(leftChild, rightChild)) {
        this.list[cur] = leftChild;
        cur = left;
      } else {
        this.list[cur] = rightChild;
        cur = right;
      }
    }
    return cur;
  }
}

const h = new Heap((a, b) => a < b);

// 시작 내림차순 정렬 (뒤에서 pop 하면 오름차순이 됨)
lines.sort((a, b) => b[0] - a[0]);

let max = 0;

while (lines.length > 0) {
  while (lines.length > 0 && lines.at(-1)[0] < (h.peek() ?? Infinity)) {
    h.push(lines.pop()[1]);
  }

  max = Math.max(h.length, max);

  while (!h.isEmpty() && h.peek() <= (lines.at(-1)?.[0] ?? Infinity)) {
    h.pop();
  }
}

console.log(max);
