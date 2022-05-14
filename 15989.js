/*
opt(i, k) := i를 만드는데 마지막에 더한 수가 k인 경우의 수
opt(i, 1) = opt(i-1, {1,2,3})
opt(i, 2) = opt(i-2, {2,3})
opt(i, 3) = opt(i-3, {3}) 

1
11 2
111 21 3
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [T, ... N] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => parseInt(x));

// process
let opt_1 = [0, 1, 1, 2];
let opt_2 = [0, 0, 1, 0];
let opt_3 = [0, 0, 0, 1];
let i = 4;
let sol = [];

for (let n of N)
{
    while (i <= n)
    {
        opt_1.push(opt_1[i - 1] + opt_2[i - 1] + opt_3[i - 1]);
        opt_2.push(opt_2[i - 2] + opt_3[i - 2]);
        opt_3.push(opt_3[i - 3]);
        i++;
    }

    sol.push(opt_1[n] + opt_2[n] + opt_3[n]);
}

// output
console.log(sol.join('\n'));