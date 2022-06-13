/*

|F(n+1)|       |1  1|^n  |F(1)=1|
|      |   =   |    |    |      |
| F(n) |       |1  0|    |F(0)=0|

*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let n = BigInt(require('fs').readFileSync(inputFile).toString().trim());

// process & output
console.log(pow(n)[1][0].toString());

// functions
function pow(n)
{
    if (n == 1n)
    {
        return [[1n, 1n], [1n, 0n]];
    }
    else if (n % 2n == 0n)
    {
        const half = n / 2n;
        const half_pow = pow(half);
        return mult(half_pow, half_pow);
    }
    else
    {
        const half = (n - 1n) / 2n;
        const half_pow = pow(half);
        return mult(mult(half_pow, half_pow), [[1n, 1n], [1n, 0n]]);
    }
}

function mult(A, B)
{
    const ret = [[0n, 0n], [0n, 0n]];
    for (let i=0; i<2; i++)
    {
        for (let j=0; j<2; j++)
        {
            for (let k=0; k<2; k++)
                ret[i][j] = (ret[i][j] + A[i][k] * B[k][j]) % 1000000007n;
        }
    }
    return ret;
}