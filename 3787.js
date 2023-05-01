/*
내가 X번째 숫자를 찾는 거라면

등차수열의 합
n(n+1)/2 <= X < (n+1)(n+2)/2 인 n을 찾아야 함

n이 홀수면 시작점에서 분자가 더 크고
짝수면 시작점에서 분모가 더 큼
*/

const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const numbers = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map(Number);

const maxNumber = Math.max(...numbers);
const sum = [0];
for (let i = 1; sum[sum.length - 1] < maxNumber; i += 1) {
  sum.push(sum[sum.length - 1] + i);
}

const findIndex = (value) => {
  let left = 0;
  let right = sum.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sum[mid] === value) return mid;

    if (sum[mid] < value) left = mid + 1;
    else right = mid;
  }

  return left;
};

const sol = [];
numbers.forEach((number) => {
  const base = findIndex(number);
  const index = number - sum[base - 1];

  if (base % 2 === 0) sol.push([number, `${(index)}/${(base + 1 - index)}`]);
  else sol.push([number, `${(base + 1 - index)}/${(index)}`]);
});

console.log(sol.map(([termIndex, value]) => `TERM ${termIndex} IS ${value}`).join('\n'));
