/*
15의 배수 <-- 자릿수 합이 3의 배수이면서 5로 끝남

총 여섯 조각으로 나눔
자릿수 합을 3으로 나눈 나머지가 0, 1, 2
일의 자리가 1, 5
--> 여기서 나머지가 0이고 일의자리가 5인 애들이 15의 배수

opt(digits, remainder, unit) :=
  digits자리 숫자인데 3으로 나눈 나머지거 remainder이고 일의 자리가 unit인 수의 개수

opt(i, 0, 5) = sum(
  // 나머지가 1인 애들에 5를 붙이면 나머지가 0이 되면서 15의 배수가 됨
  opt(i-1, 1, 1),
  opt(i-1, 1, 5)
)

비슷한 방법으로 나머지 다섯 세트도 점화식 유도 가능

opt(i, ?, ?) 계산에 opt(i-1, ?, ?)만 필요
--> 배열로 구성할 필요 없이 cur, next로 처리
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(INPUT_FILE).toString());

const DIVIDEND = 1_000_000_007;

let cur = new Array(3).fill(null).map(() => ({ 1: 0, 5: 0 }));
cur[1][1] = 1;
cur[2][5] = 1;

for (let digits = 2; digits <= N; digits += 1) {
  const next = new Array(3).fill(null).map(() => ({ 1: 0, 5: 0 }));

  next[0][1] = (cur[2][1] + cur[2][5]) % DIVIDEND; // 1을 붙여서 나머지가 0이되려면 나머지가 2여야함

  next[0][5] = (cur[1][1] + cur[1][5]) % DIVIDEND; // 5를 붙여서 나머지가 0이되려면 나머지가 1이어야함

  next[1][1] = (cur[0][1] + cur[0][5]) % DIVIDEND; // 1을 붙여서 나머지가 1이되려면 나머지가 0이어야함

  next[1][5] = (cur[2][1] + cur[2][5]) % DIVIDEND; // 5를 붙여서 나머지가 1이되려면 나머지가 2여야함

  next[2][1] = (cur[1][1] + cur[1][5]) % DIVIDEND; // 1을 붙여서 나머지가 2가되려면 나머지가 1이어야함

  next[2][5] = (cur[0][1] + cur[0][5]) % DIVIDEND; // 5를 붙여서 나머지가 2가되려면 나머지가 0이어야함

  cur = next;
}

console.log(cur[0][5]);
