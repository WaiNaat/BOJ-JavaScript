/*
잠들지 못하는 경우가 0 말고 있을까?
숫자가 충분히 커지면 가장 큰 자릿수에서 1~9를 채울 수 있지 않을까?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...cases] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const solve = (startValue) => {
  if (startValue === 0) return 'INSOMNIA';

  const appeared = new Set();
  let i;

  for (i = startValue; appeared.size < 10; i += startValue) {
    i.toString()
      .split('')
      .forEach((value) => appeared.add(value));
  }

  return i - startValue;
};

const sol = [];

cases.forEach((value, index) => {
  sol.push(`Case #${index + 1}: ${solve(value)}`);
});

console.log(sol.join('\n'));
