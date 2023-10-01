/*
dp에 이분탐색 섞으면되나?

opt(i) := 최소 휴일이 적어도 X일일 때 i일째 할 수 있는 최대 일의 양
work(i) := i일에 하는 일의 양
opt(i) =
  opt(i-X-1) + work(i)
  opt(i-1)
  둘 중에 큰 값

X를 찾기 위해서 이분탐색

움직이는 값: X
비교 대상: 마지막 날까지 일했을 때 할 수 있는 일의 양
기준: 할당량

비교대상이 기준보다 작으면 X를 줄임
비교대상이 기준보다 크거나 같으면 X를 늘림
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, quota, ...works] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const getWorkAmount = (holiday) => {
  const opt = [];

  works.forEach((work, index) => {
    opt.push(
      Math.max(
        (index >= holiday + 1 ? opt[index - holiday - 1] : 0) + work,
        index > 0 ? opt[index - 1] : 0,
      ),
    );
  });

  return opt.pop();
};

let max = 0;
let sum = 0;

works.forEach((work) => {
  if (max < work) max = work;
  sum += work;
});

let sol;

if (max >= quota) {
  sol = 'Free!';
} else if (sum < quota) {
  sol = -1;
} else {
  let left = 0;
  let right = works.length + 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (getWorkAmount(mid) < quota) right = mid;
    else left = mid + 1;
  }

  sol = left - 1;
}

console.log(sol);
