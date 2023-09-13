/*
꽉 찬 용기는 교환 ㄴㄴ
두 개를 더해서 절반 이상이면 꽉 참
세 개를 합치면 무조건 꽉 참

초과분에 대한 보상은 없음
  -> 많이 남은건 적게 남은거랑 합치기

작은거를 얼마나 빨리 털어내느냐가 중요

1. 작은거 2개를 합쳐서 절반 이상 -> 합쳐서 작은거를 줄인다
2. 작은거 1개, 큰거 1개랑 합쳐서 절반 이상 -> 합쳐서 작은거를 줄인다
3. 작은거 3개를 합쳐서 작은거를 줄인다.
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, volume, ...bottles] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(BigInt);

const half = (volume / 2n) * 2n === volume ? volume / 2n : volume / 2n + 1n;
bottles.sort((one, another) => (one >= another ? 1 : -1));

let sol = 0;

while (bottles.length && bottles[bottles.length - 1] === volume) {
  bottles.pop();
  sol += 1;
}

let left = 0;
let right = bottles.length - 1;

while (right - left >= 1) {
  if (bottles[left] + bottles[left + 1] >= half) {
    sol += 1;
    left += 2;
  } else if (bottles[left] + bottles[right] >= half) {
    sol += 1;
    left += 1;
    right -= 1;
  } else if (right - left >= 2) {
    sol += 1;
    left += 3;
  } else {
    break;
  }
}

console.log(sol);
