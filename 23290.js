/*
가능한 방향들 백트래킹으로 미리 사전순으로 구성
나머지는 적힌 대로 구현
*/

// constants
const fish_dir = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
const shark_dir = [[-1, 0], [0, -1], [1, 0], [0, 1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [M, S] = input[0].trim().split(' ').map(Number);

let grid = Array.from(new Array(4), () => Array.from(new Array(4), () => []));
for (let i=1; i<1+M; i++)
{
    let [r, c, d] = input[i].trim().split(' ').map(Number);
    grid[r - 1][c - 1].push(d - 1);
}

let [shark_r, shark_c] = input[1 + M].trim().split(' ').map(Number);
shark_r--;
shark_c--;

// process
// 가능한 경로들의 배열 생성
const route = [];
const tmp_route = [];
make_route();

// 복제마법 연습
const scent = Array.from(new Array(4), () => new Array(4));
let total_fish = M;

for (let s=0; s<S; s++)
{
    // 물고기 복제: newGrid에 물고기, 상어 이동 처리하고 grid로 마지막에 복제 처리
    let copied_fish = total_fish;
    const newGrid = Array.from(new Array(4), () => Array.from(new Array(4), () => []));

    // 물고기 이동
    for (let r=0; r<4; r++)
    {
        for (let c=0; c<4; c++)
        {
            for (let d of grid[r][c])
            {
                let dr, dc, r2, c2, d2, i;

                for (i=0; i<8; i++)
                {
                    d2 = (d - i + 8) % 8;
                    [dr, dc] = fish_dir[d2];

                    r2 = r + dr;
                    c2 = c + dc;

                    if (!out_of_bound(r2, c2) && scent[r2][c2] == undefined && !(r2 == shark_r && c2 == shark_c))
                        break;
                }

                if (i < 8)
                    newGrid[r2][c2].push(d2);
                else
                    newGrid[r][c].push(d);
            }
        }
    }
    
    // 상어 이동 가능 경로마다 제외하는 물고기 수 계산
    const move_result = [];
    for (let r of route)
    {
        let cnt = move_shark(shark_r, shark_c, r, newGrid);
        if (cnt >= 0)
            move_result.push([cnt, r]);
    }

    move_result.sort((a, b) => b[0] - a[0]);

    // 상어 이동
    for (let d of move_result[0][1])
    {
        let [dr, dc] = shark_dir[d];

        shark_r += dr;
        shark_c += dc;

        if (newGrid[shark_r][shark_c].length > 0)
        {
            newGrid[shark_r][shark_c] = [];
            scent[shark_r][shark_c] = s;
        }
    }

    total_fish -= move_result[0][0];

    // 냄새 제거
    for (let r=0; r<4; r++)
    {
        for (let c=0; c<4; c++)
        {
            if (scent[r][c] === s - 2)
                scent[r][c] = undefined;
        }
    }

    // 복제 마법 완료
    total_fish += copied_fish;
    for (let r=0; r<4; r++)
    {
        for (let c=0; c<4; c++)
        {
            if (grid[r][c].length > 0)
                newGrid[r][c].push(... grid[r][c]);
        }
    }
    grid = newGrid;
}

// output
console.log(total_fish);

// functions
function make_route()
{
    // base case
    if (tmp_route.length == 3)
    {
        route.push(Array.from(tmp_route));
        return;
    }

    // recursive step
    for (let i=0; i<4; i++)
    {
        tmp_route.push(i);
        make_route();
        tmp_route.pop();
    }
}

function move_shark(r, c, route, grid)
{
    let cnt = 0;
    let fish = Array.from(grid, row => Array.from(row, x => x.length));

    for (let d of route)
    {
        let [dr, dc] = shark_dir[d];

        r += dr;
        c += dc;

        if (out_of_bound(r, c))
            return -1;

        cnt += fish[r][c];
        fish[r][c] = 0;
    }
    
    return cnt;
}

function out_of_bound(r, c)
{
    if (0 > r || r >= 4 || 0 > c || c >= 4) return true;
    else return false;
}