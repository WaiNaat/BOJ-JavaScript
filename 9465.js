/*
스티커를 떼는 규칙(왼쪽 열부터 뗀다고 했을 때)
    본인이 직전에 뗀거랑 대각선에 위치해있는걸 떼거나
    패스하거나

0열~i열에서 스티커를 떼는데
opt(i, 0행) := i행 0열 스티커는 반드시 뗄 때 점수
opt(i, 1행) := i행 1열 스티커는 반드시 뗄 때 점수.

opt(i, 0행) =
    opt(i-1, 1행)   << 직전에 뗀거랑 대각선
    max(opt(k, l))  << 이전 몇 행을 패스했음
        0<=k<i-1, l=0행or1행
    중 가장 큰 값에 + i열 0행 스티커 점수.

prev_* := opt(i-1, ?행) 값 저장하는 변수.
max := max(opt(k, l)) 값 저장하는 변수.
*/

const { uptime } = require('process');

// input
const inputFile = process.platform ==='linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

let idx = 1;

for(let T=parseInt(input[0]); T>0; T--)
{
    const n = parseInt(input[idx++]);
    const sticker = [
        input[idx++].split(/\s/).map(x => parseInt(x)), 
        input[idx++].split(/\s/).map(x => parseInt(x))
    ];

// process
    let prev_up = sticker[0][0];
    let prev_down = sticker[1][0];
    let max = 0;

    for(let i=1; i<n; i++)
    {
        let cur_up = Math.max(prev_down, max) + sticker[0][i];
        let cur_down = Math.max(prev_up, max) + sticker[1][i];
        
        max = Math.max(prev_up, prev_down, max);
        prev_up = cur_up;
        prev_down = cur_down;
    }

// output
    console.log(Math.max(max, prev_up, prev_down))    
}