class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  #first;

  #last;

  #length;

  constructor() {
    this.#first = null;
    this.#last = null;
    this.#length = 0;
  }

  isEmpty() {
    return this.#length === 0;
  }

  enqueue(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.#first = newNode;
    } else {
      this.#last.next = newNode;
    }
    this.#last = newNode;
    this.#length += 1;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('Queue Empty');
    const deleteNode = this.#first;
    this.#length -= 1;

    if (this.isEmpty()) this.#last = null;
    this.#first = deleteNode.next;

    return deleteNode.data;
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[N, M, R], ...edges] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
const E = Array.from(new Array(N), () => []);
edges.forEach(([u, v]) => {
  E[u - 1].push(v - 1);
  E[v - 1].push(u - 1);
});
E.forEach((nextNodes) => { nextNodes.sort((a, b) => a - b); });

const visited = new Array(N).fill(0);
const q = new Queue();
q.enqueue(R - 1);
let visitOrder = 1;

while (!q.isEmpty()) {
  const cur = q.dequeue();

  if (!visited[cur]) {
    visited[cur] = visitOrder;
    visitOrder += 1;

    E[cur].forEach((next) => {
      if (!visited[next]) q.enqueue(next);
    });
  }
}

// output
console.log(visited.join('\n'));
