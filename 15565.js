/*
dp는 아닌거같은데 dp 맞나

ryan(i) := i번째 라이언 인형의 위치
opt(i) :=
  i번쨰 라이언 인형을 마지막으로 했을 때
  라이언 인형이 k개 이상 있는 가장 작은 연속된 인형들의 집합의 크기
opt(i) = ryan(i) - ryan(i-k+1) + 1
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, neededRyan, ...dolls] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const ryan = [];
dolls.forEach((value, index) => {
  if (value === 1) ryan.push(index);
});

let sol = Infinity;
for (let i = neededRyan - 1; i < ryan.length; i += 1) {
  const size = ryan[i] - ryan[i - neededRyan + 1] + 1;
  if (size < sol) sol = size;
}

console.log(sol !== Infinity ? sol : -1);
