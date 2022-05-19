/*
3*2 크기의 벽을 딱 맞게 채우는 방법 3가지

U자 컵(또는 n자 지붕) 모양 안쪽을 가로로 채우는 방식으로
3*k (k는 4이상 짝수)를 채우는 방법 k마다 2가지씩

즉 얘네들을 조립해서 3*N 크기의 벽을 만듦.

이러면 일단 N이 홀수면 불가능.
짝수인 i에 대해
opt(i) = 
    opt(i-2) * 3
    + sum(opt(i-k) * 2)
        k는 4이상 짝수, k<=i
*/

// input
const inputFile = process.platform == 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = new Array(N + 1).fill(0);
opt[0] = 1;

for (let i=2; i<=N; i+=2)
{
    let sum = opt[i - 2] * 3;
    for (let k=4; k<=i; k+=2)
        sum += opt[i - k] * 2;
    opt[i] = sum;
}

// output
console.log(opt[N]);