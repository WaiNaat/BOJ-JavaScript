/*
부분합 문제.
처음~X 까지의 합을 구하는 함수를 만들면 끝.
*/

// input
const inputFile = process.platform ==='linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split(' ');
const A = parseInt(input[0]);
const B = parseInt(input[1]);

// process & output
console.log(sum(B) - sum(A - 1));

// function
function sum(x)
{
    if (x === 0) return 0;

    let ret = 0;
    let sumFrom1toN = n => n * (n + 1) / 2;
    let squaredSumFrom1toN = n => n * (n + 1) * (2 * n + 1) / 6;

    // x번째 숫자가 몇인지 구함.
    let val = 1;
    while (sumFrom1toN(val + 1) <= x)
        val++;
    
    // 합을 구함.
    ret = squaredSumFrom1toN(val);
    ret += (x - sumFrom1toN(val)) * (++val);    

    return ret;
}