/*
2차원 dp
opt(val, count) := 숫자 count 개를 써서 val 값 만드는 경우의 수
opt(val, count) = opt(val-1, count-1) + opt(val-2, count-1) + opt(val-3, count-1)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...testCases] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let maxCount = 0;
let maxValue = 0;
testCases.forEach(([value, count]) => {
  maxCount = Math.max(count, maxCount);
  maxValue = Math.max(value, maxValue);
});

const opt = Array.from({ length: maxValue + 1 }, () =>
  Array.from({ length: maxCount + 1 }, () => 0),
);
opt[1][1] = 1;
opt[2][1] = 1;
opt[3][1] = 1;

for (let count = 2; count <= maxCount; count += 1) {
  for (let value = 2; value <= maxValue; value += 1) {
    opt[value][count] =
      (opt[value - 1][count - 1] +
        (opt[value - 2]?.[count - 1] ?? 0) +
        (opt[value - 3]?.[count - 1] ?? 0)) %
      1_000_000_009;
  }
}

const sol = testCases.map(([value, count]) => opt[value][count]);

console.log(sol.join('\n'));
