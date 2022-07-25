/*
백트래킹으로 색종이를 붙인다.
우선 붙일 수 있는 곳을 찾고 5~1크기 순서로 붙여본다
*/

// constants
const ATTACH = 0;
const EXAMINE = 1;
const REMOVE = 2;

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const grid = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(row => row.trim().split(' ').map(Number));

// process
// 채워야 하는 1의 개수 확인
let cnt_1 = 0;
for (let r=0; r<10; r++)
{
    for (let c=0; c<10; c++)
    {
        if (grid[r][c] == 1)
            cnt_1++;
    }
}

// 풀이
let sol = Infinity;
const colored_paper_cnt = [0, 0, 0, 0, 0];
put_papers(0, 0);

// output
console.log(sol == Infinity? -1 : sol);

// functions
function put_papers(row, col)
{
    // base case
    // 여태까지의 답보다 색종이를 많이 썼으면 실패
    if (colored_paper_cnt.reduce((prev, cur) => prev + cur, 0) >= sol)
        return false;
    // 1을 다 덮었으면 답이 될 수 있는지 확인
    else if (colored_paper_cnt.reduce((prev, cur, idx) => prev + cur * ((idx + 1) ** 2), 0) === cnt_1)
    {
        sol = Math.min(sol, colored_paper_cnt.reduce((prev, cur) => prev + cur, 0));
        return true;
    }

    // recursive step
    // 붙일 수 있는 곳 찾기
    let r, c, found;
    for (r=row; r<10; r++)
    {
        for (c = r==row? col : 0; c<10; c++)
        {
            if (grid[r][c] == 1)
            {
                found = true;
                break;
            }
        }
        if (found) break;
    }
    
    // 붙여보기
    if (!found) return false;

    for (let size=5; size>0; size--)
    {
        if (colored_paper_cnt[size - 1] == 5)
            continue;

        if (single_paper(EXAMINE, grid, r, c, size))
        {
            single_paper(ATTACH, grid, r, c, size);
            colored_paper_cnt[size - 1]++;

            put_papers(r, c)

            single_paper(REMOVE, grid, r, c, size);
            colored_paper_cnt[size - 1]--;
        }
    }
    return false;
}

function single_paper(type, grid, row, col, size)
{
    if (row + size > 10 || col + size > 10)
        return false;
    
    for (let r=row; r<row+size; r++)
    {
        for (let c=col; c<col+size; c++)
        {
            if (type == EXAMINE && grid[r][c] !== 1)
            {   
                return false;
            }
            else if (type == ATTACH)
                grid[r][c] = 0;
            else
                grid[r][c] = 1;
        }
    }

    return true;
}