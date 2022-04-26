/*
opt(i, j)를 (1, 1)부터 (i, j)까지 탐색가능 최대자원이라 하면
opt(i, j) = 
    opt(i-1, j)
    opt(i, j-1)
    둘 중 큰 값에다가
    만약 (i, j)에 자원이 있으면 +1
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col] = input[0].split(' ').map(x => parseInt(x));

let area = [];
for(let i=1; i<input.length; i++)
    area.push(input[i].split(' ').map(x => parseInt(x)));

// process
for(let r=0; r<row; r++)
{
    for(let c=0; c<col; c++)
    {
        let val1 = r > 0? area[r - 1][c] : 0;
        let val2 = c > 0? area[r][c - 1] : 0;
        area[r][c] += Math.max(val1, val2);
    }
}

// output
console.log(area[row - 1][col - 1]);