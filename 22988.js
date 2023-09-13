// 틀렸습니다
/*
반례

4 2
0 0 0 0 0 0

출력:1
정답:2
*/

/*
꽉 찬 용기는 교환 ㄴㄴ
두 개를 더해서 절반 이상이면 꽉 참
세 개를 더하면 무조건 꽉 참

초과분에 대한 보상은 없음
  -> 많이 남은건 적게 남은거랑 합치기

1. 일단 꽉찬거 거르기
2. 절반 이상인 애들도 거르기
3. 큰거랑 작은거랑 합쳐서 꽉찬거/아닌거 나누기
  히나씨의 병이 홀수개라 1개가 남으면 그건 안꽉찬거로 침
4. 2에서 거른거랑 3에서 안꽉찬거 합치기
  여기서 두 개를 합치면 무조건 꽉 참
  3에서 남은 게 있어도 1개뿐이라 ㄱㅊ
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, volume, ...bottles] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

bottles.sort((one, another) => one - another);

let sol = 0;
let aboveHalfBottlesCount = 0;

while (bottles.length && bottles[bottles.length - 1] === volume) {
  bottles.pop();
  sol += 1;
}

while (bottles.length && bottles[bottles.length - 1] >= volume / 2) {
  bottles.pop();
  aboveHalfBottlesCount += 1;
}

let left = 0;
let right = bottles.length - 1;

while (right - left > 0) {
  aboveHalfBottlesCount += 1;
  left += 1;
  right -= 1;
}

if (left === right) {
  aboveHalfBottlesCount += 1;
}

sol += Math.floor(aboveHalfBottlesCount / 2);

console.log(sol);
