class MaxHeap {
  constructor() {
    this.list = [null];
  }

  getLength() {
    return this.list.length - 1;
  }

  push(newValue) {
    this.list.push(newValue);

    // newValue의 부모가 newValue보다 작으면 부모를 끌어내림
    let newValuePosition;
    for (
      newValuePosition = this.getLength();
      newValuePosition > 1 && this.list[Math.floor(newValuePosition / 2)] < newValue;
      newValuePosition = Math.floor(newValuePosition / 2)
    ) {
      this.list[newValuePosition] = this.list[Math.floor(newValuePosition / 2)];
    }

    this.list[newValuePosition] = newValue;
  }

  pop() {
    if (!this.getLength()) throw new Error('Heap Empty');

    const deleteValue = this.list[1];
    const lastValue = this.list.pop();

    if (!this.getLength()) return deleteValue;

    // 본인보다 자식이 더 크면 자식을 위로 올림
    // 자식 둘 다 본인보다 크면 더 큰 자식을 위로 올림
    let lastValuePosition = 1;
    while (lastValuePosition <= this.getLength()) {
      const leftChild = lastValuePosition * 2;
      const rightChild = leftChild + 1;

      const leftChildValue = this.list[leftChild] || -Infinity;
      const rightChildValue = this.list[rightChild] || -Infinity;

      if (lastValue >= leftChildValue && lastValue >= rightChildValue) break;

      if (leftChildValue >= rightChildValue) {
        this.list[lastValuePosition] = leftChildValue;
        lastValuePosition = leftChild;
      } else {
        this.list[lastValuePosition] = rightChildValue;
        lastValuePosition = rightChild;
      }
    }

    this.list[lastValuePosition] = lastValue;

    return deleteValue;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...visits] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const giftBag = new MaxHeap();
const sol = [];

visits.forEach(([isNewGift, ...newGifts]) => {
  if (isNewGift) {
    newGifts.forEach((gift) => giftBag.push(gift));
    return;
  }

  sol.push(giftBag.getLength() ? giftBag.pop() : -1);
});

console.log(sol.join('\n'));
