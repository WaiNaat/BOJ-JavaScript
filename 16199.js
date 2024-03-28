const INPUIT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [birthday, today] = require('fs')
  .readFileSync(INPUIT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const isBefore = (one, another) => {
  const [, month1, date1] = one;
  const [, month2, date2] = another;

  return month1 < month2 || (month1 === month2 && date1 < date2);
};

const yearDiff = today[0] - birthday[0];
const age = yearDiff + (isBefore(today, birthday) ? -1 : 0);
const countingAge = yearDiff + 1;
const yearAge = yearDiff;

console.log([age, countingAge, yearAge].join('\n'));
