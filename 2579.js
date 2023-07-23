/*
opt(i, k) := i번 계단까지 도착하는데 직전에 연속으로 밟은 계단이 k개일 경우 최대 점수
score(i) := i번 계단의 점수

opt(i, 2) = opt(i-1, 1) + score(i)
opt(i, 1) = max(opt(i-2, 1), opt(i-2, 2)) + score(i)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const scores = require('fs').readFileSync(INPUT_FILE).toString().trim().split('\n').map(Number);

const continuous = [0, scores[1]];
const discontinuous = [0, scores[1]];

for (let i = 2; i < scores.length; i += 1) {
  continuous.push(discontinuous[i - 1] + scores[i]);
  discontinuous.push(Math.max(discontinuous[i - 2], continuous[i - 2]) + scores[i]);
}

console.log(Math.max(continuous.pop(), discontinuous.pop()));
