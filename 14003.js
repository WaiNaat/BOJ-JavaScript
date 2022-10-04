/*
LIS = 가장 긴 증가하는 부분 수열

자리뺏기
현재 i번째 숫자를 보고 있고, LIS 배열에 i-1번 숫자까지 중에서 LIS를 저장되어 있다고 하면
LIS배열에서 이분탐색으로 i번째 숫자가 들어갈 자리를 찾아서 넣어버리면
LIS의 길이는 유지를 하면서 다음을 대비할 수 있음.

역추적을 위해 LIS배열에 숫자를 넣을 때마다 LIS에서 자기 앞쪽 숫자의 인덱스를 기억.
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, ...A] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
// LIS 구하기
const LIS = [A[0]];
const index = [0];
const prev = new Array(N);

for (let i=1; i<N; i++)
{
    // 위치 찾기
    let pos = LIS.length;
    if (A[i] > LIS[pos - 1])
    {
        LIS.push(0);
        index.push(0);
    }
    else
        pos = search(LIS, A[i]);
    
    // 자리 뺏기
    LIS[pos] = A[i];
    index[pos] = i;
    prev[i] = pos > 0 ? index[pos - 1] : undefined;
}

// 역추적
const sol = [];
let pos = index[LIS.length - 1];

while (pos !== undefined)
{
    sol.push(A[pos]);
    pos = prev[pos];
}

sol.reverse();

// output
console.log(sol.length);
console.log(sol.join(' '));

// function
function search(list, val)
{
    let left = 0;
    let right = list.length;

    while (left < right)
    {
        let mid = parseInt((left + right) / 2);

        if (list[mid] < val)
            left = mid + 1;
        else
            right = mid;
    }

    return left;
}