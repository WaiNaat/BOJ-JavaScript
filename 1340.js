const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [month, day, year, time] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ');

const DAY_MINUTES = 24 * 60;

const monthIndex = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year) => (
  (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)
);

const timeToMinutes = (hour, minute) => hour * 60 + minute;

const yesterdays = (year, month, day) => {
  const monthNumber = monthIndex[month];
  const days = monthDays
    .filter((value, index) => index < monthNumber)
    .reduce((prev, value) => prev + value, 0);

  const leapYearDay = isLeapYear(year) && monthNumber > 1 ? 1 : 0;

  return days + leapYearDay + (day - 1);
};

const yearMinutes = (isLeapYear(year) ? 366 : 365) * DAY_MINUTES;

const todayMinutes = (
  yesterdays(
    Number(year),
    month,
    Number(day.slice(0, day.length - 1)),
  ) * DAY_MINUTES
  + timeToMinutes(...time.split(':').map(Number))
);

console.log(((todayMinutes / yearMinutes) * 100).toFixed(10));
