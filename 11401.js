/*
1,000,000,007 <<<<<<<<< 이게 소수라는걸 내가 어케아냐고
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, K] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(BigInt);
const p = 1000000007n;

// process
const x = factorial(N);
const y = pow(factorial(K), p - 2n);
const z = pow(factorial(N - K), p - 2n);
const sol = (x * ((y * z) % p)) % p;

// output
console.log(sol.toString());

// functions
function factorial(val)
{
    let ret = 1n;
    for (let i=1n; i<=val; i++)
        ret = (ret * i) % p;
    return ret;
}

function pow(val, exponent)
{
    if (exponent === 1n)
        return val;
    else if (exponent % 2n === 1n)
    {
        let half = pow(val, (exponent - 1n) / 2n);
        return (((half * half) % p) * val) % p;
    }
    else
    {
        let half = pow(val, exponent / 2n);
        return (half * half) % p;
    }
}