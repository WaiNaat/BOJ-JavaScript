const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const base10ToBaseN = (target, radix) => {
  const result = [];
  let remainder = target;

  let i = 0;
  while (radix ** i <= remainder) {
    i += 1;
  }
  i -= 1;

  for (let j = i; j >= 0; j -= 1) {
    result.push(Math.floor(remainder / radix ** j));
    remainder %= radix ** j;
  }

  return result;
};

const baseNtoBase10 = (target, radix) => {
  let result = 0;
  const targetValues = Array.from(target).map(Number);
  for (let i = 0; i < targetValues.length; i += 1) {
    result += radix ** i * targetValues.at(-1 - i);
  }
  return result;
};

const nim = ([b, x, y]) => {
  const xTransformed = base10ToBaseN(x, b);
  const yTransformed = base10ToBaseN(y, b);
  const length = Math.max(xTransformed.length, yTransformed.length);

  const result = [];
  for (let i = 1; i <= length; i += 1) {
    result.push(((xTransformed.at(-i) ?? 0) + (yTransformed.at(-i) ?? 0)) % b);
  }
  result.reverse();

  return baseNtoBase10(result, b);
};

const sol = tests.map(nim);

console.log(sol.join('\n'));
