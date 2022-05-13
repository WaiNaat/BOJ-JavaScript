/*
4로 끝나는 i자리 수의 개수 = 
    0으로 끝나는 i-1자리 수의 개수
    + 1로 끝나는 i-1자리 수의 개수
    + 2로 끝나는 i-1자리 수의 개수
    + 3으로 끝나는 i-1자리 수의 개수
    + 4로 끝나는 i-1자리 수의 개수
이런 식으로 i자리 수마다 x로 끝나는 수의 개수 계산 가능.

opt(i) := i자리 줄어들이 않는 수의 개수
prev := opt(opt.length - 1)에서 x로 끝나는 수가 몇 개인지 기록하는 배열.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [T, ... N] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => parseInt(x));

// process
let opt = [0, 10];
let prev = new Array(10).fill(1);
let sol = [];

for (let n of N)
{
    while (opt.length - 1 < n)
    {
        let cur = new Array(10).fill(0);
        let val = 0;
        let sum = 0;

        for (let i=0; i<10; i++)
        {
            val += prev[i];
            cur[i] = val;
            sum += val;
        }
        
        opt.push(sum);
        prev = cur;
    }

    sol.push(opt[n]);
}

// output
console.log(sol.join('\n'));