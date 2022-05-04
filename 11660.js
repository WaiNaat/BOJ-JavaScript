/*
opt(i, j) := 좌상단부터 i행 j열까지 합
opt(i, j) = 
    opt(i-1, j) + opt(i, j-1) - opt(i-1, j-1) + (i, j)의 값

(x1, y1)와 (x2, y2)까지의 합 = 
    opt(x2, y2) - opt(x1-1, y2) - opt(x2, y1-1) + opt(x1-1, y1-1)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(x => parseInt(x));
let table = [];
let testCase = [];
for (let i=1; i<=N; i++)
    table.push(input[i].split(' ').map(x => parseInt(x)));
for (let i=N+1; i<=N+M; i++)
    testCase.push(input[i].split(' ').map(x => parseInt(x) - 1));

// process
// opt 배열 계산
let opt = Array.from(Array(N), () => Array(N));

for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        let val1 = r > 0? opt[r - 1][c] : 0;
        let val2 = c > 0? opt[r][c - 1] : 0;
        let val3 = r > 0 && c > 0? opt[r - 1][c - 1] : 0;
        opt[r][c] = table[r][c] + val1 + val2 - val3;
    }
}

// 부분합 계산
let sol = [];

for (let [x1, y1, x2, y2] of testCase)
{
    let val1 = y1 > 0? opt[x2][y1 - 1] : 0;
    let val2 = x1 > 0? opt[x1 - 1][y2] : 0;
    let val3 = x1 > 0 && y1 > 0? opt[x1 - 1][y1 - 1] : 0;
    sol.push(opt[x2][y2] - val1 - val2 + val3);
}

// output
console.log(sol.join('\n'));