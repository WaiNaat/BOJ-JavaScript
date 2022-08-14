/*
벌통은 왼쪽 끝 또는 오른쪽 끝에 두고 반대쪽 끝에 벌 하나를 두는 경우
벌을 양끝에 두고 중앙 어딘가에 벌통을 두는 경우

누적합 배열 두 개 만들기
위의 세 가지 경우중 최적해 찾기
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ...flowers] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
// 누적합 배열 만들기
let prefix_sum = new Array(N);

prefix_sum[0] = flowers[0];
for (let i=1; i<N; i++)
    prefix_sum[i] = prefix_sum[i - 1] + flowers[i];

let prefix_sum_reverse = new Array(N);

prefix_sum_reverse[N - 1] = flowers[N - 1];
for (let i=N-2; i>=0; i--)
    prefix_sum_reverse[i] = prefix_sum_reverse[i + 1] + flowers[i];

// 정답 계산
// 왼쪽 끝 벌, 오른쪽 끝 벌통
let max = 0;

for (let i=1; i<N; i++)
    max = Math.max(prefix_sum[N - 1] - prefix_sum[i] - flowers[i], max);

let sol = max + prefix_sum[N - 1] - flowers[0];

// 오른쪽 끝 벌, 왼쪽 끝 벌통
max = 0;

for (let i=N-2; i>=0; i--)
    max = Math.max(prefix_sum_reverse[0] - prefix_sum_reverse[i] - flowers[i], max);

sol = Math.max(max + prefix_sum_reverse[0] - flowers[N - 1], sol);

// 양끝 벌
max = 0;

for (let i=1; i<N-1; i++)
    max = Math.max(prefix_sum[i] - flowers[0] + prefix_sum_reverse[i] - flowers[N - 1], max);

sol = Math.max(sol, max);

// output
console.log(sol);