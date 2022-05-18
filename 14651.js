/*
i자리 3의 배수의 개수 = 
    i-1자리이고 3으로 나눈 나머지가 1인 수에 2를 붙임
    i-1자리이고 3으로 나눈 나머지가 2인 수에 1를 붙임
    i-1자리이고 3의 배수인 수에 0을 붙임

같은 방식으로 3으로 나눴을 때
나머지가 1, 2인 수의 개수도 구할 수 있음.

opt(i, {0,1,2}) := i자리이고 3으로 나눈 나머지가 0,1,2
근데 결국 opt(i,0), opt(i,1), opt(i,2) 모두 점화식이
opt(i-1,0) + opt(i-1,1) + opt(i-1,2)
이거로 통일됨.

즉 opt(i) = 3 * opt(i-1)

계산엔 opt(i), opt(i-1)만 있으면 됨
    >> 하나의 변수로 처리 가능
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = N == 1? 0 : 2; // opt(1)=0, opt(2)=2

for (let i=3; i<=N; i++)
    opt = (3 * opt) % 1000000009;

// output
console.log(opt);