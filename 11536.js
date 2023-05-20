// 런타임 에러 eacces

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...names] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const isIncreasing = names.every((name, index) => {
  if (index === 0) return true;

  return names[index - 1] < name;
});

const isDecreasing = names.every((name, index) => {
  if (index === 0) return true;

  return names[index - 1] > name;
});

if (isIncreasing) console.log('INCREASING');
else if (isDecreasing) console.log('DECREASING');
else console.log('NEITHER');
