/*
"동전으로 금액 만들기" 문제
    동전마다 개수제한 X
    동전의 종류는 2의 멱수

coin(i) := 앞에서부터 i번째 동전의 금액
opt(i, j) := 앞에서부터 i종류 동전을 써서 j원을 만드는 경우의 수
opt(i, j) = 
    opt(i-1, j)         (i번째 동전을 쓰지 않고도 j원을 만드는 경우)
    opt(i, j-coin(i))   (i번째 동전을 써서 j원을 만드는 경우)

우리가 구할 건 opt(?, N).
?값은 구해야 함.

opt배열 계산에 있어서 opt(i-1, ?)과 opt(i, ?)만을 사용하고
opt(i, ?) = opt(i-1, ?) + opt(i, ??) 이 꼴이라
2차원이 아닌 1차원 배열 하나만 유지해도 계산이 가능.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
// 우리가 쓸 수 있는 '동전'의 종류들을 구함.
let powerOf2 = [];
for (let val=2; val<=N; val*=2)
    powerOf2.push(val);

// opt배열 계산.
let arr = new Array(N + 1).fill(1); // opt(1, ?)

for (let ith_coin of powerOf2)
{    
    for (let j=1; j<=N; j++)
    {
        if (j >= ith_coin)
        {
            arr[j] += arr[j - ith_coin];
            arr[j] %= 1000000000;
        }
    }
}


// output
console.log(arr[N]);