/*
당연히 시간 적게 걸리는 순서대로 먹어야 함
-> 최소 힙

최소조건 있는 별은 어떻게 하지?
-> 따로 저장했다가 조건 만족하면 힙에 넣음
*/
class MinHeap {
  list = [null];

  size() {
    return this.list.length - 1;
  }

  push(value) {
    this.list.push(value);
    this.dragParentDown(this.size(), 1);
  }

  pop() {
    if (!this.size()) throw new Error('Heap Empty');

    const deleteValue = this.list[1];
    const lastValue = this.list.pop();

    if (this.size()) {
      this.list[1] = lastValue;
      this.raiseChildUp(1);
    }

    return deleteValue;
  }

  dragParentDown(startPos, finalParentPos) {
    const oddball = this.list[startPos];

    let current;
    for (
      current = startPos;
      current > finalParentPos && oddball < this.list[Math.floor(current / 2)];
      current = Math.floor(current / 2)
    ) {
      this.list[current] = this.list[Math.floor(current / 2)];
    }

    this.list[current] = oddball;
  }

  raiseChildUp(startPos) {
    const oddball = this.list[startPos];

    let current = startPos;
    while (current * 2 <= this.size()) {
      const leftChild = current * 2;
      const rightChild = leftChild + 1;

      const smallerChild = (
        rightChild <= this.size() && this.list[rightChild] < this.list[leftChild]
          ? rightChild
          : leftChild
      );

      const smallerChildValue = this.list[smallerChild];
      if (oddball < smallerChildValue) break;

      this.list[current] = smallerChildValue;
      current = smallerChild;
    }

    this.list[current] = oddball;

    this.dragParentDown(current, startPos);
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[, goal], ...stars] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const availableStars = new MinHeap();
let starCount = 0;
let totalTime = 0;

stars.sort((one, another) => another[1] - one[1]);

const updateAvailableStars = () => {
  while (stars.length && stars[stars.length - 1][1] <= starCount) {
    const [time] = stars.pop();
    availableStars.push(time);
  }
};

updateAvailableStars();

while (availableStars.size() && starCount < goal) {
  totalTime += availableStars.pop();
  starCount += 1;
  updateAvailableStars();
}

console.log(starCount === goal ? totalTime : 'IMPOSSIBLE');
