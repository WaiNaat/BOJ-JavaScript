/*
스택을 이용한 계산기랑 비슷한데
정답을 계산하는 게 아니라 후위표현식 뭉탱이를 만드는 방식.
차이점이 있다면 덧셈 뺄셈끼리의 순서 고려해야 함.

연산자 또는 괄호가 들어올 때 이미 들어온 연산자를 계산:
덧셈 또는 뺄셈
  직전 연산자가 여는 괄호가 아니면 직전 연산자를 후위표현식으로 변형
곱셈 또는 나눗셈
  직전 연산자가 곱셈 또는 나눗셈이면 직전 연산자를 후위표현식으로 변형
여는 괄호
  그냥 스택에 넣음
닫는 괄호
  직전 연산자가 여는 괄호가 남을 때까지 직전 연산자를 후위표현식으로 변형
*/
class PostfixMaker {
  constructor() {
    this.operands = [];
    this.operators = [];
  }

  input(input) {
    switch (input) {
      case '+':
      case '-':
        return this.addSub(input);
      case '*':
      case '/':
        return this.multDiv(input);
      case '(':
        return this.openingParen();
      case ')':
        return this.closingParen();
      default:
        return this.operand(input);
    }
  }

  endInput() {
    while (this.operands.length >= 2) {
      this.makePostfixExpression();
    }
    return this.operands[0];
  }

  makePostfixExpression() {
    const operand2 = this.operands.pop();
    const operand1 = this.operands.pop();
    const result = `${operand1}${operand2}${this.operators.pop()}`;
    this.operands.push(result);
  }

  operand(input) {
    this.operands.push(input);
  }

  addSub(operator) {
    while (this.operators.length > 0 && this.operators[this.operators.length - 1] !== '(') {
      this.makePostfixExpression();
    }
    this.operators.push(operator);
  }

  multDiv(operator) {
    if (this.operators.length > 0 && (this.operators[this.operators.length - 1] === '*' || this.operators[this.operators.length - 1] === '/')) {
      this.makePostfixExpression();
    }
    this.operators.push(operator);
  }

  openingParen() {
    this.operators.push('(');
  }

  closingParen() {
    while (this.operators[this.operators.length - 1] !== '(') {
      this.makePostfixExpression();
    }
    this.operators.pop();
  }
}

// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const infixExpression = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('');

// process
const maker = new PostfixMaker();
infixExpression.forEach((char) => { maker.input(char); });

// output
console.log(maker.endInput());
