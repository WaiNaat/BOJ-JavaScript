/*
맨 처음에 파이프의 위치가 고정됐다는 거 까먹지 말기
    opt(0, 1, 가로)=1로 설정

파이프 90도 꺾기 ㄴㄴ
    0행, 1행은 절대 파이프를 놓을 수 없음

opt(i, j, 방향) := (i, j)에 방향 모양 파이프로 도착하는 경우의 수
opt(i, j, 가로) = 
    opt(i, j-1, 대각선)
    opt(i, j-1, 가로)
    이거 두개의 합
이런 방식으로 3차원 opt배열 사용
*/

// constant
const WALL = 1;
const HORIZONTAL = 0;
const VERTICAL = 1;
const DIAGONAL = 2;

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const N = Number(input[0]);
const house = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
const opt = Array.from(new Array(3), () => Array.from(new Array(N), () => new Array(N).fill(0)));
opt[HORIZONTAL][0][1] = 1;

for (let r=0; r<N; r++)
{
    for (let c=2; c<N; c++)
    {
        if (house[r][c] == WALL)
            continue;
        
        opt[HORIZONTAL][r][c] = opt[DIAGONAL][r][c - 1] + opt[HORIZONTAL][r][c - 1];

        if (r > 0)
            opt[VERTICAL][r][c] = opt[DIAGONAL][r - 1][c] + opt[VERTICAL][r - 1][c];

        if (r > 0 && house[r][c - 1] != WALL && house[r - 1][c] != WALL)
            opt[DIAGONAL][r][c] = opt[DIAGONAL][r - 1][c - 1] + opt[HORIZONTAL][r - 1][c - 1] + opt[VERTICAL][r - 1][c - 1];
    }
}

// output
let sol = 0;
for (let d of [HORIZONTAL, VERTICAL, DIAGONAL])
    sol += opt[d][N - 1][N - 1];
console.log(sol);