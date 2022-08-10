/*
A의 누적합 배열을 구한다.
누적합 배열의 두 원소 i와 j에 대해서 i%M = j%M 이면 된다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, M, ... A] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
prefix_sum = new Array(N);
remainder_cnt = new Array(M).fill(0);

prefix_sum[0] = A[0];
remainder_cnt[0]++;
remainder_cnt[prefix_sum[0] % M]++;

for (let i=1; i<N; i++)
{
    prefix_sum[i] = prefix_sum[i - 1] + A[i];
    remainder_cnt[prefix_sum[i] % M]++;
}

let sol = 0;
for (let cnt of remainder_cnt)
    sol += cnt * (cnt - 1) / 2;

// output
console.log(sol);