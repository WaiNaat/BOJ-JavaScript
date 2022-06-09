/*
opt(i) := i번 작업 완료까지 최소 시간
time(i) := i번 작업을 완료하는 데 필요한 시간
opt(i) = 
    opt(k) + time(i)
    들 중 최대값.
    (k는 i의 선행작업)
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const time = [0];
const prev = [[]];

for (let i=1; i<=N; i++)
{
    const [t, _, ... p] = input[i].split(' ').map(Number);
    time.push(t);
    prev.push(p);
}

// process
const opt = [0];
for (let i=1; i<=N; i++)
{
    let val = 0;
    for (let p of prev[i])
        if (opt[p] > val) val = opt[p];
    opt.push(val + time[i]);
}

// output
console.log(Math.max(...opt));