/*
가장 긴 증가하는 부분 수열 문제.
opt(i)를 제시한 카드들 중 앞에서 i개 중 가장~수열의 길이라 하면
opt(i) = 
    max(opt(j)) + 1
    이때 j는 j<i이고 card(j)<card(i)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(x => parseInt(x));
const [N, ... card] = input;

// process
let sol = 1;
let opt = [1];

for(let i=1; i<N; i++)
{
    let val = 0;

    for(let j=0; j<i; j++)
    {
        if(card[j] < card[i] && val < opt[j])
            val = opt[j];
    }

    opt.push(val + 1);
    if (sol < val + 1) sol = val + 1;
}

// output
console.log(sol);