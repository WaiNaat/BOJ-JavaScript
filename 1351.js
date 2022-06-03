// 메모리 초과

/*
문제에서 준 점화식 그대로 구현
>> 메모리 초과 나옴

N, P, Q에 따라 A배열을 몇까지만 구하면 되는지 파악 가능
>> 이걸로 메모리 절약?

js array 최대크기 42억
>> 10억개 단위로 짤라야할듯?

parseInt(0.00000001) = 1
    >>> parseInt() 이놈은 10^-6 까지밖에 못 구한다

이래도 메모리초과
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, P, Q] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(Number);

// process
let maxALength = Math.floor(Math.max(Math.floor(N / P), Math.floor(N / Q)) / 1000000000) + 1;
let A = Array.from(new Array(maxALength), () => []);
let findIndex = val => [Math.floor(val / 1000000000), val % 1000000000];

A[0][0] = 1;

for (let i=1; i<=Math.max(Math.floor(N / P), Math.floor(N / Q)); i++)
{
    let val1, val2, a, b;

    [a, b] = findIndex(Math.floor(i / P));
    val1 = A[a][b];

    [a, b] = findIndex(Math.floor(i / Q));
    val2 = A[a][b];

    [a, b] = findIndex(i);
    A[a].push(val1 + val2);
}

// output
let sol = 1;
if (N > 0)
{
    let val1, val2, a, b;

    [a, b] = findIndex(Math.floor(N / P));
    val1 = A[a][b];

    [a, b] = findIndex(Math.floor(N / Q));
    val2 = A[a][b];
    
    sol = val1 + val2;
}
console.log(sol);