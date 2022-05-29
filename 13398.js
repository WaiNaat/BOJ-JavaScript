/*
opt(i) := 제거 안하고 앞에서 i개, i번째를 포함한 최대 연속합
opt(i) = 
    seq(i)
    opt(i-1) + seq(i)
    둘 중 큰 값.

opt_remove(i) := 앞에서 i개, i번째를 포함한 최대 연속합인데 하나 지움
opt_remove(i) = 
    opt_remove(i-1) + seq(i)   (~i-2번째 중에 무언가 하나 지워짐)
    opt(i-2) + seq(i)          (i-1번째 지움)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [n, ... seq] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let opt, opt_remove, sol;

if (n > 1)
{
    opt = [seq[0], seq[0] + seq[1] > seq[1]? seq[0] + seq[1] : seq[1]];
    opt_remove = [seq[0], seq[1]];
    sol = Math.max(opt[0], opt[1], opt_remove[0], opt_remove[1]);
}
else
    sol = seq[0];

for (let i=2; i<n; i++)
{
    if (opt[i - 1] > 0)
        opt.push(opt[i - 1] + seq[i]);
    else
        opt.push(seq[i]);
    
    let val1 = opt_remove[i - 1] + seq[i];
    let val2 = opt[i - 2] + seq[i];
    opt_remove.push(val1 > val2? val1 : val2);

    sol = Math.max(sol, opt[i], opt_remove[i]);
}

// output
console.log(sol);
