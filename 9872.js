/*
'그룹'별로 숫자를 세야 함.
하지만 그룹 내에서 이름 순서가 바뀔 수 있음
  >> 사전순으로 정렬
정렬된 세 소의 이름을 그룹명 key로 사용
*/
// input
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ...groups] = require('fs').readFileSync(INPUT_FILE).toString().trim()
  .split('\n')
  .map((line) => line.split(' ').sort().join(' '));

// process
const count = {};
groups.forEach((group) => {
  if (!count[group]) count[group] = 1;
  else count[group] += 1;
});

const sol = Object.values(count).reduce(
  (prev, value) => Math.max(prev, value),
  0,
);

// output
console.log(sol);
