/*
opt(i) := 연산횟수 i번일 때 최대 개수
opt(i) = 
    i (그냥 A를 i번 넣었음)
    opt(k) * (i-k-2)   (단, k<i-2)  (k를 복붙했음)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = []
// output
console.log(max(opt[N]));