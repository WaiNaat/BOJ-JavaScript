/*
힙 구현은 https://github.com/python/cpython/blob/main/Lib/heapq.py 여기 참고함
*/
class MaxHeap {
  list = [null];

  getLength() {
    return this.list.length - 1;
  }

  push(newValue) {
    this.list.push(newValue);
    this.dragParentDown(this.getLength(), 1);
  }

  pop() {
    if (!this.getLength()) throw new Error('Heap Empty');

    const deleteValue = this.list[1];
    const lastValue = this.list.pop();

    if (this.getLength()) {
      this.list[1] = lastValue;
      this.pullChildUp(1);
    }

    return deleteValue;
  }

  dragParentDown(startPos, finalParentPos) {
    const oddball = this.list[startPos];

    let current;
    for (
      current = startPos;
      current > finalParentPos && oddball > this.list[Math.floor(current / 2)];
      current = Math.floor(current / 2)
    ) {
      this.list[current] = this.list[Math.floor(current / 2)];
    }

    this.list[current] = oddball;
  }

  pullChildUp(startPos) {
    const oddball = this.list[startPos];

    let current = startPos;

    while (current * 2 <= this.getLength()) {
      const leftChild = current * 2;
      const rightChild = leftChild + 1;

      const largerChild = (
        rightChild <= this.getLength() && this.list[leftChild] < this.list[rightChild]
          ? rightChild
          : leftChild
      );

      this.list[current] = this.list[largerChild];
      current = largerChild;
    }

    this.list[current] = oddball;
    this.dragParentDown(current, startPos);
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

const maxHeap = new MaxHeap();
const sol = [];

commands.forEach((value) => {
  if (value) {
    maxHeap.push(value);
    return;
  }

  sol.push(maxHeap.getLength() ? maxHeap.pop() : 0);
});

console.log(sol.join('\n'));
