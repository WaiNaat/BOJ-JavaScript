const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const data = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

data.pop();

const medians = data.map((list) => {
  const size = list[0];
  if (size % 2 === 1) {
    return list[(size + 1) / 2];
  }
  return (list[size / 2] + list[size / 2 + 1]) / 2;
});

console.log(medians.map((value, index) => `Case ${index + 1}: ${value.toFixed(1)}`).join('\n'));
