const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [start, end] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split(' ')
  .map(Number);

const isPrime = new Array(end + 1).fill(true);
const primeNumbers = [];

isPrime[0] = false;
isPrime[1] = false;

for (let number = 2; number <= end; number += 1) {
  if (isPrime[number]) {
    primeNumbers.push(number);

    for (let notPrimeNumber = number * 2; notPrimeNumber <= end; notPrimeNumber += number) {
      isPrime[notPrimeNumber] = false;
    }
  }
}

console.log(primeNumbers.filter((value) => value >= start && value <= end).join('\n'));
