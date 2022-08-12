/// 시간 초과 ///

/*
opt(i, cnt) := cnt개의 소형 기관차가 있고, i번 객차를 끝으로 하는 소형 기관차들의 최대 손님 수

일단 opt(i, 1) 값들은 슬라이딩 윈도우로 구한다.
opt(i, 2) = max(opt(k, 1)) + opt(i, 1)
opt(i, 3) = max(opt(k, 2)) + opt(i, 1)
    단, k는 i-객차수 이하의 자연수
*/

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ... passengers] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);
const size = passengers.pop();

// process
const opt = Array.from(new Array(4), () => new Array(N).fill(0));

// opt(i, 1) 채우기
let val = 0;
for (let i=0; i<size; i++)
    val += passengers[i];

opt[1][size - 1] = val;
for (let i=size; i<N; i++)
{
    val -= passengers[i - size];
    val += passengers[i];
    opt[1][i] = val;
}

// opt(i, 2) 채우기
for (let i=2*size-1; i<N; i++)
{
    let max = 0;
    for (let k=0; k<=i-size; k++)
        max = Math.max(max, opt[1][k]);
    opt[2][i] = max + opt[1][i];
}

// opt(i, 3) 채우기
for (let i=3*size-1; i<N; i++)
{
    let max = 0;
    for (let k=0; k<=i-size; k++)
        max = Math.max(max, opt[2][k]);
    opt[3][i] = max + opt[1][i];
}

// output
console.log(Math.max(... opt[3]));