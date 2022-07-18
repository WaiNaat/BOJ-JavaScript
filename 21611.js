// 틀렸습니다
// 폭발에 문제가 있을 가능성 99%

/*
핵심은 두 가지
1. 주어진 격자를 풀어서 한 줄짜리 배열로 만들기.
    이동전환
    이동이동전환 이동이동전환
    이동이동이동전환 이동이동이동전환
    ...
    이런식으로 탐색 가능
2. 한 줄짜리 배열에서 얼음 파편이 떨어지는 위치 알아내기

폭발에는 스택 사용
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const grid = Array.from(input.slice(1, 1 + N), x => x.trim().split(' ').map(Number));
const blizzard = Array.from(input.slice(1 + N), x => x.trim().split(' ').map(Number));

// process
// 얼음 파편이 떨어지는 위치 표시
let directions = [undefined, [-1, 0], [1, 0], [0, -1], [0, 1]];
const grid_ice = Array.from(new Array(N), () => new Array(N));

for (let i=1; i<=4; i++)
{
    let [dr, dc] = directions[i];
    let r = Math.floor(N / 2);
    let c = r;
    let r2 = r + dr;
    let c2 = c + dc;

    while (!out_of_bound(r2, c2))
    {
        grid_ice[r2][c2] = i;
        r2 += dr;
        c2 += dc;
    }
}

// 격자를 배열로 변환
let marble = [];
const blizzard_idx = [undefined, [], [], [], []];
directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
let r = Math.floor(N / 2);
let c = r;
let d = 0;

for (let i=1; i<=N-1; i++)
{
    for (let j=0; j<2; j++)
    {
        let [dr, dc] = directions[d];

        // 이동
        for (let k=0; k<i; k++)
        {
            r += dr;
            c += dc;

            marble.push(grid[r][c]);
            if (grid_ice[r][c] != undefined)
                blizzard_idx[grid_ice[r][c]].push(marble.length - 1);
        }

        // 방향 전환
        d = (d + 1) % 4;
    }
}

// 맨 마지막은 이동-전환 사이클이 3번임
let [dr, dc] = directions[d];
for (let k=0; k<N-1; k++)
{
    r += dr;
    c += dc;

    marble.push(grid[r][c]);
    if (grid_ice[r][c] != undefined)
        blizzard_idx[grid_ice[r][c]].push(marble.length - 1);
}

// 눈보라 마법 사용
let sol = 0;

for (let [d, s] of blizzard)
{
    // 눈보라 마법 적용
    for (let i=0; i<s; i++)
    {
        if (blizzard_idx[d][i] < marble.length)
            marble[blizzard_idx[d][i]] = 0;
    }
    
    // 구슬 폭발
    let idx = 0;
    let stack = [];

    while (idx < marble.length)
    {
        if (marble[idx] == 0)
        {
            idx++;
            continue;
        }
              
        stack.push(marble[idx]);

        if (idx + 1 < marble.length &&
            stack.length >= 4 && 
            stack[stack.length - 1] == stack[stack.length - 2] &&
            stack[stack.length - 1] == stack[stack.length - 3] &&
            stack[stack.length - 1] == stack[stack.length - 4]
        )
        {
            let marble_no = stack[stack.length - 1];
            
            idx++;
            while (idx < marble.length && (marble_no == marble[idx] || marble[idx] == 0))
            {
                if (marble_no == marble[idx])
                    stack.push(marble[idx]);
                idx++;
            }

            while (stack[stack.length - 1] == marble_no)
            {
                sol += stack.pop();
            }
        }
        else
            idx++;
    }
    
    // 구슬 변화
    let group_name = stack.length > 0? stack[0] : 0;
    let group_cnt = 1;
    let next_marble = [];

    for (let i=1; i<=stack.length; i++)
    {
        if (i < stack.length && stack[i] == group_name)
            group_cnt++;
        else
        {
            next_marble.push(group_cnt, group_name);
            group_cnt = 1;
            group_name = stack[i];
        }
    }

    while (next_marble.length >= N ** 2)
        next_marble.pop();
    
    marble = next_marble;
}

// output
console.log(sol);

// functions
function out_of_bound(r, c)
{
    if (0 > r || r >= N || 0 > c || c >= N) return true;
    else return false;
}