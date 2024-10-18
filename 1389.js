/*
간선의 비용이 1인 플로이드-워셜
opt(a, b):= a에서 b로 가는 최소비용
opt(a, b) = min(opt(a, b), opt(a, k)+opt(k, b))
  단, k는 a와 b가 아닌 임의의 점
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[userCount], ...friends] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const opt = Array.from({ length: userCount }, (_, row) =>
  Array.from({ length: userCount }, (_, col) => (row === col ? 0 : Infinity)),
);

friends.forEach(([a, b]) => {
  opt[a - 1][b - 1] = 1;
  opt[b - 1][a - 1] = 1;
});

for (let mid = 0; mid < userCount; mid += 1) {
  for (let start = 0; start < userCount; start += 1) {
    for (let end = 0; end < userCount; end += 1) {
      opt[start][end] = Math.min(opt[start][end], opt[start][mid] + opt[mid][end]);
    }
  }
}

const scores = opt
  .map((row, person) => [person, row.reduce((sum, cur) => sum + cur, 0)])
  .sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

const [person] = scores.at(0);

console.log(person + 1);
