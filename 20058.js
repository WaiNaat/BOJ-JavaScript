/*
화염폭풍은 단순히 구현하면 됨

덩어리 세는 건 DFS/BFS로

남아있는 얼음 중 가장 큰 덩어리가 차지하는 칸의 개수??
    가장 큰 덩어리 = 얼음의 양이 가장 많은 덩어리?
    가장 큰 덩어리 = 차지하는 칸의 개수가 가장 많은 덩어리? << 일단 이걸로
    가장 큰 덩어리 = 가장 큰 얼음이 있는 덩어리?
*/

// constant
const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

let [N, Q] = input[0].trim().split(' ').map(Number);
N = 2 ** N;
let grid = Array.from(input.slice(1, 1 + N), x => x.trim().split(' ').map(Number));
const L = input[1 + N].trim().split(' ').map(Number);

// process
// 화염폭풍 시전
for (let lv of L)
{
    // 회전
    let length = 2 ** lv;

    if (length > 1)
    {
        let next_grid = Array.from(new Array(N), () => new Array(N));

        for (let r=0; r<N; r+=length)
        {
            for (let c=0; c<N; c+=length)
                rotate(grid, next_grid, r, c, length);
        }

        grid = next_grid;
    }
    
    // 녹이기
    let next_grid = Array.from(grid, x => Array.from(x));

    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (grid[r][c] > 0)
                melt(grid, next_grid, r, c);
        }
    }
    
    grid = next_grid;
}

// 결과
let max_area = 0;
let sum = 0;
const visited = Array.from(new Array(N), () => new Array(N));

for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        if (grid[r][c] > 0 && !visited[r][c])
        {
            let [a, s] = dfs(r, c);
            max_area = Math.max(max_area, a);
            sum += s;
        }
    }
}
    
// output
console.log(`${sum}\n${max_area}`);

// functions
function rotate(grid, next_grid, r, c, length)
{
    for (let dr=0; dr<length; dr++)
    {
        for (let dc=0; dc<length; dc++)
            next_grid[r + dc][c + length - dr - 1] = grid[r + dr][c + dc];
    }
}

function melt(grid, next_grid, r, c)
{
    let cnt = 0;

    for (let [dr, dc] of directions)
    {
        let r2 = r + dr;
        let c2 = c + dc;

        if (!out_of_bound(r2, c2) && grid[r2][c2] > 0)
            cnt++;
    }

    if (cnt < 3)
        next_grid[r][c]--;
}

function dfs(r, c)
{
    const stack = [[r, c]];
    let cnt = 0;
    let sum = 0;

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (visited[r][c]) continue;
        visited[r][c] = true;
        cnt++;
        sum += grid[r][c];

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (!out_of_bound(r2, c2) && grid[r2][c2] > 0 && !visited[r2][c2])
                stack.push([r2, c2]);
        }
    }

    return [cnt, sum];
}

function out_of_bound(r, c)
{
    if (0 > r || r >= N || 0 > c || c >= N) return true;
    else return false;
}