/*
D[i][j] = D[i-1][j] + D[i][j-1] + D[i-1][j-1]
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [row, col] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(x => parseInt(x));

// process
let D = Array.from(Array(row + 1), () => new Array(col + 1));
D[0][0] = 1; // 루프에서 D[1][1]=1로 설정해주기 위함

for(let r=1; r<=row; r++)
{
    for(let c=1; c<=col; c++)
    {
        let val1 = D[r - 1][c] === undefined? 0 : D[r - 1][c];
        let val2 = D[r][c - 1] === undefined? 0 : D[r][c - 1];
        let val3 = D[r - 1][c - 1] === undefined? 0 : D[r - 1][c - 1];
        D[r][c] = (val1 + val2 + val3) % 1000000007;
    }
}

// output
console.log(D[row][col]);