/*
플로이드-워셜
근데 비용은 따지지 않는
opt(a, b):= a에서 b로 가는 길이 있는지
opt(a, b) = opt(a, b) or (opt(a, k) and opt(k, b))
  단, k는 a와 b가 아닌 임의의 점
 */
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[vertexCount], ...adjMatrix] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const opt = Array.from({ length: vertexCount }, (_, row) =>
  Array.from({ length: vertexCount }, (_, col) => adjMatrix[row][col]),
);

for (let mid = 0; mid < vertexCount; mid += 1) {
  for (let start = 0; start < vertexCount; start += 1) {
    for (let end = 0; end < vertexCount; end += 1) {
      opt[start][end] ||= opt[start][mid] && opt[mid][end];
    }
  }
}

console.log(opt.map((row) => row.join(' ')).join('\n'));
