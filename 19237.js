/*
순수 구현
상어 이동 및 뿌리기 -> 냄새 턴 감소
*/

// constant
const direction = [undefined, [-1, 0], [1, 0], [0, -1], [0, 1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M, k] = input[0].trim().split(' ').map(Number);

let grid = Array.from(input.slice(1, 1 + N), x => x.trim().split(' ').map(Number));

const shark_direction = [undefined]
shark_direction.push(... input[1 + N].split(' ').map(Number));

const shark_priority = [undefined];
for (let i=N+2; i<input.length; i+=4)
{
    let priority = [undefined];
    for (let j=0; j<4; j++)
        priority.push(input[i + j].trim().split(' ').map(Number));
    shark_priority.push(priority);
}

// process
// 냄새 초기화
let scent = Array.from(new Array(N), () => new Array(N));
for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        if (grid[r][c] > 0)
            scent[r][c] = [grid[r][c], k];
    }
}

// 시뮬레이션 실행
let time;
for (time=1; time<=1000; time++)
{
    let [next_grid, next_scent] = move_shark(grid, scent);

    remove_scent(next_scent);

    if (countShark(next_grid) === 1) break;

    grid = next_grid;
    scent = next_scent;
}

// output
console.log(time > 1000? -1 : time);

// functions
function move_shark(grid, scent)
{
    let next_grid = Array.from(new Array(N), () => new Array(N).fill(0));
    let next_scent = Array.from(scent, x => Array.from(x));

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (grid[r][c] != 0)
            {
                let shark_name = grid[r][c];
                let d = shark_direction[shark_name];
                let moved = false;

                // 빈 공간 확인
                let r2, c2, d2;
                for (d2 of shark_priority[shark_name][d])
                {
                    let [dr, dc] = direction[d2];
                    r2 = r + dr;
                    c2 = c + dc;

                    if (out_of_grid(r2, c2)) continue;

                    if (grid[r2][c2] == 0 && scent[r2][c2] == undefined)
                    {
                        moved = true;

                        if (next_grid[r2][c2] == 0 || shark_name < next_grid[r2][c2])
                        {
                            next_grid[r2][c2] = shark_name;
                            next_scent[r2][c2] = [shark_name, k + 1];
                        }
                        shark_direction[shark_name] = d2;

                        break;
                    }
                }

                // 본인 냄새 확인
                if (!moved)
                {
                    for (d2 of shark_priority[shark_name][d])
                    {
                        let [dr, dc] = direction[d2];
                        r2 = r + dr;
                        c2 = c + dc;

                        if (out_of_grid(r2, c2)) continue;

                        if (scent[r2][c2] != undefined && scent[r2][c2][0] == shark_name)
                        {
                            next_grid[r2][c2] = shark_name;
                            next_scent[r2][c2] = [shark_name, k + 1];
                            shark_direction[shark_name] = d2;
                            break;
                        }
                    }
                }
            }
        }
    }

    return [next_grid, next_scent];
}

function remove_scent(scent)
{
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (scent[r][c] == undefined)
                continue;
            scent[r][c][1] -= 1;
            if (scent[r][c][1] == 0)
                scent[r][c] = undefined;
        }
    }
}

function out_of_grid(r, c)
{
    if (0 > r || r >= N || 0 > c || c >= N) return true;
    return false;
}

function countShark(grid)
{
    let cnt = 0;
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (grid[r][c] > 0)
                cnt++;
        }
    }
    return cnt;
}