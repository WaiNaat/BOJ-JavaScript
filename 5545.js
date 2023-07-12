/*
칼로리 높은 토핑부터 올려보면서 고점을 찾는다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [toppingCount, doughPrice, toppingPrice, doughCalorie, ...toppingCalories] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(/\s/)
  .map(Number);

toppingCalories.sort((a, b) => b - a);

let price = doughPrice;
let calorie = doughCalorie;
let bestPizza = Math.floor(doughCalorie / doughPrice);

for (let i = 0; i < toppingCount; i += 1) {
  price += toppingPrice;
  calorie += toppingCalories[i];

  const pizzaEfficiency = Math.floor(calorie / price);

  if (bestPizza < pizzaEfficiency) bestPizza = pizzaEfficiency;
}

console.log(bestPizza);
