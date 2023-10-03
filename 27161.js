const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...cards] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

let hour = 1;
let direction = 1;

const setNextHour = () => {
  hour = (hour + 12 + direction) % 12;
  if (hour === 0) hour = 12;
};
const sol = [];

cards.forEach(([drawing, value]) => {
  const cardHour = Number(value);

  if (drawing === 'HOURGLASS') {
    sol.push(`${hour} NO`);
    if (cardHour !== hour) direction = -direction;
  } else {
    sol.push(`${hour} ${cardHour === hour ? 'YES' : 'NO'}`);
  }

  setNextHour();
});

console.log(sol.join('\n'));
