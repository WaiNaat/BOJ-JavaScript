/*
opt(i) := i일에 퇴사할 때 받는 금액
opt(i) = 
    opt(i-1)
    opt(k) + P(k)
        k는 k<i이고 k+T(k)<=i인 정수
    얘네들 중에 최댓값
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const T = [0];
const P = [0];
for (let i=1; i<=N; i++)
{
    let [t, p] = input[i].trim().split(' ').map(Number);
    T.push(t);
    P.push(p);
}

// process
const opt = [0, 0];

for (let i=2; i<=N+1; i++)
{
    let val = opt[i - 1];
    for (let k=1; k<i; k++)
    {
        if (k + T[k] <= i)
            val = Math.max(opt[k] + P[k], val);
    }
    opt.push(val);
}

// output
console.log(opt[N + 1]);