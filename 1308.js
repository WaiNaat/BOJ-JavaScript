/*
시작 해와 끝 해 사이의 온전한 한 해들은 윤년인지 보고 365, 366

시작 해: 12월 31일에서 시작일 빼기
끝 해: 끝일에서 1월 1일 빼기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [startDate, endDate] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((date) => {
    const [year, month, day] = date.split(' ').map(Number);
    return { year, month: month - 1, day };
  });

const SINGLE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;
  return year % 4 === 0 && year % 100 !== 0;
};

const isCampTooLong = (start, end) => {
  if (end.year - start.year !== 1000) return (end.year - start.year) >= 1000;
  return start.month < end.month || (start.month === end.month && start.day <= end.day);
};

const countDaysBetweenTwoYears = (startYear, endYear) => {
  let count = 0;

  for (let year = startYear + 1; year < endYear; year += 1) {
    count += isLeapYear(year) ? 366 : 365;
  }

  return count;
};

const countDDayInSameYear = (
  { month: startMonth, day: startDay },
  { month: endMonth, day: endDay },
  isLeapYearBoolean,
) => {
  const year = isLeapYearBoolean ? 1996 : 1997;

  const diff = new Date(year, endMonth, endDay) - new Date(year, startMonth, startDay);

  return diff / SINGLE_DAY_MILLISECONDS;
};

const countDDay = (start, end) => {
  const daysBetweenYears = countDaysBetweenTwoYears(start.year, end.year);
  const daysInTargetYears = start.year === end.year
    ? countDDayInSameYear(start, end, isLeapYear(start.year))
    : (
      countDDayInSameYear(start, { month: 11, day: 31 }, isLeapYear(start.year))
        + countDDayInSameYear({ month: 0, day: 1 }, end, isLeapYear(end.year))
        + 1
    );

  return daysBetweenYears + daysInTargetYears;
};

console.log(isCampTooLong(startDate, endDate) ? 'gg' : `D-${countDDay(startDate, endDate)}`);
