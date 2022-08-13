/*
opt(i, cnt) := cnt개의 소형 기관차가 있고, i번 객차까지로 이루어진 소형 기관차들의 최대 손님 수

train(i) := 슬라이딩 윈도우로 구한 i번 객차를 끝으로 하는 소형 기관차의 손님 수
opt(i, 1) = max(opt(i-1, 1), train(i))
opt(i, 2) = max(opt(i-size, 1) + train(i), opt(i-1, 2))
opt(i, 3) = max(opt(i-size, 2) + train(i), opt(i-1, 3))
    단, k는 i-객차수 이하의 자연수
*/

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const [N, ... passengers] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);
const size = passengers.pop();

// process
const train = new Array(N).fill(0);
const opt = Array.from(new Array(4), () => new Array(N).fill(0));

// train(i) 채우기
let val = 0;
for (let i=0; i<size; i++)
    val += passengers[i];

train[size - 1] = val;
for (let i=size; i<N; i++)
{
    val -= passengers[i - size];
    val += passengers[i];
    train[i] = val;
}

// opt(i, 1) 채우기
for (let i=size-1; i<N; i++)
{
    opt[1][i] = Math.max(train[i], i > 0? opt[1][i - 1] : 0);
}

// opt(i, 2) 채우기
for (let i=2*size-1; i<N; i++)
{
    opt[2][i] = Math.max(opt[1][i - size] + train[i], opt[2][i - 1]);
}

// opt(i, 3) 채우기
for (let i=3*size-1; i<N; i++)
{
    opt[3][i] = Math.max(opt[2][i - size] + train[i], opt[3][i - 1]);
}

// output
console.log(opt[3][N - 1]);