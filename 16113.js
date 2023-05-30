/*
구현
세로로 읽는게 괜찮아보임
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, signal] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n');

const verticalSignalToNumber = {
  '.....': 0,
  '#...#': 1,
  '#.###': 2,
  '###.#': 3,
  '#.#.#': 4,
  '#....': 5,
  '###..': 6,
  '..#..': 7,
  '#####': 8,
};

const numberToDigit = {
  818: 0,
  8: 1,
  243: 2,
  448: 3,
  678: 4,
  342: 5,
  842: 6,
  558: 7,
  848: 8,
  348: 9,
};

const horizontalLength = signal.length / 5;
const verticalSignal = [];

for (let i = 0; i < horizontalLength; i += 1) {
  const column = [];

  for (let row = 0; row < 5; row += 1) {
    column.push(signal[row * horizontalLength + i]);
  }

  verticalSignal.push(verticalSignalToNumber[column.join('')]);
}
verticalSignal.push(0);

const sol = [];
let signalNumber = 0;

for (let i = 0; i < verticalSignal.length; i += 1) {
  if (verticalSignal[i] !== 0) {
    signalNumber *= 10;
    signalNumber += verticalSignal[i];
  } else if (signalNumber > 0) {
    sol.push(numberToDigit[signalNumber]);
    signalNumber = 0;
  }
}

console.log(sol.join(''));
