/*
각 강의'실'에서 중요한 건 끝나는 시간
각 강의에서 중요한 건 시작하는 시간

강의는 시작순 정렬
강의실 중 제일 빨리 끝나는 걸 본다
현재 강의가 거기서 가능하면 진행
아니면 새로운 강의실을 만든다
  (다른 강의실은 제일 빨리 끝나는 강의실보다 늦게 끝나므로 어차피 강의가 불가하다)

우순큐
push
  배열 맨 뒤에 넣기
  부모 끌어내리기
pop
  배열 맨앞 제거후 반환
  배열 맨뒤 제거후 기억
  자식 끌어올려서 빈 공간 채우기
  빈 리프노드에 기억한 값 넣기
  부모 끌어내리기
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...lectures] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

class Heap {
  /**
   * @param compareFn `(a, b) => boolean`. returns true if `a` is strictly prior to `b`.
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

    const emptyLeaf = this.fillEmptyAndReturnEmptyLeaf(1);
    this.list[emptyLeaf] = last;
    this.pullParentDown(emptyLeaf);

    return first;
  }

  pullParentDown(startPos, endPos = 1) {
    const me = this.list[startPos];
    let cur;
    for (
      cur = startPos;
      cur > endPos && this.isPrior(me, this.list[Math.floor(cur / 2)]);
      cur = Math.floor(cur / 2)
    ) {
      this.list[cur] = this.list[Math.floor(cur / 2)];
    }
    this.list[cur] = me;
  }

  fillEmptyAndReturnEmptyLeaf(startPos) {
    let empty = startPos;

    while (empty * 2 <= this.length) {
      const left = empty * 2;
      const right = left + 1;
      const leftChild = this.list[left];
      const rightChild = this.list[right];

      if (right > this.length || this.isPrior(leftChild, rightChild)) {
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

// 강의실 끝나는시간 담는 힙
const h = new Heap((a, b) => a < b);

// 강의 시작시간 기준 정렬
lectures.sort((a, b) => a[1] - b[1]);

lectures.forEach(([, startTime, endTime]) => {
  if ((h.peek() ?? Infinity) <= startTime) {
    h.pop();
  }
  h.push(endTime);
});

console.log(h.length);
