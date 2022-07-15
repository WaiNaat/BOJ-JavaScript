/*
순수 구현 문제
관건은 화염구 합치기
    격자를 두 번 순회해서 각각 이동, 합치기 구현
*/

// constants
const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M, K] = input[0].trim().split(' ').map(Number);
let grid = Array.from(new Array(N), () => Array.from(new Array(N), () => []));
for (let i=1; i<1+M; i++)
{
    let [r, c, m, s, d] = input[i].trim().split(' ').map(Number);
    grid[r - 1][c - 1].push([m, s, d]);
}

// process
for (let i=0; i<K; i++)
{
    let next_grid = move_fireballs(grid);
    merge_fireballs(next_grid);
    grid = next_grid;
}

// output
console.log(get_mass_sum(grid));

// functions
function move_fireballs(grid)
{
    let next_grid = Array.from(new Array(N), () => Array.from(new Array(N), () => []));

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            for (let [m, s, d] of grid[r][c])
            {
                // 다음 위치 계산 및 이동
                let [dr, dc] = directions[d];
                let r2 = (r + dr * s) % N;
                let c2 = (c + dc * s) % N;

                if (r2 < 0) r2 += N;
                if (c2 < 0) c2 += N;

                next_grid[r2][c2].push([m, s, d]);
            }
        }
    }

    return next_grid;
}

function merge_fireballs(grid)
{
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (grid[r][c].length > 1)
            {
                let divided_fireballs = [];
                let mass_sum = 0;
                let speed_sum = 0;
                let cnt = 0;
                let even_cnt = 0;

                // 각종 숫자 세기
                for (let [m, s, d] of grid[r][c])
                {
                    mass_sum += m;
                    speed_sum += s;
                    cnt++;
                    if (d % 2 == 0) even_cnt++;
                }

                // 나눠진 화염구 정보 계산
                mass_sum = Math.floor(mass_sum / 5);
                speed_sum = Math.floor(speed_sum / cnt);
                new_direction = (even_cnt == cnt || even_cnt == 0)? [0,2,4,6] : [1,3,5,7];

                // 화염구 나누기
                if (mass_sum > 0)
                {
                    for (let d2 of new_direction)
                        divided_fireballs.push([mass_sum, speed_sum, d2]);
                }
                grid[r][c] = divided_fireballs;
            }
        }
    }
}

function get_mass_sum(grid)
{
    let sum = 0;
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            for (let [m, s, d] of grid[r][c])
                sum += m;
        }
    }
    return sum;
}