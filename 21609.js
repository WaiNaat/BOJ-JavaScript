/*
DFS로 그룹의 크기 및 구성하는 칸 확인
가장 큰 블록 찾기
나머지는 구현
*/

// constant
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
let grid = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
let score = 0;

while (true)
{
    // 가장 큰 블록 찾기
    let max_group;
    let max_group_size = 0;
    let max_group_rainbow = 0;
    let max_group_standard = [-1, -1];

    const visited_colorblocks = Array.from(new Array(N), () => new Array(N));

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (grid[r][c] > 0 && !visited_colorblocks[r][c])
            {
                let [group_size, group, rainbow] = dfs(r, c, grid, visited_colorblocks);

                if (is_better(max_group_size, max_group_rainbow, max_group_standard, group_size, rainbow, r, c))
                {
                    max_group_size = group_size;
                    max_group = group;
                    max_group_rainbow = rainbow;
                    max_group_standard = [r, c];
                }
            }
        }
    }
    
    // 자동 진행 종료 조건 확인
    if (max_group_size < 2)
        break;
        
    // 가장 큰 블록의 모든 블록 제거 및 점수 획득
    for (let [r, c] of max_group)
        grid[r][c] = undefined;
    score += max_group_size ** 2;

    // 중력
    gravity(grid);
    
    // 반시계 회전
    grid = rotate(grid);
    
    // 중력
    gravity(grid);
}

// output
console.log(score);

// functions
function dfs(r, c, grid, visited_colorblocks)
{
    const stack = [[r, c]];
    let group_size = 0;
    let rainbow = 0;
    const group = [];
    const visited = Array.from(new Array(N), () => new Array(N));
    const color = grid[r][c];

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (visited[r][c]) continue;

        visited[r][c] = true;
        group_size++;
        if (grid[r][c] == 0) rainbow++;
        else visited_colorblocks[r][c] = true;
        group.push([r, c]);

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;

            if (!visited[r2][c2] && (grid[r2][c2] == 0 || grid[r2][c2] == color))
                stack.push([r2, c2]);
        }
    }

    return [group_size, group, rainbow];
}

function gravity(grid)
{
    for (let c=0; c<N; c++)
    {
        for (let r=N-2; r>=0; r--)
        {
            if (grid[r][c] == -1 || grid[r][c] == undefined) continue;

            let r2;
            for (r2=r+1; r2<N && grid[r2][c]==undefined; r2++){}
            r2--;
            
            [grid[r][c], grid[r2][c]] = [undefined, grid[r][c]];
        }
    }
}

function rotate(grid)
{
    let next_grid = Array.from(new Array(N), () => new Array(N));

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
            next_grid[N - 1 - c][r] = grid[r][c];
    }

    return next_grid;
}

function is_better(max_group_size, max_group_rainbow, max_group_standard, group_size, rainbow, r, c)
{
    if (
        (group_size > max_group_size) ||
        (group_size == max_group_size && rainbow > max_group_rainbow) ||
        (group_size == max_group_size && rainbow == max_group_rainbow && r > max_group_standard[0]) ||
        (group_size == max_group_size && rainbow == max_group_rainbow && r ==  max_group_standard[0] && c > max_group_standard[1])
    ) return true;
    return false;
}