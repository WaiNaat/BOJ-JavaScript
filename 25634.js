/*
누적합?

lux(i) := i번 전구의 밝기
sum(i) := 0번~i번 전구까지의 밝기 합
reverse(i) := 0번~i번 전구를 뒤집었을 때 밝기 합
diff(i) = reverse(i)-sum(i)

i번~j번까지 뒤집었을 때 그 부분 전구의 밝기 합
  -> reverse(j)-reverse(i-1)

i번~j번까지 뒤집었을 때 총 전구의 밝기 합
  -> sum(i-1) + reverse(j) - reverse(i-1) + sum(last) - sum(j)
  이걸 최대로 하는 문제
  -> (reverse(j) - sum(j)) - (reverse(i-1) - sum(i-1)) + sum(last)
  -> diff(j) - diff(i-1) + sum(last)    (단, i<=j)
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, luxList, isOn] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const luxSums = [0];
const reverse = [0];

luxList.forEach((lux, index) => {
  const prevSum = luxSums[index];
  const prevReverse = reverse[index];

  if (isOn[index]) {
    luxSums.push(prevSum + lux);
    reverse.push(prevReverse);
  } else {
    luxSums.push(prevSum);
    reverse.push(prevReverse + lux);
  }
});

const diff = Array.from({ length: luxSums.length }).map(
  (_, index) => reverse[index] - luxSums[index],
);

const totalSum = luxSums.pop();
let min = 0;
let sol = -Infinity;

for (let right = 1; right < diff.length; right += 1) {
  if (min > diff[right - 1]) min = diff[right - 1];

  const result = diff[right] - min + totalSum;
  if (sol < result) sol = result;
}

console.log(sol);
