/*
opt(i) := i를 1로 만드는 데 필요한 연산 횟수
opt(i) = 
    opt(i/3) + 1  (i가 3의 배수)
    opt(i/2) + 1  (i가 2의 배수)
    opt(i-1) + 1
    셋 중 제일 작은 값.

next(i) := opt(i)를 만족하기 위해서 i를 next(i)로 변화시켜야 함.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const X = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
// 1로 만들기 위한 최소 횟수 계산
let opt = [0, 0, 1, 1];
let next = [0, 0, 1, 1];

for (let i=4; i<=X; i++)
{
    let val1 = i % 3 == 0? opt[i / 3] + 1 : Infinity;
    let val2 = i % 2 == 0? opt[i / 2] + 1 : Infinity;
    let val3 = opt[i - 1] + 1;
    
    if (val1 <= val2 && val1 <= val3)
    {
        opt.push(val1);
        next.push(i / 3);
    }
    else if (val2 <= val1 && val2 <= val3)
    {
        opt.push(val2);
        next.push(i / 2);
    }
    else
    {
        opt.push(val3);
        next.push(i - 1);
    }
}

// 1로 가는 데 거치는 값들 계산
let nums = [];
let cur = X;

while (cur >= 1)
{
    nums.push(cur);
    cur = next[cur];
}

// output
console.log(opt[X]);
console.log(nums.join(' '));