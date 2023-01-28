/*
1. 연결 리스트를 이용한 큐
2. 배열을 이용한 가짜 큐
1번 방법 사용
*/
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0 ? 1 : 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;
    this.length += 1;
  }

  pop() {
    if (this.isEmpty()) return -1;
    const { value } = this.first;
    this.length -= 1;

    if (this.isEmpty()) {
      this.last = null;
    }
    this.first = this.first.next;

    return value;
  }

  size() {
    return this.length;
  }

  front() {
    if (this.isEmpty()) return -1;
    return this.first.value;
  }

  back() {
    if (this.isEmpty()) return -1;
    return this.last.value;
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const commands = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(' '));

// process
const queue = new Queue();
const sol = [];
commands.forEach(([command, value]) => {
  switch (command) {
    case 'push':
      queue.push(value);
      break;
    case 'pop':
      sol.push(queue.pop());
      break;
    case 'size':
      sol.push(queue.size());
      break;
    case 'empty':
      sol.push(queue.isEmpty());
      break;
    case 'front':
      sol.push(queue.front());
      break;
    case 'back':
      sol.push(queue.back());
      break;
    default:
      throw new Error('Undefined Command');
  }
});

// output
console.log(sol.join('\n'));
