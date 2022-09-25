/// 시간초과 ///

/*
1. N 이하의 소수를 센다.
2. 투 포인터로 합이 N 초과면 왼쪽 경계를 움직이고 아니면 오른쪽 경계를 움직인다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(inputFile).toString());

// process
// N 이하의 소수 세기
const primes = [2];

for (let i=3; i<=N; i+=2)
{
    let isPrime = true;
    for (let j=0; j<primes.length && primes[j]**2 <= i**2; j++)
    {
        if (i % primes[j] == 0)
        {
            isPrime = false;
            break;
        }
    }

    if (isPrime)
        primes.push(i);
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