/*
누굴 옮겨야 하는가?
    오름차순을 지키지 않은 애들

옮기는 수가 적으려면 어떻게?
    오름차순을 지키는 애들 최대

>> 가장 긴 증가하는 부분 수열 문제

seq(i) := i번째 수열의 숫자
opt(i) := 앞에서부터 i개 중 가장~수열의 길이
opt(i) = max(opt(k) + 1)
    k<i이고 seq(k)<seq(i)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ... seq] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(Number);

// process
let opt = new Array(N).fill(1);

for (let i=1; i<N; i++)
{
    for (let k=0; k<i; k++)
    {
        if (seq[k] < seq[i])
            opt[i] = Math.max(opt[i], opt[k] + 1);
    }
}

// output
console.log(N - Math.max(...opt));