/*
2*1 크기의 벽을 채우는 방법
    2가지

2*2 크기의 벽을 반드시 1*2 벽을 하나이상 써서 채우는 방법
    3가지

2*k, k는 3 이상인 홀수에 대해
ㅡ-
-ㅡ

ㅡㅡ-
-ㅡㅡ

ㅡㅡㅡ-
-ㅡㅡㅡ
이런식으로 늘리기 가능

2*k, k는 4 이상인 짝수에 대해
ㅡㅡ
-ㅡ-

ㅡㅡㅡ
-ㅡㅡ-

ㅡㅡㅡㅡㅡ
-ㅡㅡㅡㅡ-
이런식으로 늘리기가 가능

opt(i) = 
    opt(i-1) * 2
    opt(i-2) * 3
    opt(i-k) * 2, k>=3인 자연수
    이걸 다 더한 것.

opt(i-k) * 2 이걸 매번 순회하긴 비싸니까
저것들의 합을 따로 저장하는 변수 사용.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(inputFile).toString().trim());
const mod = 1000000007;

// process
const opt = [1, 2, 7];
let sum = 0;

for (let i=3; i<=N; i++)
{
    sum = (sum + opt[i - 3]) % mod;
    opt.push((opt[i - 1] * 2 + opt[i - 2] * 3 + sum * 2) % mod);
}

// output
console.log(opt[N]);