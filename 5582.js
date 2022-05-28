/*
두 문자열 A, B
opt(i, j) := A[i], B[j]를 포함한 최장 공통부분문자열 길이
opt(i, j) = 
    opt(i-1, j-1) + 1     (A[i-1]=B[i-1]이고 A[i]=B[i])
    1                     (A[i-1]!=B[i-1]이고 A[i]=B[i])
    0                     (나머지)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [A, B] = require('fs').readFileSync(inputFile).toString().trim().split('\n');

// process
let opt = Array.from(new Array(A.length), () => new Array(B.length));
let sol = 0;

for (let i=0; i<A.length; i++)
{
    for (let j=0; j<B.length; j++)
    {
        let val = 0;
        if (A[i] == B[j])
        {
            if (i > 0 && j > 0 && A[i - 1] == B[j - 1])
                val = opt[i - 1][j - 1] + 1;
            else
                val = 1;
        }

        opt[i][j] = val;
        sol = Math.max(sol, val);
    }
}

// output
console.log(sol);