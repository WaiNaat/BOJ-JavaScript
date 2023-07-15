const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const toppings = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/);

const cheeseCount = [...new Set(toppings)]
  .filter((topping) => /Cheese$/.test(topping))
  .length;

console.log(cheeseCount >= 4 ? 'yummy' : 'sad');
