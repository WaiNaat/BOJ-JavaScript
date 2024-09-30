/*
섭취를 하나씩 실행하는 게 아님
일단 쿼리와 섭취를 분리한 후 나중에 쿼리만 정리하는거

쿼리 1만개 * 쿼리마다 100개의 음식 계산
그냥 구현하면 될듯?
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const commands = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const chocolates = [];
const coffees = [];
const queries = [];
commands.forEach(([command, a, b]) => {
  switch (command) {
    case 'Query':
      queries.push(Number(a));
      break;
    case 'Chocolate':
      chocolates.push([Number(a), Number(b)]);
      break;
    case 'Coffee':
      coffees.push([Number(a), Number(b)]);
      break;
    default:
      break;
  }
});

const sol = queries
  .sort((a, b) => a - b)
  .map((time) => {
    const chocoPower = chocolates.reduce((sum, [eatTime, amount]) => {
      const power = time >= eatTime ? Math.max(8 * amount - (time - eatTime) / 12, 0) : 0;
      return sum + power;
    }, 0);
    const coffeePower = coffees.reduce((sum, [eatTime, amount]) => {
      const power = time >= eatTime ? Math.max(2 * amount - (time - eatTime) ** 2 / 79, 0) : 0;
      return sum + power;
    }, 0);
    const safeDistance = Math.max(1, coffeePower + chocoPower);

    return `${time} ${safeDistance.toFixed(1)}`;
  })
  .join('\n');

console.log(sol);
