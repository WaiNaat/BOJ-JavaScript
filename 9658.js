/*
마지막 돌을 가져가는 사람이 짐.
opt(i) := 돌 i개일 때 상근이가 이기면 true, 지면 false

opt(i) =
    opt(i-1), opt(i-3), opt(i-4) 세 경우에서 모두 상근이가 이긴다면
    상근이는 opt(i)에서 무조건 짐.
    왜? 돌이 i-1개, i-3개, i-4개가 되는 순간 창영이가 1개, 3개, 4개 가져가니까.

opt(1) = false
opt(2) = true
opt(3) = false
opt(4) = true
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = [undefined, false, true, false, true];

for(let i=5; i<=N; i++)
{
    opt.push(opt[i - 1] && opt[i - 3] && opt[i - 4]? false : true);
}

// output
console.log(opt[N]? 'SK' : 'CY');