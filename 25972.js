/*
스택
가장 오른쪽의 넘어진 도미노의 영향범위 기억
만약 영향을 받으면 stack top update
아니면 스택에 새로 삽입
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...dominoes] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

dominoes.sort((a, b) => a[0] - b[0]);

const stack = [];

dominoes.forEach(([start, size]) => {
  if ((stack.at(-1) ?? Infinity) >= start) {
    stack.pop();
  }
  stack.push(start + size);
});

console.log(stack.length);
