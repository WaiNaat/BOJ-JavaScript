/*
백트래킹

10^10
  일단 Number 범위 안에는 들어감
  최대 10자리라는 뜻이므로 회문수 자체는 5번정도의 재귀로 만들 수 있음
  그러면 내가 해야할건 회문수가 주어진 범위 안인지 검사하는 것뿐

아 근데 0이 문제긴 하네
  010 은 회문수가 아니지만 10101, 1001001 은 회문수임
  10으로 나눠떨어지는 숫자는 세지 않아야 할듯함
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const max = Number(require('fs').readFileSync(INPUT_FILE).toString());

const maxDigitCount = max.toString().length;
let sol = 0;
const digits = Array.from('0123456789');
const traverse = (cur) => {
  const value = Number(cur);
  if (value > max || cur.length > maxDigitCount) {
    return;
  }

  sol += value % 10 === 0 ? 0 : 1;

  digits.forEach((digit) => {
    traverse(`${digit}${cur}${digit}`);
  });
};

digits.forEach((digit) => {
  traverse(digit);
  traverse(`${digit}${digit}`);
});

console.log(sol);
