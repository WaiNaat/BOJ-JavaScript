/*
길이가 X 이상인 부분합 중 최댓값 찾는 문제
  -> 특정 구간의 부분합은 누적합으로 금방 구함
누적합 배열에서 끝점-시작점이 최대가 되려면??
  -> 끝점은 가장 커야 하고 시작점은 가장 작아야 함

sum(i) := 0번~i번 누적합
opt(i) := i번을 끝점으로 하는 최대 구간합인데 길이가 X 이상
minSum(i) := min(sum(0), ..., sum(i))

opt(i) := sum(i) - minSum(i-X)
minSum(i) = min(sum(i), minSum(i-1))
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, ...gems] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const [minGemCount] = gems;
const sum = [0];
const minSum = [0];
const opt = [-Infinity];

for (let i = 1; i < gems.length; i += 1) {
  sum.push(sum[i - 1] + gems[i]);
  minSum.push(Math.min(sum[i], minSum[i - 1]));
  opt.push(sum[i] - (minSum[i - minGemCount] ?? Infinity));
}

const maxValue = Math.max(...opt);

console.log(maxValue > 0 ? maxValue : 0);
