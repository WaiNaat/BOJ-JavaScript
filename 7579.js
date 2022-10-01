/// 메모리 초과 ///

/*
냅색 문젠데 가방 용량 이하로 채우는게 아니라 넘치게 해야함

opt(i, j) := 0번~i번 앱으로 j바이트 용량을 확보할 때 최소 비용
opt(i, j) = 
    opt(i-1, j)        (i번 앱을 종료하지 않음)
    opt(i-1, j-m(i)) + c(i)   (i번 앱을 종료함)
    둘중 작은 값

넘침 고려는 어떻게?
    j=M일 땐 opt(i-1, j-m(i)) 부터 opt(i-1, j-1)까지 전부 고려

opt(i, ?) 계산엔 opt(i-1, ?)값들만 쓰니까 prev, cur 두개만 사용
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const m = input[1].trim().split(' ').map(Number);
const c = input[2].trim().split(' ').map(Number);

// process
let prev = new Array(M + 1).fill(Infinity);
prev[0] = 0;

for (let i=0; i<N; i++)
{
    let cur = Array.from(prev);

    for (let j=1; j<M; j++)
    {
        cur[j] = Math.min(
            prev[j],
            j - m[i] >= 0? prev[j - m[i]] + c[i] : c[i]
        );
    }

    for (let k=M-m[i]; k<M; k++)
    {
        cur[M] = Math.min(k >= 0? prev[k] + c[i] : c[i], cur[M]);
    }

    prev = cur;
}

// output
console.log(prev[M]);