/*
opt(i, cnt) := 0부터 i까지 정수 cnt개를 더해 합이 i인 경우의 수
opt(i, cnt) = sum( opt(i-j, cnt-1) )
    j는 j<=i인 정수

opt(i, cnt)계산에 opt(i, cnt-1)만 보면 되므로
2차원 배열 필요 x
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, K] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(x => parseInt(x));

// process
let prev = new Array(N + 1).fill(1);

for (let k=2; k<=K; k++)
{
    let cur = new Array(N + 1).fill(0);

    for (let i=0; i<=N; i++)
    {
        for (let j=0; j<=i; j++)
            cur[i] += prev[i - j];
    }

    prev = cur.map(x => x % 1000000000);
}

// output
console.log(prev[N]);