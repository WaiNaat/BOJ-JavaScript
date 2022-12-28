/*
주어진 입력에 대해서 ()와 )(를 다시 합치는 문제
합칠 수 있으면 무조건 합쳐야 최소 일수가 나옴
스택을 이용해서 합칠 수 없으면 쌓음
  >> 합쳐질 때 쌓여있는 개수가 곧 여기까지 오는데 필요한 날짜 수
마지막에 스택이 비어있지 않다면 불가능하다는 뜻
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, S] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

// process
let sol = 0;
const stack = [];

for (let i = 0; i < N; i += 1) {
  if ((stack[stack.length - 1] === '(' && S[i] === ')')
    || (stack[stack.length - 1] === ')' && S[i] === '(')) {
    sol = Math.max(stack.length, sol);
    stack.pop();
  } else {
    stack.push(S[i]);
  }
}

// output
console.log(stack.length === 0 ? sol : -1);
