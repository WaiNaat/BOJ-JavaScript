/*
opt(i) := 카드 i개를 갖기 위해 내야 하는 최소 금액
opt(i) = 
    opt(i-1) + P(1)
    opt(i-2) + P(2)
    opt(i-3) + P(3)
    ...
    opt(i-N) + P(N)
    이 중 최솟값.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ... P] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(x => parseInt(x));

// process
let opt = [0];

for (let i=1; i<=N; i++)
{
    let val = Infinity;

    for (let k=1; k<=i; k++)
    {
        if (val > opt[i - k] + P[k - 1])
            val = opt[i - k] + P[k - 1];
    }

    opt.push(val);
}

// output
console.log(opt[N]);