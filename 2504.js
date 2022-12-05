/*
스택
스택에 넣는 값이
1. 여는 괄호
  그냥 넣음
2. 닫는 괄호
  스택 꼭대기가 짝이 맞는 여는 괄호면 그거 꺼내고 숫자 넣음
  스택 꼭대기가 숫자면 두번째 꼭대기 보고 짝이 맞으면 숫자랑 같이꺼내서 곱해서 넣음
3. 숫자
  스택 꼭대기가 여는 괄호면 그냥 넣음
  스택 꼭대기가 숫자면 꺼내서 더해서 넣음
*/
class Stack {
  constructor() {
    this.list = [];
    this.top = -1;
  }

  peek() {
    return this.list[this.top];
  }

  push(value) {
    if (value === '(' || value === '[') this.list.push(value);
    else if (value === ')' || value === ']') this.pushClosing(value);
    else this.pushNumber(value);
    this.top += 1;
  }

  pop() {
    if (this.top === -1) throw new Error('Stack Empty');
    this.top -= 1;
    return this.list.pop();
  }

  pushClosing(value) {
    const pair = value === ')' ? '(' : '[';
    const incorrectPair = value === ')' ? '[' : '(';
    const parenValue = value === ')' ? 2 : 3;

    if (this.top === -1 || this.peek() === incorrectPair) {
      throw new Error('Incorrect parenthesis/bracket sequence');
    }

    let number = 1;
    if (this.peek() !== pair) number = this.pop();
    if (this.peek() !== pair) throw new Error('Incorrect parenthesis/bracket sequence');
    this.pop();
    number *= parenValue;
    this.pushNumber(number);
  }

  pushNumber(value) {
    if (this.top === -1) {
      this.list.push(value);
      return;
    }

    if (this.peek() !== '(' && this.peek() !== '[') {
      this.list.push(this.pop() + value);
      return;
    }

    this.list.push(value);
  }
}

class Counter {
  constructor() {
    this.parentheses = 0;
    this.brackets = 0;
  }

  update(value) {
    if (value === '(') this.parentheses += 1;
    else if (value === ')') this.parentheses -= 1;
    else if (value === '[') this.brackets += 1;
    else this.brackets -= 1;
  }

  isCorrect() {
    return this.parentheses === 0 && this.brackets === 0;
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

// process
const stack = new Stack();
const counter = new Counter();

let sol;
try {
  input.forEach((char) => {
    stack.push(char);
    counter.update(char);
  });
  sol = stack.peek();
  if (!counter.isCorrect()) throw new Error('Parenthesis/bracket number error');
} catch {
  sol = 0;
}

// output
console.log(sol);
