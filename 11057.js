/*
일의 자리 수가 4면 그 뒤에 4, 5, 6, 7, 8, 9를 붙여서 길이 늘릴 수 있음.

opt(i, j) := 길이가 i인 오르막 수 중 일의 자리가 j인 수의 개수

opt(i, j) = 
    sum( opt(i-1, k) )
    k는 k <= j 인 자연수들
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = [[], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

for(let i=2; i<=N; i++)
{
    let cur = [0];
    for(let j=1; j<=9; j++)
    {
        let val = 0;
        for(let k=1; k<=j; k++)
            val += opt[i - 1][k];
        cur.push(val % 10007);
    }
    opt.push(cur);
}

// output
let sol = 0;
for (line of opt)
    sol += line.reduce((prev, cur) => (prev + cur) % 10007, 0);
    sol %= 10007;
console.log(sol);