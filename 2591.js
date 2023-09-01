/*
opt(i) := 앞에서 i개의 숫자를 만들 수 있는 배열의 수
opt(i) =
  opt(i-1)
    i번째 숫자가 0이 아니어야 함
  opt(i-2)
    i-1번째 숫자가 0이 아니어야 함
    i-1번째 숫자와 i번째 숫자를 이은 값이 카드풀에 있어야 함
  이 값들의 합
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const numbers = require('fs').readFileSync(INPUT_FILE).toString().trim();

const opt = [1, Number(`${numbers[0]}${numbers[1]}`) <= 34 && numbers[1] !== '0' ? 2 : 1];

for (let i = 2; i < numbers.length; i += 1) {
  const value1 = numbers[i] !== '0' ? opt[i - 1] : 0;
  const value2 =
    numbers[i - 1] !== '0' && Number(`${numbers[i - 1]}${numbers[i]}`) <= 34 ? opt[i - 2] : 0;
  opt.push(value1 + value2);
}

console.log(opt[numbers.length - 1]);
