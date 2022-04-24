/*
opt(i)를 i개의 대포알로 만들 수 있는 사면체의 최소 수라 하면
opt(i) = 
    opt(i - 1)
    opt(i - 4)
    opt(i - 10)
    opt(i - 20)
    ...
    중 최솟값 + 1.

사면체별 필요한 대포알 수 구하는 함수 필요.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
const tet = tetrahedron(N);
let opt = [0, 1];

while (opt.length <= N)
{
    let min = Infinity;
    
    for (val of tet)
    {
        if (opt.length - val < 0)
            break;
        min = Math.min(min, opt[opt.length - val])
    }

    opt.push(min + 1);
}

// output
console.log(opt[N]);

// function
function tetrahedron(num)
{
    /* num개의 대포알로 1개의 사면체만 만들 때
    각 사면체가 가지고 있는 대포알 수들의 배열 계산 */
    let ret = [1];
    let i;
    for(i=2; ret[i-2]<num; i++){
        let val = ret[i - 2] + i * (i + 1) / 2;
        ret.push(val);
    }
    return ret;
}