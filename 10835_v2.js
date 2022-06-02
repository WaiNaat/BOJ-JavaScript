/*
opt(i, j) := 왼쪽에서 i장, 오른쪽에서 j장 버렸을 때 최고 점수
opt(i, j) 가 주어졌을 때
    opt(i+1, j+1) = opt(i, j)
    opt(i+1, j) = opt(i, j)
    left(i) > right(j)일 때
        opt(i, j+1) = opt(i, j) + right(j)
이렇게 다음 가능성들을 업데이트 하면 된다.

정답은 opt(?, N)과 opt(N, ?)들 중 최댓값.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [N, left, right] = require('fs').readFileSync(inputFile).toString().trim().split('\n');

N = parseInt(N)
left = left.split(' ').map(Number);
right = right.split(' ').map(Number);

// process
let opt = Array.from(new Array(N + 1), () => new Array(N + 1).fill(-1));
opt[0][0] = 0;

for (let i=0; i<=N; i++)
{
    for (let j=0; j<=N; j++)
    {
        if (opt[i][j] == -1) // 이 경우 애초부터 왼쪽i장 오른쪽j장이라는 상황 자체를 만들 수 없음
            continue;

        if (i < N && j < N)
            opt[i + 1][j + 1] = Math.max(opt[i + 1][j + 1], opt[i][j]);
        
        if (i < N)
            opt[i + 1][j] = Math.max(opt[i + 1][j], opt[i][j]);
        
        if (j < N && left[i] > right[j])
            opt[i][j + 1] = Math.max(opt[i][j + 1], opt[i][j] + right[j]);
    }
}

let sol = Math.max(... opt[N]);
for (let i=0; i<=N; i++)
    if (sol < opt[i][N]) sol = opt[i][N];

// output
console.log(sol);