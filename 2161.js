/*
큐 구현 - 연결리스트를 이용한 큐
*/
class Card {
  constructor(number) {
    this.number = number;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(cardNumber) {
    const newCard = new Card(cardNumber);

    if (this.length === 0) {
      this.first = newCard;
    } else {
      this.last.next = newCard;
    }
    this.last = newCard;
    this.length += 1;
  }

  dequeue() {
    if (this.length === 0) throw new Error('Queue Empty');

    const deletedCard = this.first;

    this.length -= 1;
    if (this.length === 0) {
      this.first = null;
      this.last = null;
    } else {
      this.first = deletedCard.next;
    }

    return deletedCard.number;
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
