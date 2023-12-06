/*
가장 큰 감소하는 수: 9,876,543,210

i자리 감소하는 수의 개수?
opt(i, num) := 가장 큰 자릿수가 num인 i자리 감소하는 수의 개수
opt(i, num) = sum(opt(i-1, k))  (단, k < num)

98
210
310
320

그냥 하나씩 늘려볼까
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = Number(require('fs').readFileSync(INPUT_FILE).toString());

const value = [0];
let count = 0;

const isComplete = () => {
  for (let i = 0; i < value.length; i += 1) {
    if (value[i] !== 10 - value.length + i) return false;
  }
  return true;
};

const reset = (before) => {
  for (let i = 0; i < before; i += 1) {
    value[i] = i;
  }
};

const increase = () => {
  for (let i = 0; i < value.length - 1; i += 1) {
    if (value[i] + 1 < value[i + 1]) {
      reset(i);
      value[i] += 1;
      return;
    }
  }

  reset(value.length - 1);
  value[value.length - 1] += 1;
};

const setNextValue = () => {
  if (value.length === 10) return;

  if (isComplete()) {
    reset(value.length);
    value.push(value.length);
  } else {
    increase();
  }

  count += 1;
};

for (let i = 1; i <= target; i += 1) {
  setNextValue();
}

console.log(count === target ? value.reverse().join('') : -1);
