/*
냅색 문제.
opt(i, j) := i단원까지 j시간동안 공부해서 최대 점수
time(i) := i단원 필요 공부 시간
score(i) := i단원 배점
opt(i, j) =
    opt(i-1, j)
    opt(i-1, j-time(i)) + score(i)
    둘 중에 큰 값.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, T] = input[0].split(' ').map(Number);
const time = []
const score = [];
for (let i=1; i<=N; i++)
{
    const [K, S] = input[i].split(' ').map(Number);
    time.push(K);
    score.push(S);
}

// process
let prev = new Array(T + 1).fill(0);

for (let i=0; i<N; i++)
{
    let cur = Array.from(prev);
    for (let j=0; j<=T; j++)
    {
        if (j - time[i] >= 0 && prev[j - time[i]] + score[i] > prev[j])
            cur[j] = prev[j - time[i]] + score[i];
    }
    prev = cur;
}

// output
console.log(prev[T]);