/*
방향별로 어디가 몇퍼인지 구할수있도록 식 직접 작성

방향전환의 규칙성
    이동 전환 이동 전환
    이동 이동 전환 이동 이동 전환
    이동 이동 이동 전환 이동 이동 이동 전환
    ...
    맨 마지막에는 이동-전환 3회임
*/

// constant
const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const ALPHA = -1;
const spared_infos = Array.from([0,1,2,3], x => get_spread_info(x));

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const grid = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
let r = Math.floor(N / 2);
let c = r;
let d = 0;
let sol = 0;

// 이동 횟수
for (let move=1; move<N; move++)
{
    // 이동-전환 사이클 2회
    for (let i=0; i<2; i++)
    {
        // 이동
        for (let j=0; j<move; j++)
        {
            [r, c, s] = move_tornado(r, c, d);
            sol += s;
        }
        // 전환
        d = (d + 1) % 4;
    }
}

// 맨 마지막에는 이동 한 번 더 함
for (let j=0; j<N-1; j++)
{
    [r, c, s] = move_tornado(r, c, d);
    sol += s;
}

// output
console.log(sol);

// functions
function move_tornado(r, c, d)
{
    let spread_info = spared_infos[d];
    let [dr, dc] = directions[d];
    r += dr;
    c += dc;
    let y_sand = grid[r][c];
    grid[r][c] = 0;
    let alpha_sand = y_sand;
    let out_sand = 0;

    for (let [dr, dc, ratio] of spread_info)
    {
        let r2 = r + dr;
        let c2 = c + dc;
        let move_sand = ratio != ALPHA? Math.floor(y_sand * ratio) : alpha_sand;

        if (out_of_bound(r2, c2))
        {
            out_sand += move_sand;
            alpha_sand -= move_sand;
            continue;
        }

        grid[r2][c2] += move_sand;
        alpha_sand -= move_sand;
    }

    return [r, c, out_sand];
}

function out_of_bound(r, c)
{
    if (0 > r || r >= N || 0 > c || c >= N) return true;
    else return false;
}

function get_spread_info(d)
{
    const spread_left = [
        [-2, 0, 0.02],
        [-1, -1, 0.1], [-1, 0, 0.07], [-1, 1, 0.01],
        [0, -2, 0.05],
        [1, -1, 0.1], [1, 0, 0.07], [1, 1, 0.01],
        [2, 0, 0.02],
        [0, -1, ALPHA]
    ];
    
    if (d === 0)
        return spread_left;
    else if (d === 1)
        return spread_left.map(x => [-x[1], x[0], x[2]]);
    else if (d === 2)
        return spread_left.map(x => [x[0], -x[1], x[2]]);
    else
        return spread_left.map(x => [x[1], x[0], x[2]]);
}