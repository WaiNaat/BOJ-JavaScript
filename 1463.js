/*
opt(i) := i를 1로 만드는 데 필요한 최소 연산 횟수
opt(i) =
  opt(i/3)  단, i%3=0
  opt(i/2)  단, i%2=0
  opt(i-1)
  셋 중 최솟값에 1을 더한 값
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const target = Number(require('fs').readFileSync(INPUT_FILE).toString());

const counts = [Infinity, 0];

for (let i = 2; i <= target; i += 1) {
  counts.push(1 + Math.min(
    counts[i / 3] ?? Infinity,
    counts[i / 2] ?? Infinity,
    counts[i - 1],
  ));
}

console.log(counts[target]);
