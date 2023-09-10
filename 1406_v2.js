/*
커서를 기준으로 왼쪽/오른쪽을 나타내는 스택 사용
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [initialString, , ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n');

const left = Array.from(initialString);
const right = [];

commands.forEach((command) => {
  const [type, value] = command.split(' ');

  switch (type) {
    case 'L':
      if (left.length > 0) right.push(left.pop());
      break;
    case 'D':
      if (right.length > 0) left.push(right.pop());
      break;
    case 'B':
      if (left.length > 0) left.pop();
      break;
    default:
      left.push(value);
  }
});

console.log(`${left.join('')}${right.reverse().join('')}`);
