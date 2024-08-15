const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n');

let i = 0;
const sol = [];

while (i < inputs.length) {
  const count = Number(inputs[i]);
  let sum = 0;
  for (let j = 0; j < count; j += 1) {
    const [, price, count] = inputs[i + 1 + j].split(' ').map(Number);
    sum += price * count;
  }
  sol.push(sum);
  i += count + 1;
}

console.log(sol.map((value) => `$${value.toFixed(2)}`).join('\n'));
