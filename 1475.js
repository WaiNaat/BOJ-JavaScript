/*
6과 9를 한 세트로 취급: 9를 6으로 바꿈.
즉 한 세트당 0,1,2,3,4,5,7,8은 1개, 6은 2개 주어지는 셈.
*/

// input
const inputFile = __dirname + '/input'; // '/dev/stdin';
const input = require('fs').readFileSync(inputFile).toString().trim().split('');

// process
let digit = new Array(9);
digit.fill(0);

// 방번호의 각 자릿수를 확인, 몇 개 필요한지 계산
for (let val of input)
{
    val = parseInt(val);

    if (val == 9)
        val = 6;
    
    digit[val]++;
}

// 각 숫자별로 몇 세트씩 필요한지 계산
let sol = 0;

for (let i in digit)
{
    let need;
    
    if (i != 6)
        need = digit[i];
    
    else
        need = Math.ceil(digit[i] / 2);
    
    sol = Math.max(sol, need);
}

// output
console.log(sol);