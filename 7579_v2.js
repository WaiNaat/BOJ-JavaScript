/// 메모리 초과 ///
/*
같은 알고리즘 파이썬으로 풀었더니 맞음

설마 input << 얘 크기문젠가? 진짜네ㅋㅋ
*/

/*
냅색 문제
    가방의 크기: 비용
    물건의 가치: 용량
    물건: 앱

opt(i, j) := 0번~i번 앱에서 j비용을 맞춰서 종료했을 때 얻는 최대 용량
opt(i, j) = 
    opt(i-1, j)   (i번 앱을 종료하지 않음)
    opt(i-1, j-c[i]) + m[i]   (i번 앱을 종료함)
    둘 중 큰 값.

opt(i, ?) 계산엔 opt(i-1, ?)값들만 쓰니까 prev, cur 두개만 사용
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const m = input[1].trim().split(' ').map(Number);
const c = input[2].trim().split(' ').map(Number);

// process
// 가능한 최대 비용 계산
const MAX_COST = c.reduce((prev, cur) => prev + cur, 0);

// dp
let prev = new Array(MAX_COST + 1).fill(0);

for (let i=0; i<N; i++)
{
    let cur = new Array(MAX_COST + 1).fill(0);

    for (let j=0; j<MAX_COST; j++)
    {
        cur[j] = Math.max(
            prev[j],
            j - c[i] >= 0? prev[j - c[i]] + m[i] : 0
        );
    }

    prev = cur;
}

// 정답 찾기
let sol;
for (sol=0; sol<MAX_COST+1; sol++)
{
    if (prev[sol] >= M)
        break;
}

// output
console.log(sol);