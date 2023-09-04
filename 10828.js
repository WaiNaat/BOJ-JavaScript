const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...commands] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const stack = [];
const sol = [];

commands.forEach(([command, value]) => {
  switch (command) {
    case 'push':
      stack.push(value);
      break;
    case 'pop':
      if (stack.length) sol.push(stack.pop());
      else sol.push(-1);
      break;
    case 'size':
      sol.push(stack.length);
      break;
    case 'empty':
      sol.push(stack.length ? 0 : 1);
      break;
    case 'top':
      sol.push(stack.length ? stack[stack.length - 1] : -1);
      break;
    default:
  }
});

console.log(sol.join('\n'));
