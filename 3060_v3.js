/*
각 돼지는 매일 본인이 먹던 양만큼 좌, 우, 맞은편 돼지에게 줌
-> 네 배씩 늘어남
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const getBadNewsDay = (everydayFood, firstDayFood) => {
  let day;
  let todayFood = firstDayFood;

  for (day = 1; todayFood <= everydayFood; day += 1) {
    todayFood *= 4;
  }

  return day;
};

const sol = [];

for (let i = 0; i < tests.length; i += 2) {
  const [everydayFood] = tests[i];
  const firstDayFood = tests[i + 1].reduce((prev, cur) => prev + cur, 0);
  sol.push(getBadNewsDay(everydayFood, firstDayFood));
}

console.log(sol.join('\n'));
