/*
덱 만들어서 돌리는 문제
시간제한이 짧으므로 혹시모르니 배열+투포인터 덱 사용
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const queue = {
  list: new Array(1_000_000),
  front: 500_000,
  back: 499_999,
  ballCount: 0,
  wallCount: 0,
  direction: 0,
  DIRECTIONS: ['right', 'down', 'left', 'up'],

  isEmpty() {
    return this.back - this.front + 1 === 0;
  },

  peekFront() {
    return this.isEmpty() ? null : this.list[this.front];
  },
  peekBack() {
    return this.isEmpty() ? null : this.list[this.back];
  },

  pushBack(value) {
    this.back += 1;
    this.list[this.back] = value;

    if (value === 'b') this.ballCount += 1;
    else this.wallCount += 1;

    this.spill();
  },

  popFront() {
    if (this.isEmpty()) return null;

    const value = this.list[this.front];
    this.front += 1;

    if (value === 'b') {
      this.ballCount -= 1;
    } else {
      this.wallCount -= 1;
      this.spill();
    }

    return value;
  },
  popBack() {
    if (this.isEmpty()) return null;

    const value = this.list[this.back];
    this.back -= 1;

    if (value === 'b') {
      this.ballCount -= 1;
    } else {
      this.wallCount -= 1;
      this.spill();
    }

    return value;
  },

  spill() {
    const direction = this.DIRECTIONS[this.direction];
    if (direction === 'up') {
      while (!this.isEmpty() && this.peekBack() === 'b') {
        this.popBack();
      }
    } else if (direction === 'down') {
      while (!this.isEmpty() && this.peekFront() === 'b') {
        this.popFront();
      }
    }
  },

  rotate(value) {
    if (value === 'l') this.direction = (this.direction + 3) % 4;
    else this.direction = (this.direction + 1) % 4;

    this.spill();
  },
};

const sol = [];

commands.forEach(([command, value]) => {
  switch (command) {
    case 'push':
      queue.pushBack(value);
      break;
    case 'pop':
      queue.popFront();
      break;
    case 'rotate':
      queue.rotate(value);
      break;
    default:
      sol.push(value === 'b' ? queue.ballCount : queue.wallCount);
  }
});

console.log(sol.join('\n'));
