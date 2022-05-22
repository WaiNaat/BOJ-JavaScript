/*
opt(i, single) := i자리 암호고 맨 마지막 1글자가 알파벳 하나로 해석됨
opt(i, double) := i자리 암호고 맨 마지막 2글자가 알파벳 하나로 해석됨

opt(i, single) = opt(i-1, double) + opt(i-1, single)
    단, i번째 글자가 0이면 안 됨.

opt(i, double) = opt(i-1, single)
    단, i-1번째 글자가 1이거나
    i-1번째 글자가 2이고 i번째 글자가 0~6

opt(i, ?) 계산에 opt(i-1, ?)만 사용되므로
prev, cur 두 변수만으로 처리 가능.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const code = require('fs').readFileSync(inputFile).toString().trim().split('').map(Number);

// process
let prev_single = code[0] != 0? 1 : 0;
let prev_double = 0;

for (let i=1; i<code.length; i++)
{
    let cur_single = 0;
    let cur_double = 0;
    
    if (code[i] != 0)
        cur_single = prev_single + prev_double;

    if (code[i - 1] == 1)
        cur_double = prev_single;
    else if (code[i - 1] == 2 && code[i] <= 6)
        cur_double = prev_single;
    
    prev_single = cur_single % 1000000;
    prev_double = cur_double % 1000000;
}

// output
console.log((prev_single + prev_double) % 1000000);