/*
3등분: 왼쪽재귀, 오른쪽재귀, 경계를 포함하는 무언가
핵심은 '경계를 포함하는 무언가'를 어떻게 계산할 것인가
    '경계의 기준'에서 왼쪽, 오른쪽을 보고
    둘 중에 먹었을 때 더 넓이가 커지는 쪽을 먹음.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const solutions = [];
for (let i=0; i<input.length-1; i++)
{
    const [n, ... histogram] = input[i].split(' ').map(Number);

// process
    solutions.push(calculate_largest_area(histogram, 0, n));
}

// output
console.log(solutions.join('\n'));

// function
function calculate_largest_area(histogram, left, right)
{
    if (right - left <= 1) return histogram[left];

    const mid = Math.floor((left + right) / 2);

    // 좌우 재귀
    const left_largest_area = calculate_largest_area(histogram, left, mid);
    const right_largest_area = calculate_largest_area(histogram, mid, right);

    // 경계를 포함하는 무언가 계산
    let mid_largest_area = histogram[mid];
    let height = histogram[mid];
    let width = 1;
    let left_horizon = mid;
    let right_horizon = mid;
    
    while ((left <= left_horizon) || (right_horizon < right))
    {        
        let eat_left = 0;
        let eat_right = 0;

        // 왼쪽을 먹을까?
        if (left <= left_horizon - 1)
            eat_left = Math.min(height, histogram[left_horizon - 1]) * (width + 1);

        // 오른쪽을 먹을까?
        if (right_horizon + 1 < right)
            eat_right = Math.min(height, histogram[right_horizon + 1]) * (width + 1);

        // 결정
        if (eat_left === 0 && eat_right === 0)
            break;
        else if (eat_left > eat_right)
        {
            left_horizon--;
            width++;
            height = Math.min(height, histogram[left_horizon]);
        }
        else
        {
            right_horizon++;
            width++;
            height = Math.min(height, histogram[right_horizon]);
        }

        if (width * height > mid_largest_area)
            mid_largest_area = width * height;
    }

    return Math.max(left_largest_area, right_largest_area, mid_largest_area);
}