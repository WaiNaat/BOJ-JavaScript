const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isIncreasing = (names) => names.every((name, index) => {
  if (index === 0) return true;

  return names[index - 1] < name;
});

const isDecreasing = (names) => names.every((name, index) => {
  if (index === 0) return true;

  return names[index - 1] > name;
});

const solve = (names) => {
  if (isIncreasing(names)) console.log('INCREASING');
  else if (isDecreasing(names)) console.log('DECREASING');
  else console.log('NEITHER');
};

let isFirstLine = true;
const names = [];

rl.on('line', (line) => {
  if (isFirstLine) {
    isFirstLine = !isFirstLine;
    return;
  }
  names.push(line.trim());
}).on('close', () => {
  solve(names);
});
