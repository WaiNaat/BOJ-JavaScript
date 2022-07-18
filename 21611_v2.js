/*
1. 주어진 격자를 풀어서 한 줄짜리 배열로 만들기.
    이동전환
    이동이동전환 이동이동전환
    이동이동이동전환 이동이동이동전환
    ...
    이런식으로 탐색 가능

2. 한 줄짜리 배열에서 얼음 파편이 떨어지는 위치 알아내기

3. 폭발:
    모든 폭발이 동시에 일어남 -> 모든 폭탄이 앞으로 당겨짐 이거 반복
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
    let exploded = true;

    while (exploded)
    {
        exploded = false;
        let tmp = [];
        let group_name = marble.length > 0? marble[0] : 0;
        let group_cnt = 1;

        // 그룹 찾아서 폭발하지 않을 경우 tmp에 옮겨줌
        for (let i=1; i<=marble.length; i++)
        {
            if (i < marble.length && marble[i] == 0) continue;

            // 직전 숫자와 같은 그룹
            if (i < marble.length && marble[i] == group_name)
                group_cnt++;
            // 직전 숫자와 다른 그룹일 경우 직전 숫자가 속한 그룹 확인
            else
            {
                if (group_name > 0 && group_cnt < 4)
                    tmp.push(... new Array(group_cnt).fill(group_name));
                else if (group_name > 0 && group_cnt >= 4)
                {
                    sol += group_name * group_cnt;
                    exploded = true;
                }
                
                group_cnt = 1;
                group_name = i < marble.length? marble[i] : 0;
            }
        }

        marble = tmp;
    }
    
    
    // 구슬 변화
    let group_name = marble.length > 0? marble[0] : 0;
    let group_cnt = 1;
    let next_marble = [];

    for (let i=1; i<=marble.length; i++)
    {
        if (i < marble.length && marble[i] == group_name)
            group_cnt++;
        else
        {
            next_marble.push(group_cnt, group_name);
            group_cnt = 1;
            group_name = marble[i];
        }
    }

    // 격자 크기에 맞춤
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