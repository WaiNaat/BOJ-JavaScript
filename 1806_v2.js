/*
1. 처음 부분합의 양 끝점은 배열의 처음과 처음
2. 부분합이 S 이상이 될 때까지 오른쪽 끝점을 오른쪽으로 움직인다.
3. 이후에 왼쪽 끝을 오른쪽으로 움직여도 되는지 본다
4. 슬라이딩 윈도우로 양 끝점을 오른쪽으로 움직인다
5. 3~5 반복
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, S, ... arr] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let left = 0;
let right = 1;
let sum = arr[0];
let found;

while (sum < S && right < N)
    sum += arr[right++];

if (sum >= S)
    found = true;

while (left < right && right <= N)
{
    while (sum - arr[left] >= S && left < right - 1)
    {
        sum -= arr[left++];
    }
    
    sum -= arr[left++];
    sum += arr[right++];
}

// output
console.log(found? right - left: 0);