/*
opt(i, j, {hori, vert, diag}) := i행 j열로 가는 방법인데 도착을 {가로, 세로, 대각선}으로.
opt(i, j, hori) = 
    opt(i-1, j-1, diag) 
    + opt(i, j-1, hori)
이런식으로 계산 가능하고
대각선 이동시 벽이 있는지 확인해볼 것.

opt배열 계산에 i, i-1만 쓰니까
이차원 배열 필요없이 prev, cur 2개만 있으면 됨

배열 내에서 벽은 -1로 표현하기로 함
*/

// input
const inputFile = process.platform == 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

// process
const N = parseInt(input[0]);
let prev_hori = input[1].split(' ').map(x => x === '1'? -1 : 0);
let prev_vert = Array.from(prev_hori);
let prev_diag = Array.from(prev_vert);

// 초기값: 0행의 prev_hori 계산
for (let j=1; j<N; j++)
{
    if (prev_hori[j] == -1) break;
    else prev_hori[j] = 1;
}

for (let i=2; i<=N; i++)
{
    let cur_hori = input[i].split(' ').map(x => x === '1'? -1 : 0);
    let cur_vert = Array.from(cur_hori);
    let cur_diag = Array.from(cur_vert);

    for (let j=2; j<N; j++) // 각 행별로 0열과 1열은 연결법이 아예 없음.
    {
        if (cur_hori[j] == -1) continue;

        cur_vert[j] = 
            (prev_diag[j] != -1? prev_diag[j] : 0)
            + (prev_vert[j] != -1? prev_vert[j] : 0);

        cur_diag[j] = 
            prev_diag[j] != -1 && cur_diag[j - 1] != -1 && prev_diag[j - 1] != -1? // 대각선 이동시 벽 없는 조건
            prev_hori[j - 1] + prev_vert[j - 1] + prev_diag[j - 1]
            : 0;

        cur_hori[j] = 
            (cur_hori[j - 1] != -1? cur_hori[j - 1] : 0)
            + (cur_diag[j - 1] != -1? cur_diag[j - 1] : 0);
    }

    prev_hori = cur_hori;
    prev_vert = cur_vert;
    prev_diag = cur_diag;
}

// output
let sol = prev_hori[N - 1] + prev_vert[N - 1] + prev_diag[N - 1];
console.log(sol > 0? sol : 0);