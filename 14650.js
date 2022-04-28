/*
opt(i, 0) := i자리 수 중 3으로 나눈 나머지가 0인 수의 개수
opt(i, 1) := i자리 수 중 3으로 나눈 나머지가 1인 수의 개수
opt(i, 2) := i자리 수 중 3으로 나눈 나머지가 2인 수의 개수

opt(i, 0) = opt(i-1, 0) + opt(i-1, 1) + opt(i-1, 2)
    나머지가 0인 수 뒤에 0을 붙이거나
    1인 수 뒤에 2를 붙이거나
    2인 수 뒤에 1을 붙이면 되삼

같은 방법으로 opt(i, 1), opt(i, 2)도 구할 수 있삼.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
opt = [[0, 0], [0, 1], [0, 1]];

for(let i=2; i<=N; i++)
{
    let val = opt[0][i - 1] + opt[1][i - 1] + opt[2][i - 1];
    opt[0].push(val);
    opt[1].push(val);
    opt[2].push(val);
}

// output
console.log(opt[0][N]);