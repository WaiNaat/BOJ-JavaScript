/*
큐 구현 - 배열을 이용한 가짜 큐
*/

class Queue {
  constructor() {
    this.list = [];
    this.first = 0;
    this.length = 0;
  }

  enqueue(value) {
    this.list.push(value);
    this.length += 1;
  }

  dequeue() {
    if (this.length === 0) throw new Error('Queue Empty');
    const deletedValue = this.list[this.first];
    this.length -= 1;
    this.first += 1;
    return deletedValue;
  }
}

class Deck {
  constructor(size) {
    this.deck = new Queue();
    for (let number = 1; number <= size; number += 1) {
      this.deck.enqueue(number);
    }
  }

  discard() {
    return this.deck.dequeue();
  }

  moveTopToBottom() {
    if (this.deck.length === 0) return;
    this.deck.enqueue(this.deck.dequeue());
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

// process
const deck = new Deck(N);
const sol = [];

for (let turn = 0; turn < N; turn += 1) {
  sol.push(deck.discard());
  deck.moveTopToBottom();
}

// output
console.log(sol.join(' '));
