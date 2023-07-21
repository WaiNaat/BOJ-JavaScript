/*
50000 이하의 제곱수들을 구한다 -> 일단 300개 아래임

*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = Number(require('fs').readFileSync(INPUT_FILE).toString());

const squareNumbers = [];
for (let i = 1; i * i <= target; i += 1) {
  squareNumbers.push(i * i);
}

const opt = [0];
for (let i = 1; i <= target; i += 1) {
  let minNumber = Infinity;

  squareNumbers.forEach((value) => {
    if (i >= value && opt[i - value] < minNumber) {
      minNumber = opt[i - value];
    }
  });

  opt.push(minNumber + 1);
}

console.log(opt.pop());
