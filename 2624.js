/*
opt(i, j) := i가지 동전으로 j원을 만드는 경우의 수
opt(i, j) = sum( opt(i-1, j-a*p(i)) )
    a는 0 이상 n(i) 이하의 자연수.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);
const k = Number(input[1]);
const p = [undefined];
const n = [undefined];

for (let i=2; i<k+2; i++)
{
    const [pi, ni] = input[i].split(' ').map(Number);
    p.push(pi);
    n.push(ni);
}

// process
let prev = new Array(T + 1).fill(0);
prev[0] = 1;
for (let i=1; i<=k; i++)
{
    const cur = Array.from(prev);

    for (let j=1; j<=T; j++)
    {
        for (let a=1; a<=n[i]; a++)
        {
            if (j - a * p[i] < 0) break;
            cur[j] += prev[j - a * p[i]];
        }
    }

    prev = cur;
}

// output
console.log(prev[T]);