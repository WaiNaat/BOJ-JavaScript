/*
'('는 스택에 넣는다
')'가 나오면 스택의 '(' 하나를 뺀다

닫는 괄호가 나왔는데 스택이 비었거나
최종적으로 스택의 길이가 0이 아니면 실패
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

const isVps = (sentence) => {
  let stackLength = 0;

  for (let i = 0; i < sentence.length; i += 1) {
    if (sentence[i] === '(') {
      stackLength += 1;
    } else if (stackLength > 0) {
      stackLength -= 1;
    } else {
      return false;
    }
  }

  return stackLength === 0;
};

const sol = [];

inputs.forEach((input) => {
  sol.push(isVps(input) ? 'YES' : 'NO');
});

console.log(sol.join('\n'));
