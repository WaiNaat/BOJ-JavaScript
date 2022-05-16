// 틀렸습니다

/*
opt(i) = i를 2의 멱수의 합으로 나타내는 경우의 수

i가 2^k꼴이 아닐 경우 i를 이진법으로 나타낸다.
i=7=1+2+4면 opt(i) = opt(1) * opt(2) * opt(4)

i가 2^k꼴이면
opt(i) = opt(i-1) + 1    (i-1에 1을 더하거나 2^k 하나 쓰면 됨)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// function
function decompose(val)
{
    // val을 이진수로 나타낸 후 각 자릿수를 구한다.
    val = val.toString(2);
    let ret = [];
    let powerOf2 = 1;
    for (let i=val.length-1; i>=0; i--)
    {
        if (val[i] == '1')
            ret.push(powerOf2);
        powerOf2 *= 2;
    }
    return ret;
}

// process
let opt = [0, 1];
let nextPowerOf2 = 2;
for (let i=2; i<=N; i++)
{
    if (i == nextPowerOf2)
    {
        opt.push((opt[i - 1] + 1) % 1000000000);
        nextPowerOf2 *= 2;
    }

    else
    {
        let values = decompose(i);
        let numOfCases = 1;
        for (let val of values)
        {
            numOfCases *= opt[val];
            numOfCases %= 1000000000;
        }
            
        opt.push(numOfCases);
    }
}

// output
console.log(opt[N]);