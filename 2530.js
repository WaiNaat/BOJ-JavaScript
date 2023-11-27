const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [hh, mm, ss, time] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let hour = hh;
let minute = mm;
let second = ss + time;

minute += Math.floor(second / 60);
second %= 60;

hour += Math.floor(minute / 60);
minute %= 60;

hour %= 24;

console.log(hour, minute, second);
