/*
opt(i) := 돌이 i개일때 상근이가 이기면 true, 지면 false

opt(i-1)과 opt(i-3) 둘 중 하나라도 상근이가 지는 경우면
    (창영이가 마지막 돌을 가져감)
opt(i)에선 상근이가 이기게 돼있음
    (돌이 마지막 돌+1개, 마지막+3개 있으니까
    창영이가 1개 또는 3개를 가져가면 마지막 돌은 상근이가 가짐.)

opt(1)=true
opt(2)=false
opt(3)=true
opt(4)=false

홀짝으로 풀어도 되긴 함.
*/

const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

let opt = new Array(1001);
let lastIdx = 4;

opt[1] = true;
opt[3] = true;

while (lastIdx < N)
{
    lastIdx++;
    let skWin = !(opt[lastIdx - 1] && opt[lastIdx - 3]);
    opt[lastIdx] = skWin;
}

console.log(opt[N]? 'SK' : 'CY');