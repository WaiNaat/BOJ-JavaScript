/*
플로이드-워셜
opt(a, b):= a에서 b로 가는 최소비용
opt(a, b) = min(opt(a, k)+opt(k, b), opt(a, b))
  단, k는 a와 b가 아닌 임의의 점
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[cityCount], , ...busList] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const opt = Array.from({ length: cityCount }, (_, row) =>
  Array.from({ length: cityCount }, (_, col) => {
    return row === col ? 0 : Infinity;
  }),
);

busList.forEach(([a, b, cost]) => {
  const start = a - 1;
  const end = b - 1;
  opt[start][end] = Math.min(opt[start][end], cost);
});

for (let mid = 0; mid < cityCount; mid += 1) {
  for (let start = 0; start < cityCount; start += 1) {
    for (let end = 0; end < cityCount; end += 1) {
      opt[start][end] = Math.min(opt[start][end], opt[start][mid] + opt[mid][end]);
    }
  }
}

for (let row = 0; row < cityCount; row += 1) {
  for (let col = 0; col < cityCount; col += 1) {
    if (opt[row][col] === Infinity) {
      opt[row][col] = 0;
    }
  }
}

console.log(opt.map((row) => row.join(' ')).join('\n'));
