/*
opt(i, j) := 동전 j종류를 써서 i원을 만드는 경우의 수
opt(i, j) = 
    opt(i-coin(j), j)    (j번째 동전을 사용함)
    + opt(i, j-1)        (j번째 동전을 사용하지 않음)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const T = parseInt(input[0]);

// process
let sol = [];
for (let test=0; test<T; test++)
{
    let N = parseInt(input[3 * test + 1]);
    let coin = input[3 * test + 2].trim().split(' ').map(Number);
    let M = parseInt(input[3 * test + 3]);

    let prev = new Array(M + 1).fill(0);
    for(let i=0; i<=M; i+=coin[0])
        prev[i] = 1;

    for (let j=1; j<N; j++)
    {
        let cur = Array.from(prev);

        for (let i=0; i<=M; i++)
        {
            if (i - coin[j] >= 0)
                cur[i] += cur[i - coin[j]];
        }

        prev = cur;
    }

    sol.push(prev[M]);
}

// output
console.log(sol.join('\n'));