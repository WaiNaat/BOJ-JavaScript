// 이게 되네ㅋㅋㅋㅋ (2040ms)

/*
최대한 많은 커플을 만들어야 함
  >> 무조건 min(m, n)쌍의 커플 필요

결국 남녀 중 더 수가 많은 쪽은 커플을 못 만들어줄 수 있음
  = 더 적은 쪽에 '선택권'이 있음
  = 수가 적은 성별이 '패스권'을 사용해서 마음에 들지 않는 사람을 넘기는 기능

opt(i, pass) := 더 적은 성별의 i번째 인원, 여태까지 사용한 패스권 pass개일 때
  성격의 차이의 합 최솟값
diff(x, y) := 더 적은 성별의 x번째 사람과 그 이성의 y번째 사람 간 성격 차이

opt(i-1, pass)가 주어졌을 때
  opt(i, pass)   = opt(i-1, pass) + diff(i, i+pass)
  opt(i, pass+1) = opt(i-1, pass) + diff(i, i+pass+1)
  opt(i, pass+2) = opt(i-1, pass) + diff(i, i+pass+2)
  ...
  opt(i, pass+k) = opt(i-1, pass) + diff(i, i+pass+k)
  이런식으로 계산이 가능
  단, i+pass+k < max(m, n)

opt(i, ?) 계산에 opt(i-1, ?)만 필요하므로 cur, next 두 배열로 처리가능
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [[menCount, womenCount], men, women] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// process
men.sort((a, b) => a - b);
women.sort((a, b) => a - b);
const majority = menCount < womenCount ? women : men;
const minority = menCount < womenCount ? men : women;
const MAX_PASS = majority.length - minority.length;
const difference = (x, y) => Math.abs(minority[x] - majority[y]);

let cur = new Array(MAX_PASS + 1).fill(0).map((value, index) => difference(0, index));
for (let i = 1; i < minority.length; i += 1) {
  const next = new Array(MAX_PASS + 1).fill(Infinity);
  for (let pass = 0; pass <= MAX_PASS; pass += 1) {
    for (let k = 0; i + pass + k < majority.length; k += 1) {
      next[pass + k] = Math.min(next[pass + k], cur[pass] + difference(i, i + pass + k));
    }
  }
  cur = next;
}

// output
console.log(Math.min(...cur));
