const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...inputs] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sol = [];
let i = 0;
while (i < inputs.length) {
  const [shipCount, speed, dueDate] = inputs[i];
  i += 1;
  let totalMoney = 0;

  for (let j = 0; j < shipCount; j += 1, i += 1) {
    const [distance, money] = inputs[i];
    if (Math.ceil(distance / speed) <= dueDate) {
      totalMoney += money;
    }
  }

  sol.push(totalMoney);
}

console.log(sol.map((money, index) => `Data Set ${index + 1}:\n${money}`).join('\n\n'));
