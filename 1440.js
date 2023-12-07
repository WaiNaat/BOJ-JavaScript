/*
어차피 많아야 6종류 -> 그냥 완탐ㄱ
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const time = require('fs').readFileSync(INPUT_FILE).toString().trim().split(':').map(Number);

const isHour = (value) => value >= 1 && value <= 12;
const isMinuteOrSecond = (value) => value <= 59;
const candidates = ['hms', 'hsm', 'mhs', 'msh', 'shm', 'smh'];
const isValid = (value, target) => {
  if (target === 'h') return isHour(value);
  return isMinuteOrSecond(value);
};

const sol = candidates.filter(
  (candidate) =>
    isValid(time[0], candidate[0]) &&
    isValid(time[1], candidate[1]) &&
    isValid(time[2], candidate[2]),
).length;

console.log(sol);
