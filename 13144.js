/*
슬라이딩 윈도우
1. 윈도우를 오른쪽으로 하나 늘림
2. 중복이 있으면 없을때까지 왼쪽부터 줄임
3. 현재 윈도우 길이가
  현재 윈도우 오른쪽 끝 값을 반드시 포함해서 만들 수 있는 수열에서연속한~경우의수
  (포함하지 않는 경우는 이미 이전 윈도우들에서 계산함)
*/
// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...sequence] = require('fs').readFileSync(inputFile).toString().trim()
  .split(/\s/)
  .map(Number);

// process
let sol = 1;

let left = 0;
const window = new Set();
window.add(sequence[0]);

for (let right = 1; right < N; right += 1) {
  while (window.has(sequence[right])) {
    window.delete(sequence[left]);
    left += 1;
  }
  window.add(sequence[right]);
  sol += window.size;
}

// output
console.log(sol);
