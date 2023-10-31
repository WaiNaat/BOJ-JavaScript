/*
큐를 쓰는 문제인데..
청설모가 K마리 이상
  -> 맨 앞 청설모를 맨 뒤로
  앞에서 k-1마리 제거
청설모가 K마리 미만
  맨 앞 1마리만 남기고 제거
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [animalCount, k] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const queue = {
  list: Array.from({ length: animalCount }).map((_, index) => index + 1),
  left: 0,
  length: animalCount,

  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  },

  dequeue() {
    if (this.length === 0) return null;
    this.left += 1;
    this.length -= 1;
    return this.list[this.left - 1];
  },

  peek() {
    if (this.length === 0) return null;
    return this.list[this.left];
  },
};

while (queue.length >= k) {
  queue.enqueue(queue.dequeue());
  for (let i = 0; i < k - 1; i += 1) {
    queue.dequeue();
  }
}

console.log(queue.peek());
