/*
사전순으로 가장 나중인 부분수열? 헉!
다행인점: 길이가 100임

길이에 상관없이 선두 숫자가 크면 무조건 나중
  -> 일단 양쪽 공통된것들중에 제일 늦는거중에 제일 빠른거 찾음
  -> 그 지점들부터 재귀 ㄱ

근데 그걸 어떻게찾지?
  숫자가 1~100이니까 시원하게 100부터 세죠?
*/
const INPUT_FILE = process.platform === 'linux' ? '/dev/stdin' : './input';
const [, A, , B] = require('fs')
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const sol = [];
const findCommon = (aStart, bStart) => {
  const aAppears = new Array(101);
  const bAppears = new Array(101);

  if (aStart >= A.length || bStart >= B.length) return;

  for (let i = aStart; i < A.length; i += 1) {
    aAppears[A[i]] ??= i;
  }

  for (let i = bStart; i < B.length; i += 1) {
    bAppears[B[i]] ??= i;
  }

  for (let i = 100; i > 0; i -= 1) {
    if (Number.isNaN(Number(aAppears[i])) || Number.isNaN(Number(bAppears[i]))) continue;
    sol.push(i);
    findCommon(aAppears[i] + 1, bAppears[i] + 1);
    break;
  }
};

findCommon(0, 0);

console.log(sol.length);
if (sol.length) console.log(sol.join(' '));
