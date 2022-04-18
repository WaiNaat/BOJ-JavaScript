/*
입력값 한번 훑으면서 K국가를 찾는다.
찾았으면 다시 훑으면서 K보다 더 잘한 나라를 센다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(toInt);

// process
let N = input[0];
const K = input[1];

let K_gold = 0;
let K_silver = 0;
let K_bronze = 0;

// K국가 찾기
let idx = 2;
let found = false;
while (!found)
{
    if (input[idx] === K)
    {
        found = true;
        K_gold = input[++idx];
        K_silver = input[++idx];
        K_bronze = input[++idx];
    }
    idx += 4;
}

// 등수 계산
let sol = 1;
idx = 2;

while (N > 0)
{
    if (input[idx + 1] > K_gold)
        sol++;
    else if (input[idx + 1] == K_gold && input[idx + 2] > K_silver)
        sol++;
    else if (input[idx + 1] == K_gold && input[idx + 2] == K_silver && input[idx + 3] > K_bronze)
        sol++;
    
    N--;
    idx += 4;
}

// output
console.log(sol);

// function
function toInt(value, index, array)
{
    return parseInt(value);
}