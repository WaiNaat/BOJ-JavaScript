/*
그리디
앞에서 i개까지만 똑같이 맞출 때 횟수가 최소가 되도록

i+1번째 전구를 건드리면 i번째 전구를 똑같이 맞출 수 있음
쭉 진행해서 마지막에서 두 번째 전구를 건드렸을 때 마지막 전구가 올바르게 되어있으면 통과

이 경우 첫 번째 전구를 건드리지 않음
>> 첫 번째 전구를 건드린 경우와 아닌 경우로 나눠서 계산
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const current = Array.from(input[1].trim()).map(Number);
const goal = Array.from(input[2].trim()).map(Number);

// process
let sol = 0;
current.push(-1);

sol = Math.min(bulb(current, goal, true), bulb(current, goal, false));

// output
console.log(sol === Infinity? -1 : sol);

// function
function bulb(current, goal, firstbulb)
{
    let cnt = 0;
    current = Array.from(current);

    if (firstbulb)
    {
        cnt++;
        current[0] = (current[0] + 1) % 2;
        current[1] = (current[1] + 1) % 2;
    }

    for (let i=0; i<N-1; i++)
    {
        if (current[i] != goal[i])
        {
            cnt++;
            current[i] = (current[i] + 1) % 2;
            current[i + 1] = (current[i + 1] + 1) % 2;
            current[i + 2] = (current[i + 2] + 1) % 2;
        }
    }

    if (current[N - 1] != goal[N - 1])
        return Infinity;
    
    return cnt;
}