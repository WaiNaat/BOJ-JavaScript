/*
opt(i) := VIP고려 안하고 i명의 사람이 앉을 수 있는 방법의 수
opt(i) = 
    opt(i-1)     (i번 사람은 제자리에 앉음)
    + opt(i-2)   (i번 사람과 i-1번 사람이 자리를 바꿈)

VIP를 고려하면?
VIP는 자리 무조건 고정
    = VIP를 기준으로 좌석들을 M+1등분 가능함.
    >> 각 등분된 조각마다 앉을 수 있는 경우를 계산, 전부 곱하면 답.
*/

// input
const inputFile = process.platform == 'linux'? '/dev/stdin' : './input';
const [N, M, ... vip] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => parseInt(x));

// process
// 각 등분마다 몇 명의 사람들이 있는지 계산
let division = [];
let prev = 0;

for (let cur of vip)
{
    let people = cur - prev - 1;
    if (people > 0)
        division.push(people);
    prev = cur;
}

if (N - prev > 0)
    division.push(N - prev);

// opt 배열 계산
let opt = [0, 1, 2];
let case_num = [];

for (let people of division)
{
    while (people > opt.length - 1)
        opt.push(opt[opt.length - 1] + opt[opt.length - 2]);
    case_num.push(opt[people]);
}

// output
let sol = case_num.reduce((mult, val) => mult * val, 1);
console.log(sol);