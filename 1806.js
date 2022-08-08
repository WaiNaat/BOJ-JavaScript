/// 틀렸습니다 ///

/*
처음 부분합의 양 끝점은 배열의 처음과 마지막
양 끝점 중 더 작은 걸 뺐을 때 부분합이 S보다 크면 뺀다
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, S, ... arr] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let left = 0;
let right = N - 1;
let sum = arr.reduce((prev, cur) => prev + cur, 0);

while (sum >= S && left < right)
{
    if (arr[left] <= arr[right] && sum - arr[left] >= S)
        sum -= arr[left++];
    else if (arr[left] > arr[right] && sum - arr[right] >= S)
        sum -= arr[right--];
    else
        break;
}

// output
console.log(sum >= S? right - left + 1 : 0);