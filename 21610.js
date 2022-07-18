/*
순수 구현 문제

구름 위치 기억하는 보조 배열이 필요함
    첫 번째 순회에는 구름 이동과 비
    두 번째 순회에는 물복사
    세 번째 순회에는 구름 생성 및 소멸
*/

// constants
const directions = [undefined, [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
const diag = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const grid = Array.from(input.slice(1, 1 + N), x => x.trim().split(' ').map(Number));
const command = Array.from(input.slice(1 + N), x => x.trim().split(' ').map(Number));

// process
// 구름 위치 초기화
let cloud = Array.from(new Array(N), () => new Array(N).fill(0));
cloud[N - 2][0] = 1;
cloud[N - 2][1] = 1;
cloud[N - 1][0] = 1;
cloud[N - 1][1] = 1;

// 명령 실행
for (let [d, s] of command)
{
    let next_cloud = move_cloud(cloud, d, s);
    copy_water_bug(next_cloud);
    make_cloud(next_cloud);
    cloud = next_cloud;
}

// 결과 계산
let sol = 0;
for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
        sol += grid[r][c];
}

// output
console.log(sol);

// functions
function move_cloud(cloud, d, s)
{
    const [dr, dc] = directions[d];
    const next_cloud = Array.from(new Array(N), () => new Array(N).fill(0));
    
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (cloud[r][c] == 1)
            {
                let r2 = (r + dr * s) % N;
                let c2 = (c + dc * s) % N;

                if (r2 < 0) r2 += N;
                if (c2 < 0) c2 += N;

                next_cloud[r2][c2] = 1;
                grid[r2][c2]++;
            }
        }
    }

    return next_cloud;
}

function copy_water_bug(cloud)
{
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (cloud[r][c] == 1)
            {
                let cnt = 0;
                
                for (let [dr, dc] of diag)
                {
                    let r2 = r + dr;
                    let c2 = c + dc;

                    if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                        continue;
                    
                    if (grid[r2][c2] > 0)
                        cnt++;
                }

                grid[r][c] += cnt;
            }
        }
    }
}

function make_cloud(cloud)
{
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (cloud[r][c] == 0 && grid[r][c] >= 2)
            {
                cloud[r][c] = 1;
                grid[r][c] -= 2;
            }
            else if (cloud[r][c] == 1)
                cloud[r][c] = 0;
        }
    }
}