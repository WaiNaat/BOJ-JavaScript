/*
백트래킹으로 팀원 선정해서 계산하면 끝
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const S = [];
for (let i=1; i<=N; i++)
    S.push(input[i].trim().split(' ').map(Number));

// process
const team_start = [];
let sol = Infinity;
divide_team(0, 0);

// output
console.log(sol);

// functions
function divide_team(depth, idx)
{
    // base case
    if (depth === Math.floor(N / 2))
    {
        // 링크 팀 만들기
        const team_link = [];
        const team_start_set = new Set(team_start);
        for (let i=0; i<N; i++)
        {
            if (!team_start_set.has(i))
                team_link.push(i);
        }

        // 계산
        sol = Math.min(Math.abs(calc_status(team_start) - calc_status(team_link)), sol);
    }

    // recursive step
    for (let i=idx; i<N; i++)
    {
        team_start.push(i);
        divide_team(depth + 1, i + 1);
        team_start.pop();
    }
}

function calc_status(team)
{
    let status = 0;
    for (let i of team)
    {
        for (let j of team)
            status += S[i][j];
    }
    return status;
}