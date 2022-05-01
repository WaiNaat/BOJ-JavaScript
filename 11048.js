/*
opt(r, c) := (1,1)~(r,c)에서 모은 최대 사탕 개수
opt(r, c) = 
    opt(r-1, c)
    opt(r, c-1)
    opt(r-1, c-1)
    셋 중 큰 값에 (r,c)의 사탕 개수를 더한 값.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col] = input[0].split(' ').map(x => parseInt(x));
let maze = [];
for(let i=1; i<=row; i++)
    maze.push(input[i].split(' ').map(x => parseInt(x)));

// process
for(let r=0; r<row; r++)
{
    for(let c=0; c<col; c++)
    {
        let val1 = r > 0? maze[r - 1][c] : 0;
        let val2 = c > 0? maze[r][c - 1] : 0;
        let val3 = r > 0 && c > 0? maze[r - 1][c - 1] : 0;
        maze[r][c] += Math.max(val1, val2, val3);
    }
}

// output
console.log(maze[row - 1][col - 1]);