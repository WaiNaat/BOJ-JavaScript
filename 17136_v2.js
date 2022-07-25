// 시간 초과

/*
백트래킹으로 색종이를 붙인다.
붙일 때는 가능한 한 큰거부터 붙인다
풀이상 색종이를 0개부터 하나씩 늘려나가기 때문에
    제일 먼저 계산된 값이 곧 정답
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
put_papers(grid, 0, 0, 5, [0, 0, 0, 0, 0]);

// output
console.log(sol == Infinity? -1 : sol);

// functions
function put_papers(grid, row, col, size, colored_paper_cnt)
{    
    // base case
    if (colored_paper_cnt.reduce((prev, cur) => prev + cur, 0) >= sol)
        return false;
    else if (colored_paper_cnt.reduce((prev, cur, idx) => prev + cur * ((idx + 1) ** 2), 0) === cnt_1)
    {
        sol = Math.min(sol, colored_paper_cnt.reduce((prev, cur) => prev + cur, 0));
        return true;
    }
    else if (size === 0) return false;

    // recursive step
    let newGrid = Array.from(grid, row => Array.from(row));

    if (colored_paper_cnt[size - 1] < 5)
    {
        for (let r=row; r<10; r++)
        {
            for (let c = r==row? col : 0; c<10; c++)
            {
                if (single_paper(EXAMINE, newGrid, r, c, size))
                {
                    single_paper(ATTACH, newGrid, r, c, size);
                    colored_paper_cnt[size - 1]++;

                    if (put_papers(newGrid, r, c, size, colored_paper_cnt))
                        return true;

                    single_paper(REMOVE, newGrid, r, c, size);
                    colored_paper_cnt[size - 1]--;
                }
            }
        }
    }

    put_papers(grid, 0, 0, size - 1, colored_paper_cnt);

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