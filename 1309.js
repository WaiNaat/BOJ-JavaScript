/*
opt(i, 왼쪽) := i번째 줄의 왼쪽에 반드시 사자를 배치할 때 경우의 수
opt(i, 왼쪽) = 
    i-1번째 줄까지 가능한 모든 경우의 수에서
    i-1번째 줄의 왼쪽에 사자가 있는 경우의 수를 빼면 된다.

prev := opt(i-1, 왼쪽/오른쪽) 을 나타내는 수. 
        opt(i-1, 왼쪽)=opt(i-1, 오른쪽) 이라 변수 하나로 통일.
cur := 마찬가지로 opt(i, 왼쪽/오른쪽) 을 나타내는 수.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let prev = 1;
let sum = 3;

for(let i=1; i<N; i++)
{
    let cur = sum - prev;
    sum += 2 * cur;
    sum %= 9901;
    if (sum < 0) sum += 9901;
    prev = cur;
}

// output
console.log(sum);