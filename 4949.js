/*
여는 괄호들은 스택에 넣는다
닫는 괄호가 나오면 스택 꼭대기가
  그 괄호와 짝이 되는 여는 괄호면 pop
  아니면 실패
마지막에 스택의 크기가 0보다 커도 실패
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const sentences = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

sentences.pop();

const isBalanced = (sentence) => {
  const stack = [];

  for (let i = 0; i < sentence.length; i += 1) {
    const char = sentence[i];

    switch (char) {
      case '(':
      case '[':
        stack.push(char);
        break;
      case ')':
        if (stack.length && stack[stack.length - 1] === '(') stack.pop();
        else return false;
        break;
      case ']':
        if (stack.length && stack[stack.length - 1] === '[') stack.pop();
        else return false;
        break;
      default:
    }
  }

  return stack.length === 0;
};

const sol = sentences.map((sentence) => (isBalanced(sentence) ? 'yes' : 'no'));

console.log(sol.join('\n'));
