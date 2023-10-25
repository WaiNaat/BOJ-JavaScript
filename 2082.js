/*
2초? 노가다 ㄱ
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(INPUT_FILE).toString().trim();

const digital = [
  '###  ..#  ###  ###  #.#  ###  ###  ###  ###  ###'.split('  '),
  '#.#  ..#  ..#  ..#  #.#  #..  #..  ..#  #.#  #.#'.split('  '),
  '#.#  ..#  ###  ###  ###  ###  ###  ..#  ###  ###'.split('  '),
  '#.#  ..#  #..  ..#  ..#  ..#  #.#  ..#  #.#  ..#'.split('  '),
  '###  ..#  ###  ###  ..#  ###  ###  ..#  ###  ###'.split('  '),
];

const toTimeString = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
};

const makeDigitalClock = (timeString) => {
  const numbers = Array.from(timeString).map(Number);
  const clock = [];

  for (let i = 0; i < 5; i += 1) {
    clock.push(numbers.map((value) => digital[i][value]).join(' '));
  }

  return clock.join('\n');
};

const isSubset = (subset, superset) => {
  for (let i = 0; i < 5 * 16; i += 1) {
    if (subset[i] === '#' && superset[i] === '.') return false;
  }
  return true;
};

let time;

for (time = 0; time < 60 * 24; time += 1) {
  if (isSubset(input, makeDigitalClock(toTimeString(time)))) {
    break;
  }
}

time = toTimeString(time);

console.log(`${time.slice(0, 2)}:${time.slice(2)}`);
