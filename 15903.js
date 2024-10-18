/*
그리디
우순큐에서 제일 작은거 두개 뽑아서 합친다음에 다시 넣으면 됨

우순큐
push
  배열 맨뒤에 넣기
  부모 끌어내리기
pop
  배열 맨앞 반환
  배열 맨뒤 제거후 기억
  자식 끌어올리기로 리프노드 비우기
  빈 리프에 기억한 값 넣기
  부모 끌어내리기
heapify
  자식이 있는 모든 노드에 대해 리프에 가까온쪽부터 반복
  본인 제거
  자식 끙어올리기
  리프에 본인 넣기
  부모 끌어내리기
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, count], cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(BigInt));

class Heap {
  /**
   *
   * @param list list to make heap
   * @param compareFn `(left, right) => boolean` returns true if left has strictly more priority than right
   */
  constructor(list, compareFn) {
    this.isPrior = compareFn;
    this.list = [null, ...list];
    this.heapify();
  }

  isEmpty() {
    return this.list.length === 1;
  }

  push(val) {
    this.list.push(val);
    this.pullParentDown(this.list.length - 1, 1);
  }

  pop() {
    if (this.isEmpty()) return undefined;

    const first = this.list[1];
    const last = this.list.pop();

    if (this.isEmpty()) return first;

    const leaf = this.fillEmptyAndReturnEmptyLeaf(1);
    this.list[leaf] = last;
    this.pullParentDown(leaf, 1);

    return first;
  }

  heapify() {
    for (let i = Math.floor((this.list.length - 1) / 2); i >= 1; i -= 1) {
      const me = this.list[i];
      const leaf = this.fillEmptyAndReturnEmptyLeaf(i);
      this.list[leaf] = me;
      this.pullParentDown(leaf, i);
    }
  }

  pullParentDown(startPos, root) {
    let cur;
    const me = this.list[startPos];

    for (
      cur = startPos;
      cur > root && this.isPrior(me, this.list[Math.floor(cur / 2)]);
      cur = Math.floor(cur / 2)
    ) {
      this.list[cur] = this.list[Math.floor(cur / 2)];
    }

    this.list[cur] = me;
  }

  fillEmptyAndReturnEmptyLeaf(startPos) {
    let empty = startPos;

    while (empty * 2 < this.list.length) {
      const left = empty * 2;
      const right = left + 1;
      const leftChild = this.list[left];

      if (right >= this.list.length) {
        this.list[empty] = leftChild;
        empty = left;
        continue;
      }

      const rightChild = this.list[right];

      if (this.isPrior(leftChild, rightChild)) {
        this.list[empty] = leftChild;
        empty = left;
      } else {
        this.list[empty] = rightChild;
        empty = right;
      }
    }

    return empty;
  }
}

const h = new Heap(cards, (a, b) => a < b);

for (let i = 0n; i < count; i += 1n) {
  const a = h.pop();
  const b = h.pop();
  const sum = a + b;
  h.push(sum);
  h.push(sum);
}

const sum = h.list.reduce((prev, cur) => prev + (cur ?? 0n), 0n);

console.log(sum.toString());
