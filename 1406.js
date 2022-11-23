/*
연결리스트 + iterator 구현하면 될거같은데
시간초과 안나나??
*/
class Node {
  constructor(char) {
    this.data = char;
    this.prev = null;
    this.next = null;
  }
}

class Cursor {
  constructor() {
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(array) {
    this.firstNode = null;
    this.cursor = new Cursor();
    this.assignArray(array);
  }

  moveLeft() {
    if (this.cursor.prev === null) return;
    this.cursor.next = this.cursor.prev;
    this.cursor.prev = this.cursor.prev.prev;
  }

  moveRight() {
    if (this.cursor.next === null) return;
    this.cursor.prev = this.cursor.next;
    this.cursor.next = this.cursor.next.next;
  }

  delete() {
    if (this.cursor.prev === null) return;

    const deleteNode = this.cursor.prev;

    if (deleteNode.prev === null) {
      this.firstNode = this.cursor.next;
    } else {
      deleteNode.prev.next = this.cursor.next;
    }

    if (this.cursor.next !== null) this.cursor.next.prev = deleteNode.prev;
    this.cursor.prev = deleteNode.prev;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.cursor.prev === null) {
      this.firstNode = newNode;
    } else {
      newNode.prev = this.cursor.prev;
      this.cursor.prev.next = newNode;
    }

    this.cursor.prev = newNode;
    if (this.cursor.next !== null) {
      this.cursor.next.prev = newNode;
      newNode.next = this.cursor.next;
    }
  }

  toString() {
    const result = [];
    for (let node = this.firstNode; node !== null; node = node.next) {
      result.push(node.data);
    }
    return result.join('');
  }

  assignArray(arr) {
    const array = arr.map((char) => new Node(char));
    array.forEach((value, index) => {
      const node = value;
      if (index < array.length - 1) node.next = array[index + 1];
      if (index > 0) node.prev = array[index - 1];
    });
    [this.firstNode] = array;
    this.cursor.prev = array[array.length - 1];
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [string, _, ...commands] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
const list = new LinkedList(string.split(''));
commands.forEach((command) => {
  if (command === 'L') list.moveLeft();
  else if (command === 'D') list.moveRight();
  else if (command === 'B') list.delete();
  else list.push(command[2]);
});

// output
console.log(list.toString());
