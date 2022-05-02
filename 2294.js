/*
a, b, c 세 종류의 동전으로 i원을 만드는 방법:
    i-a원에서 a를 더한다.
    i-b원에서 b를 더한다.
    i-c원에서 c를 더한다.

opt(i) := N종류의 동전을 최소한으로 써서 i원을 만드는 경우
opt(i) = 
    min(opt(i - x)) + 1
    x는 각 동전의 가치
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [n, k, ... coin] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/);

// process
opt = new Array(k + 1);
opt[0] = 0;

for(let i=1; i<=k; i++)
{
    let val = Infinity;
    for(let c of coin)
    {
        if(i < c || opt[i - c] == -1)
            continue;
        
        val = Math.min(val, opt[i - c]);
    }
    opt[i] = val != Infinity? val + 1 : -1;
}

// output
console.log(opt[k]);