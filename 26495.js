const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = require('fs').readFileSync(INPUT_FILE).toString().trim();

const line1 = ['0000', '   1', '2222', '3333', '4  4', '5555', '6666', '7777', '8888', '9999'].map((s) => s.trimEnd());
const line2 = ['0  0', '   1', '   2', '   3', '4  4', '5   ', '6   ', '   7', '8  8', '9  9'].map((s) => s.trimEnd());
const line3 = ['0  0', '   1', '2222', '3333', '4444', '5555', '6666', '   7', '8888', '9999'].map((s) => s.trimEnd());
const line4 = ['0  0', '   1', '2   ', '   3', '   4', '   5', '6  6', '   7', '8  8', '   9'].map((s) => s.trimEnd());
const line5 = ['0000', '   1', '2222', '3333', '   4', '5555', '6666', '   7', '8888', '   9'].map((s) => s.trimEnd());
const getDigit = (value) => {
  return [line1[value], line2[value], line3[value], line4[value], line5[value]].join('\n');
};

console.log(Array.from(target).map(getDigit).join('\n\n'));
