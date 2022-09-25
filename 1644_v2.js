/*
1. N 이하의 소수를 센다.
2. 투 포인터로 합이 N 초과면 왼쪽 경계를 움직이고 아니면 오른쪽 경계를 움직인다.

확인해보니 소수판별이 오래걸렸음
에라토스테네스의 체 사용
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(inputFile).toString());

// process
// N 이하의 소수 세기
const primes = [];
const isPrime = new Array(N + 1).fill(true);

for (let i=2; i<=N; i++)
{
    if (isPrime[i])
    {
        primes.push(i);
        for (let j=2; i*j<=N; j++)
            isPrime[i * j] = false;
    }
}

// 정답 계산
let sol = N == 2? 1 : 0;
let left = 0;
let right = 0;
let sum = 2;

while (right < primes.length)
{
    if (sum > N)
        sum -= primes[left++];
    else
        sum += primes[++right];

    if (sum === N)
        sol++;
}

// output
console.log(sol);