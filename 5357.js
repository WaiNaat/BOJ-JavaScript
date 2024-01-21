const removeRedundancy = (target) => {
  const result = [];
  for (let i = 0; i < target.length; i += 1) {
    if (result.at(-1) === target[i]) continue;
    result.push(target[i]);
  }
  return result.join('');
};

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map(removeRedundancy);

console.log(inputs.join('\n'));
