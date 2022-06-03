/*
문제에서 준 점화식 그대로 구현
>> 메모리 초과 나옴

A의 값들 중 정말 A(N) 계산에 필요한 것들만 계산하되
메모이제이션 기법도 써야 함
    >> 재귀 + Map
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, P, Q] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(Number);

// process & output
const A = new Map();
A.set(0, 1);
console.log(findValue(N));

// functions
function findValue(val)
{
    if (A.has(val))
        return A.get(val);
    
    A.set(val, findValue(Math.floor(val / P)) + findValue(Math.floor(val / Q)));
    return A.get(val);
}