/*
9!니까 그냥 완탐ㄱ
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [totalCount, pickCount, ...weights] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const isPrime = (value) => {
  if (value < 2) return false;
  for (let i = 2; i ** 2 <= value; i += 1) {
    if (value % i === 0) return false;
  }
  return true;
};

const primes = new Set();

for (let i = 1; i < 2 ** totalCount; i += 1) {
  const status = [...i.toString(2).padStart(totalCount, '0')];

  if (status.filter((value) => value === '1').length !== pickCount) continue;

  let sum = 0;
  for (let j = 0; j < weights.length; j += 1) {
    if (status[j] === '1') sum += weights[j];
  }

  if (isPrime(sum)) primes.add(sum);
}

const sol = [...primes.values()].sort((one, another) => one - another);

console.log(sol.length ? sol.join(' ') : -1);
