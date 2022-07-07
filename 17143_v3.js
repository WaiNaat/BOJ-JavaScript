/*
이차원 배열로 격자판 구현하고 거기에 상어들 배치
123 순서대로 작동하도록 구현
상어 이동에는 새로운 임시 격자판 활용해서 이동한 애와 이동할 애가 안 겹치게
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, M] = input[0].trim().split(' ').map(Number);
let grid = Array.from(new Array(row), () => new Array(col));
for (let i=1; i<=M; i++)
{
    let [r, c, s, d, z] = input[i].trim().split(' ').map(Number);
    r--;
    c--;
    d--;
    grid[r][c] = [s, d, z];
}

// process
const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
let sol = 0;

for (let king=0; king<col; king++)
{
    // 상어 잡기
    for (let r=0; r<row; r++)
    {
        if (grid[r][king] != undefined)
        {
            sol += grid[r][king][2];
            grid[r][king] = undefined;
            break;
        }
    }

    // 상어 이동
    const newGrid = Array.from(new Array(row), () => new Array(col));
    for (let r=0; r<row; r++)
    {
        for (let c=0; c<col; c++)
        {
            if (grid[r][c] == undefined) continue;
            
            let [s, d, z] = grid[r][c];
            let [r2, c2, d2] = move(r, c, s, d);

            // 이동하려는 칸에 본인보다 큰 상어가 있으면 먹힘
            if (newGrid[r2][c2] != undefined && z < newGrid[r2][c2][2])
                continue;
            else
                newGrid[r2][c2] = [s, d2, z];
        }
    }
    grid = newGrid;
}

// output
console.log(sol);

// function
function move(r, c, s, d)
{
    let r2 = r;
    let c2 = c;
    let [dr, dc] = directions[d];

    if (d < 2)
        s %= (row * 2 - 2);
    else
        s %= (col * 2 - 2);

    for (let i=0; i<s; i++)
    {
        if ((d == 0 && r2 == 0) || 
            (d == 1 && r2 == row - 1) || 
            (d == 2 && c2 == col - 1) || 
            (d == 3 && c2 == 0))
        {
            switch(d)
            {
                case 0:
                    d = 1;
                    break;
                case 1:
                    d = 0;
                    break;
                case 2:
                    d = 3;
                    break;
                case 3:
                    d = 2;
                    break;
            }
            [dr, dc] = directions[d];
        }

        r2 += dr;
        c2 += dc;                    
    }

    return [r2, c2, d];
}