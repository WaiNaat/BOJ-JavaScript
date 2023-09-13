// 틀렸습니다 (예제조차 통과못함)

/*
꽉 찬 용기는 교환 ㄴㄴ
두 개를 더해서 절반 이상이면 꽉 참
세 개를 더하면 무조건 꽉 참

초과분에 대한 보상은 없음
  -> 많이 남은건 적게 남은거랑 합치기

1. 일단 꽉찬거 거르기
2. 절반 이상인 애들도 거르기
3. 큰거 하나 뽑기
4. 큰거랑 합쳐서 절반 넘는 가장 작은 작은거 뽑아서 합치기
5. 3과 4를 반복, 선별된 애들과 남은애들로 나누기
6. 2와 5에서 선별된 애들(무조건 절반이상) 남은애들(몰루) 하나씩 합치기
7. 6 하고 남은애들 중 절반 넘는 게 있으면 그거랑 작은거랑 합치기
8. 7에서 남은애들(두개 합쳐도 절반미만)은 세 개씩 합치기
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, volume, ...bottles] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const half = volume / 2;
bottles.sort((one, another) => one - another);

let sol = 0;

// 1
while (bottles.length && bottles[bottles.length - 1] === volume) {
  bottles.pop();
  sol += 1;
}
console.log(bottles);
// 2
let bottlesMoreThanHalfCount = 0;

while (bottles.length && bottles[bottles.length - 1] >= half) {
  bottles.pop();
  bottlesMoreThanHalfCount += 1;
}

console.log(bottlesMoreThanHalfCount);
// 3, 4, 5
const remainders = [];
let left = 0;
let right = bottles.length - 1;

while (left < right) {
  if (bottles[left] + bottles[right] >= half) {
    bottlesMoreThanHalfCount += 1;
    left += 1;
    right -= 1;
  } else {
    remainders.push(bottles[left]);
    left += 1;
  }
}

if (left === right) {
  if (bottles[right] >= half) {
    bottlesMoreThanHalfCount += 1;
  } else {
    remainders.push(bottles[right]);
  }
}
console.log(bottlesMoreThanHalfCount, remainders);
// 6
sol += Math.min(bottlesMoreThanHalfCount, remainders.length);

bottlesMoreThanHalfCount -= Math.min(bottlesMoreThanHalfCount, remainders.length);
for (let i = 0; i < bottlesMoreThanHalfCount; i += 1) {
  remainders.push(half);
}
console.log(remainders);
// 7
let remainderCount = 0;

left = Math.max(0, Math.min(bottlesMoreThanHalfCount, remainders.length));
right = remainders.length - 1;

while (left < right) {
  if (remainders[left] + remainders[right] >= half) {
    sol += 1;
    left += 1;
    right -= 1;
  } else {
    remainderCount += 1;
    left += 1;
  }
}

if (left === right) remainderCount += 1;

// 8
sol += Math.floor(remainderCount / 3);

console.log(sol);
