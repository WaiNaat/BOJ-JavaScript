/*
가장 가까운 심판의 거리 << 이분탐색으로 찾음
    거리를 늘리는 경우: 현재 거리에서 배치가 가능할 경우
    거리를 줄이는 경우: 현재 거리에서 배치가 불가능할 경우
사전순으로 가장 늦는거 << 거리가 허락하는 한 최대한 앞쪽으로 몰아서 배치하면 됨
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, M, K, ...pos] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let left = 0;
let right = pos[K - 1] - pos[0] + 1;
let sol;

while (left < right)
{
    let mid = parseInt((left + right) / 2);

    let result = arrange(mid);
    
    if (result === false)
        right = mid;
    else
    {
        left = mid + 1;
        sol = result;
    }
}

// output
console.log(sol);

// function
function arrange(distance)
{
    let last_pos = pos[0];
    let cnt = 1;
    let ret = new Array(K).fill(0);
    ret[0] = 1;

    for (let i=1; i<K; i++)
    {
        if (cnt == M) break;
        
        if (pos[i] - last_pos >= distance)
        {
            last_pos = pos[i];
            cnt++;
            ret[i] = 1;
        }
    }

    return cnt == M? ret.join('') : false;
}