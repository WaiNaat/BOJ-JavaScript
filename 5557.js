/*
opt(i, val) := 앞에서 i개 숫자를 써서 val값을 만드는 경우
i번째 숫자가 4라면
opt(i, 10) = opt(i-1, 6) + opt(i-1, 14)
이런 식으로 구할 수 있다.

opt(i, ?)계산에 opt(i-1, ?)만 필요하므로
prev, cur 두 개로만 처리 가능

계산값들이 0~20이므로 prev, cur은 크기 21의 배열로 가능.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ... numbers] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let prev = new Array(21).fill(0n);
prev[numbers[0]] = 1n;

for (let i=1; i<N-1; i++)
{
    let cur = new Array(21).fill(0n);

    for (let val=0; val<=20; val++)
    {
        if (prev[val] == 0)
            continue;

        if (val + numbers[i] <= 20)
            cur[val + numbers[i]] += prev[val];
        
        if (val - numbers[i] >= 0)
            cur[val - numbers[i]] += prev[val];
    }

    prev = cur;
}

// output
console.log(String(prev[numbers[N - 1]]));