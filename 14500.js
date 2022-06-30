/*
모든 모양의 폴리노미노 만드는 법:
    시작점에서 깊이 4 dfs를 한다.
    근데 ㅏ ㅓ ㅗ ㅜ 이 모양은 dfs로 못 만드니까
    이건 예외처리.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col] = input[0].trim().split(' ').map(Number);
const paper = [];
for (let i=1; i<=row; i++)
    paper.push(input[i].trim().split(' ').map(Number));

// process
let sol = 0;
const visited = Array.from(new Array(row), () => new Array(col));
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
for (let i=0; i<row; i++)
{
    for (let j=0; j<col; j++)
    {
        visited[i][j] = true;
        dfs(i, j, 0, 0);
        visited[i][j] = false;
        exception_tetromino(i, j);
    }
}

// output
console.log(sol);

// functions
function dfs(r, c, depth, sum)
{
    // base  case
    if (depth === 4)
    {
        sol = Math.max(sum, sol);
        return;
    }

    // recursive step
    for (let [dr, dc] of directions)
    {
        let r2 = r + dr;
        let c2 = c + dc;

        if (0 > r2 || r2 >= row || 0 > c2 || c2 >= col)
            continue;
        
        if (visited[r2][c2])
            continue;
        
        visited[r2][c2] = true;
        dfs(r2, c2, depth + 1, sum + paper[r2][c2]);
        visited[r2][c2] = false;
    }
}

function exception_tetromino(r, c)
{
    let center = paper[r][c];
    let side = [];
    
    for (let [dr, dc] of directions)
    {
        let r2 = r + dr;
        let c2 = c + dc;

        if (0 > r2 || r2 >= row || 0 > c2 || c2 >= col)
            side.push(0);
        else
            side.push(paper[r2][c2]);
    }

    let sum = center + side.reduce((prev, cur) => prev + cur, 0);
    for (let val of side)
        sol = Math.max(sol, sum - val);
}