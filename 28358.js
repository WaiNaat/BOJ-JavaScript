/*
1년은 365일이니까 그냥 한다
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const firstDay = new Date(2004, 0, 1);
const dayTime = new Date(2004, 0, 2) - firstDay;
const days = [];

for (let day = firstDay.valueOf(); new Date(day).getFullYear() < 2005; day += dayTime) {
  const today = new Date(day);
  const month = today.getMonth() + 1;
  const date = today.getDate();
  days.push(`${month}${date}`);
}

const getImpossibleNumbers = (test) => {
  const numbers = [];
  test.forEach((value, index) => {
    if (value) numbers.push(index.toString());
  });
  return numbers;
};

const sol = [];
tests.forEach((test) => {
  const impossibleNumbers = getImpossibleNumbers(test);

  if (!impossibleNumbers.length) {
    sol.push(days.length);
    return;
  }

  const impossibleRegex = new RegExp(impossibleNumbers.join('|'));
  const availableDays = days.filter((day) => !impossibleRegex.test(day));
  sol.push(availableDays.length);
});

console.log(sol.join('\n'));
