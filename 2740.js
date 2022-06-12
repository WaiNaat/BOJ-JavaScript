/*
그냥 곱하면 된다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const A = [];
for (let i=1; i<=N; i++)
    A.push(input[i].split(' ').map(Number));
const [_, K] = input[N + 1].split(' ').map(Number);
const B = [];
for (let i=N+2; i<N+2+M; i++)
    B.push(input[i].split(' ').map(Number));

// process
const result = Array.from(Array(N), () => new Array(K).fill(0));
for (let i=0; i<N; i++)
{
    for (let j=0; j<K; j++)
    {
        for (let k=0; k<M; k++)
        {
            result[i][j] += A[i][k] * B[k][j];
        }
    }
}

// output
const sol = [];
for (let row of result)
    sol.push(row.join(' '));
console.log(sol.join('\n'));