/*
각 초밥별로 우선권을 갖는 순서대로 큐를 만들어서 정리
-> 번호가 앞서는 손님이 무조건 우선권을 가짐
해당 초밥이 완성되면 큐 맨 앞의 손님을 빼서 초밥 먹임
*/
const makeNode = (value) => ({ value, next: null });

class Queue {
  length = 0;
  first = null;
  last = null;

  enqueue(value) {
    const newNode = makeNode(value);

    if (!this.length) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;

    this.length += 1;
  }

  dequeue() {
    if (!this.length) throw new Error('Queue Empty');

    const { value: deleteValue } = this.first;

    this.first = this.first.next;

    this.length -= 1;
    if (!this.length) this.last = null;

    return deleteValue;
  }
}

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[customerCount], ...orderList] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sushiCookingOrder = orderList.pop();
const sushiWaitingLists = {};
const eatCounts = new Array(customerCount).fill(0);
orderList.forEach(([, ...sushies], customerIndex) => {
  sushies.forEach((sushi) => {
    if (!sushiWaitingLists[sushi]) sushiWaitingLists[sushi] = new Queue();
    sushiWaitingLists[sushi].enqueue(customerIndex);
  });
});

sushiCookingOrder.forEach((sushi) => {
  if (!sushiWaitingLists[sushi] || !sushiWaitingLists[sushi].length) return;
  eatCounts[sushiWaitingLists[sushi].dequeue()] += 1;
});

console.log(eatCounts.join(' '));
