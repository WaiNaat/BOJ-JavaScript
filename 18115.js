/*
최대 100만번
덱 만드는 문제

빈 덱을 준비한다.
쌓여 있는 카드 맨 위에서 하나 집어온다. <- x로 저장
남아있는 연산 중 가장 마지막 연산을 본다.
  1 -> x를 덱 왼쪽에.
  2 -> 덱 왼쪽에서 하나를 뺸다 <- y로 저장, x를 덱 왼쪽에, y를 덱 왼쪽에.
  3 -> x를 덱 오른쪽에.

메모리 넉넉하니까 크기 100만짜리 배열로 처리가능
*/
const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...operations] = require('fs')
  .readFileSync(INPUIT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const deque = {
  list: new Array(1_000_000),
  left: 1_000_000,
  size: 0,
  pushLeft(value) {
    this.size += 1;
    this.left -= 1;
    this.list[this.left] = value;
  },
  popLeft() {
    if (this.size === 0) return -1;
    this.size -= 1;
    this.left += 1;
    return this.list[this.left - 1];
  },
  pushRight(value) {
    this.size += 1;
    this.list.push(value);
  },
  getList() {
    return this.list.slice(this.left);
  },
};

operations.reverse().forEach((operation, index) => {
  const value = index + 1;
  switch (operation) {
    case 1:
      deque.pushLeft(value);
      break;
    case 2: {
      const originalTop = deque.popLeft();
      deque.pushLeft(value);
      deque.pushLeft(originalTop);
      break;
    }
    case 3:
      deque.pushRight(value);
      break;
    default:
  }
});

const result = deque.getList();

console.log(result.join(' '));
