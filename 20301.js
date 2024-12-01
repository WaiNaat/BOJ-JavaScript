/*
1. 연결리스트 만들기
  탐색이 오래걸림
2. 그냥 배열 사용하기
  삭제가 오래걸림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, K, M] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(' ').map(Number);

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class Circle {
  constructor(size) {
    this.isForward = true;
    this.head = new Node(1);
    this.length = size;
    this.head.prev = this.head;
    this.head.next = this.head;

    for (let val = 2, prev = this.head; val <= size; val += 1, prev = prev.next) {
      const newNode = new Node(val);
      newNode.prev = prev;
      prev.next = newNode;

      if (val === size) {
        this.head.prev = newNode;
        newNode.next = this.head;
      }
    }

    if (this.isForward) {
      this.head = this.head.prev;
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  remove(jump, shouldChangeDirectionAfterRemove) {
    if (this.length === 1) {
      const target = this.head;
      this.head = null;
      this.length -= 1;
      return target.val;
    }

    for (let i = 0; i < jump; i += 1) {
      this.head = this.isForward ? this.head.next : this.head.prev;
    }

    const target = this.head;

    target.prev.next = target.next;
    target.next.prev = target.prev;
    this.length -= 1;

    if (this.isForward && shouldChangeDirectionAfterRemove) {
      this.head = target.next;
      this.isForward = !this.isForward;
    } else if (!this.isForward && shouldChangeDirectionAfterRemove) {
      this.head = target.prev;
      this.isForward = !this.isForward;
    } else if (this.isForward) {
      this.head = target.prev;
    } else {
      this.head = target.next;
    }

    if (this.isEmpty()) {
      this.head = null;
    }

    return target.val;
  }
}

const circle = new Circle(N);
const sol = [];

while (!circle.isEmpty()) {
  for (let i = 0; i < M - 1 && !circle.isEmpty(); i += 1) {
    sol.push(circle.remove(K, false));
  }
  if (!circle.isEmpty()) {
    sol.push(circle.remove(K, true));
  }
}

console.log(sol.join('\n'));
