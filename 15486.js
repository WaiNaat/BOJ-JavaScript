/*
opt(i) := i일에 퇴사할 때 최대 금액
i일에 만약 일을 한다면 돈은 i + T(i)일에 받음.
즉 T, P배열을 앞에서부터 살펴보면서
opt(i + T(i)) = Max(
    opt(i) + P(i),      i일에 받은 상담 실시
    opt(i+T(i))         기존 계산대로 하는게 이득
)
로 채우면 됨.
그리고 i일에 받은 상담을 안 할 수도 있으므로
opt(i) = Max(opt(i), opt(i-1))로 처리해줌.
*/

// input
const inputFile = process.platform == 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(x => parseInt(x));
const N = input[0];
let T = [0];
let P = [0];

for (let i=1; i<input.length; i+=2)
{
    T.push(input[i]);
    P.push(input[i + 1]);
}

// process
let opt = new Array(N + 2).fill(0);

for (let i=1; i<=N + 1; i++)
{
    opt[i] = Math.max(opt[i - 1], opt[i]);

    if (i + T[i] <= N + 1)
    {
        opt[i + T[i]] = Math.max(
            opt[i] + P[i], 
            opt[i + T[i]]
        );
    }
}

// output
console.log(opt[N + 1]);