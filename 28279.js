class Deque {
  first = null;
  last = null;
  length = 0;

  peekLast() {
    return this.length > 0 ? this.last.value : -1;
  }

  pushLast(value) {
    const node = { value, prev: null, next: null };

    if (this.length > 0) {
      node.prev = this.last;
      this.last.next = node;
    } else {
      this.first = node;
    }

    this.last = node;
    this.length += 1;
  }

  popLast() {
    if (this.length === 0) return -1;

    const { value } = this.last;

    this.last = this.last.prev;
    this.length -= 1;

    if (this.length === 0) {
      this.first = null;
    } else if (this.length === 1) {
      this.first.next = null;
    }

    if (this.length > 0) {
      this.last.next = null;
    }

    return value;
  }

  peekFirst() {
    return this.length > 0 ? this.first.value : -1;
  }

  pushFirst(value) {
    const node = { value, prev: null, next: null };

    if (this.length > 0) {
      node.next = this.first;
      this.first.prev = node;
    } else {
      this.last = node;
    }

    this.first = node;
    this.length += 1;
  }

  popFirst() {
    if (this.length === 0) return -1;

    const { value } = this.first;

    this.first = this.first.next;
    this.length -= 1;

    if (this.length === 0) {
      this.last = null;
    } else if (this.length === 1) {
      this.last.prev = null;
    }

    if (this.length > 0) {
      this.first.prev = null;
    }

    return value;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const deque = new Deque();
const sol = [];

commands.forEach(([command, value]) => {
  switch (Number(command)) {
    case 1:
      deque.pushFirst(value);
      break;
    case 2:
      deque.pushLast(value);
      break;
    case 3:
      sol.push(deque.popFirst());
      break;
    case 4:
      sol.push(deque.popLast());
      break;
    case 5:
      sol.push(deque.length);
      break;
    case 6:
      sol.push(deque.length === 0 ? 1 : 0);
      break;
    case 7:
      sol.push(deque.peekFirst());
      break;
    case 8:
      sol.push(deque.peekLast());
      break;
    default:
  }
});

console.log(sol.join('\n'));
