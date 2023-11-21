const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...times] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const getYPrice = (time) => Math.ceil((time + 1) / 30) * 10;
const getMPrice = (time) => Math.ceil((time + 1) / 60) * 15;

const yPrice = times.reduce((prev, time) => prev + getYPrice(time), 0);
const mPrice = times.reduce((prev, time) => prev + getMPrice(time), 0);

if (yPrice === mPrice) {
  console.log(`Y M ${yPrice}`);
} else if (yPrice > mPrice) {
  console.log(`M ${mPrice}`);
} else {
  console.log(`Y ${yPrice}`);
}
