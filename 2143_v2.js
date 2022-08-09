/*
A와 B의 가능한 부 배열의 합들을 구한다.
A의 부 배열의 합과 더해서 T가 되는 값이 B의 부 배열의 합들 중 있는지 확인한다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);
const A = input[2].trim().split(' ').map(Number);
const B = input[4].trim().split(' ').map(Number);

// process
const partial_sum_A = make_partial_sum_array(A);
const partial_sum_B_temp = make_partial_sum_array(B);

const partial_sum_B = new Map();
for (let val of partial_sum_B_temp)
{
    if (partial_sum_B.has(val))
        partial_sum_B.set(val, partial_sum_B.get(val) + 1);
    else
        partial_sum_B.set(val, 1);
}

let cnt = 0;
for (let val of partial_sum_A)
{
    if (partial_sum_B.has(T - val))
        cnt += partial_sum_B.get(T - val);
}

// output
console.log(cnt);

// functions
function make_partial_sum_array(arr)
{
    const result = [];
    for (let left=0; left<arr.length; left++)
    {
        let sum = 0;
        for (let right=left; right<arr.length; right++)
        {
            sum += arr[right];
            result.push(sum);
        }
    }
    
    return result;
}