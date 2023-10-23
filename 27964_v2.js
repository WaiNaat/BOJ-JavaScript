const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...toppings] = require('fs').readFileSync(INPUT_FILE).toString().trim().split(/\s/);

const cheeses = toppings.filter((topping) => topping.match(/Cheese$/));
const cheeseCount = new Set(cheeses).size;

console.log(cheeseCount >= 4 ? 'yummy' : 'sad');
