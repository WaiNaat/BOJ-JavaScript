// .toString() 의 인수가 2~36까지라 실패.

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...tests] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const nim = (b, x, y) => {
  const xBaseB = x.toString(b);
  const yBaseB = y.toString(b);
  const longerLength = Math.max(xBaseB, yBaseB);
  const xPadded = Array.from(xBaseB.padStart(longerLength, '0')).map(Number);
  const yPadded = Array.from(yBaseB.padStart(longerLength, '0')).map(Number);
  const nimSum = [];
  for (let i = 0; i < longerLength; i += 1) {
    nimSum.push((xPadded[i] + yPadded[i]) % b);
  }
  return parseInt(nimSum.join(''), b);
};

const sol = tests.map(nim);

console.log(sol.join('\n'));
