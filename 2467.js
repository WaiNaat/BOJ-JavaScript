/*
1. 산성/알칼리성 분리
2. 산성 용액에서 하나 고르고 이분탐색으로 알칼리성 용액에서 절댓값 비슷한애 찾음
3. 산성에서만 2개 / 알칼리에서만 2개 고르는 경우도 생각
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ...alkali] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
// 산성 용액 분리
const acid = [];
while (alkali[alkali.length - 1] > 0)
    acid.push(alkali.pop());
acid.reverse();


// 정답 찾기
let sol1, sol2;
let min = Infinity;

if (acid.length > 0 && alkali.length > 0)
{
    for (let alkali_val of alkali)
    {
        let idx = search(-alkali_val, acid);
        
        for (let i=-1; i<2; i++)
        {
            let result = Math.abs(alkali_val + acid[idx + i]);
            if (result < min)
            {
                min = result;
                sol1 = alkali_val;
                sol2 = acid[idx + i];
            }
        }
    }
}

// 한쪽 용액에서만 고를 경우
if (acid.length > 1)
{
    let result = Math.abs(acid[0] + acid[1]);
    if (result < min)
    {
        min = result;
        sol1 = acid[0];
        sol2 = acid[1];
    }
}

if (alkali.length > 1)
{
    let result = Math.abs(alkali[alkali.length - 1] + alkali[alkali.length - 2]);
    if (result < min)
    {
        min = result;
        sol1 = alkali[alkali.length - 2];
        sol2 = alkali[alkali.length - 1];
    }
}

// output
console.log(sol1, sol2);

// function
function search(val, list)
{
    let left = 0;
    let right = list.length;

    while (left < right)
    {
        let mid = parseInt((left + right) / 2);

        if (list[mid] == val)
            return mid;
        else if (list[mid] < val)
            left = mid + 1;
        else
            right = mid;
    }

    return left;
}