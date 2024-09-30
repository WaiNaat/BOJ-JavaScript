/*
백트래킹하기에는 9999가 너무 큼
마지막 글자만 보기에는 0이 뜨면 받아올림으로 인해서 위험도가 있음
그러면 0을 빼고 나머지를 다 저장한담에 bigint를 써야하나?
이래도 너무 큼

그러면 0을 제외하고 끝에 몇자리만 저장하는건가?
몇자리인지 정하기가 어려움

일단 곱해야 하는 수도 10의 배수면 0빼기를 해야함
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const values = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n').map(Number);

const lastNonZeroDigits = [1];
const removeLastZeroes = (value) => {
  const digits = Array.from(value.toString());
  while (digits.at(-1) === '0') {
    digits.pop();
  }
  return Number(digits.join(''));
};
const sol = values.map((value) => {
  while (lastNonZeroDigits.length <= value) {
    const result = removeLastZeroes(
      lastNonZeroDigits.at(-1) * removeLastZeroes(lastNonZeroDigits.length),
    );
    const someLastDigits = result % 1000000;

    lastNonZeroDigits.push(someLastDigits);
  }
  return `${value.toString().padStart(5, ' ')} -> ${lastNonZeroDigits[value].toString().at(-1)}`;
});

console.log(sol.join('\n'));
