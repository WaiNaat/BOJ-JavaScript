/*
opt(i, j) := 좌상단부터 i행 j열까지 오는 경로의 수
opt(i, j) = opt(i-1, j) + opt(i, j-1)

O표시가 없는 경우
    그냥 opt(N, M)이 답이 된다.

O표시가 있는 경우
    O표시가 x행 y열에 있다고 치면
    opt(x, y) 여기에다가
    
    x행 y열 ~ N행 M열까지 가는 경로의 수
        == 좌상단 ~ N-x행 M-y열까지 가는 경로의 수

    이걸 곱하면 됨
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [row, col, K] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(x => parseInt(x));

// process
// opt배열 계산
opt = Array.from(Array(row), () => new Array(col));
opt[0].fill(1);

for (let r=1; r<row; r++)
{
    opt[r][0] = 1;

    for (let c=1; c<col; c++)
        opt[r][c] = opt[r - 1][c] + opt[r][c - 1];
}

// O표시 위치 계산
let x = Math.floor((K - 1) / col);
let y = Math.floor((K - 1) % col);

// 최종 경우의 수 계산
let sol;
if (K == 0)
    sol = opt[row - 1][col - 1];
else
    sol = opt[x][y] * opt[row - 1 - x][col - 1 - y];

// output
console.log(sol);