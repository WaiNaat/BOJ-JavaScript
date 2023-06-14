/*
나머지 프로세스들의 우선 순위가 1 상승합니다.
-> 본인 우선 순위를 1 줄이면 됨
*/
class Process {
  constructor(id, time, priority) {
    this.id = id;
    this.time = time;
    this.priority = priority;
  }

  isMoreImportantThan(other) {
    if (this.priority !== other.priority) return this.priority > other.priority;
    return this.id < other.id;
  }
}

class Scheduler {
  list = [null];

  getLength() {
    return this.list.length - 1;
  }

  push(newProcess) {
    this.list.push(newProcess);
    this.dragParentDown(this.getLength(), 1);
  }

  pop() {
    if (!this.getLength()) throw new Error('Scheduler empty');

    const deletedProcess = this.list[1];
    const lastProcess = this.list.pop();

    if (this.getLength()) {
      this.list[1] = lastProcess;
      this.raiseChild(1);
    }

    return deletedProcess;
  }

  execute() {
    const process = this.pop();

    process.priority -= 1;
    process.time -= 1;

    if (process.time) this.push(process);

    return process.id;
  }

  dragParentDown(startPos, endPos) {
    const oddballProcess = this.list[startPos];

    let current;
    for (
      current = startPos;
      current > endPos && oddballProcess.isMoreImportantThan(this.list[Math.floor(current / 2)]);
      current = Math.floor(current / 2)
    ) {
      this.list[current] = this.list[Math.floor(current / 2)];
    }

    this.list[current] = oddballProcess;
  }

  raiseChild(startPos) {
    const oddballProcess = this.list[startPos];

    let current = startPos;

    while (current * 2 <= this.getLength()) {
      const leftChild = current * 2;
      const rightChild = leftChild + 1;

      const importantChild = (
        rightChild <= this.getLength()
        && this.list[rightChild].isMoreImportantThan(this.list[leftChild])
          ? rightChild
          : leftChild
      );

      this.list[current] = this.list[importantChild];
      current = importantChild;
    }

    this.list[current] = oddballProcess;
    this.dragParentDown(current, 1);
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[timeLimit], ...processes] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const scheduler = new Scheduler();
const sol = [];

processes.forEach((value) => scheduler.push(new Process(...value)));

for (let time = 0; time < timeLimit && scheduler.getLength(); time += 1) {
  sol.push(scheduler.execute());
}

console.log(sol.join('\n'));
