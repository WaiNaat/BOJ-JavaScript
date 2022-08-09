/// 시간 초과 ///

/*
A와 B의 부분합 배열을 만든다.
조합으로 모든 경우의 수를 확인한다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);
const n = Number(input[1]);
const A = input[2].trim().split(' ').map(Number);
const m = Number(input[3]);
const B = input[4].trim().split(' ').map(Number);

// process
const partial_sum_A = make_partial_sum_array(A);
const partial_sum_B = make_partial_sum_array(B);

let cnt = 0;
for (let a_left=-1; a_left<n; a_left++)
{
    for (let a_right=a_left+1; a_right<n; a_right++)
    {
        for (let b_left=-1; b_left<m; b_left++)
        {
            for (let b_right=b_left+1; b_right<m; b_right++)
            {
                let val = a_left == -1? partial_sum_A[a_right] : partial_sum_A[a_right] - partial_sum_A[a_left];
                val += b_left == -1? partial_sum_B[b_right] : partial_sum_B[b_right] - partial_sum_B[b_left];

                if (val === T)
                    cnt++;
            }
        }
    }
}

// output
console.log(cnt);

// functions
function make_partial_sum_array(arr)
{
    let result = new Array(arr.length);
    result[0] = arr[0];

    for (let i=1; i<arr.length; i++)
        result[i] = result[i - 1] + arr[i];
    
    return result;
}