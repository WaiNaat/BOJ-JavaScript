// 틀렸습니다

/*
opt(i, j) := 왼쪽에서 i장, 오른쪽에서 j장 버렸을 때 최고 점수
opt(i, j) = 
    opt(i-1, j)
    opt(i-1, j-1)
    만약 left(i)>right(j-1) 이고 opt(i, j-1)>0 이면
        opt(i, j-1) + right(j-1)
    이 값들 중 제일 큰 값.

정답은 opt(?, N)과 opt(N, ?)들 중 최댓값.

반례
2
2 1
3 1
opt(0, 2)가 1로 최댓값이라 출력하는데 정답은 0임
카드 더미 상태가 (0, 2)로 갈 수 있는 방법이 없음
갈 수 있음을 처리하는 방법?
opt배열 계산법을 과거>현재 가 아니라 현재>미래 로.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [N, left, right] = require('fs').readFileSync(inputFile).toString().trim().split('\n');

N = parseInt(N)
left = left.split(' ').map(Number);
right = right.split(' ').map(Number);

// process
let opt = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

for (let i=0; i<=N; i++)
{
    for (let j=0; j<=N; j++)
    {
        let val1, val2, val3;
        val1 = i > 0 && j < N? opt[i - 1][j] : 0;
        val2 = i > 0  && j > 0? opt[i - 1][j - 1] : 0;
        val3 = i < N && j > 0 && left[i] > right[j - 1] ? opt[i][j - 1] + right[j - 1] : 0;
        opt[i][j] = Math.max(val1, val2, val3);
    }
}

let sol = Math.max(... opt[N]);
for (let i=0; i<=N; i++)
    if (sol < opt[i][N]) sol = opt[i][N];

// output
console.log(sol);
console.log(opt);