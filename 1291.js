/*
이면수
1) 6 이상의 자연수이고 각 자릿수의 합이 홀수

임현수
1) 2 또는 4
2) 소인수가 짝수개

성경수
1) 이면수도 아니고 임현수도 아님
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

const getPrimeNumbersSmallerThan = (number) => {
  const isPrimeNumber = new Array(number + 1).fill(true);
  isPrimeNumber[0] = false;
  isPrimeNumber[1] = false;

  for (let candidate = 2; candidate <= number; candidate += 1) {
    if (isPrimeNumber[candidate]) {
      isPrimeNumber[candidate] = candidate;

      for (let notPrime = candidate * 2; notPrime <= number; notPrime += candidate) {
        isPrimeNumber[notPrime] = false;
      }
    }
  }

  return isPrimeNumber.filter((candidate) => candidate);
};

const isOtherSideNumber = (number) => {
  if (number < 6) return false;

  const digitSum = number.toString().split('').map(Number).reduce((prev, cur) => prev + cur, 0);
  if (digitSum % 2 === 1) return true;
  return false;
};

const isImhyeonNumber = (number) => {
  if (number === 2 || number === 4) return true;

  const primes = getPrimeNumbersSmallerThan(number);

  let value = number;
  let primeFactorCount = 0;

  primes.forEach((prime) => {
    if (value > 1 && value % prime === 0) {
      primeFactorCount += 1;
      while (value % prime === 0) value /= prime;
    }
  });

  if (primeFactorCount && primeFactorCount % 2 === 0) return true;
  return false;
};

let status = 0;

if (isOtherSideNumber(N)) status += 1;
if (isImhyeonNumber(N)) status += 2;
if (status === 3) status = 4;
if (status === 0) status = 3;

console.log(status);
