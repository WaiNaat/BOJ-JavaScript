/*
opt(i) := 고속도로 길이 i일 때 운전거리 최솟값.

opt(i)가 주어졌고,
i~end까지 이동하는 길이 dist의 지름길이 있다고 치면
opt(end) = min(
    opt(i) + dist,    (i 위치에서 지름길을 탐)
    opt(end-1) + 1    (end-1 위치에서 그냥 1만큼 이동)
)
이런 식으로 opt배열을 채워나갈 수 있음.

지름길을 오름차순으로 준다는 말이 없기 때문에
지름길의 시작 위치 순으로 정렬하는 게 맞지만
max(N) = 12 이므로 굳이 정렬하지 않아도 시간 복잡도에 큰 문제는 없을 듯.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, D] = input[0].split(' ').map(x => parseInt(x));
let shortcut = [];
for (let i=1; i<1+N; i++)
    shortcut.push(input[i].split(' ').map(x => parseInt(x)));

// process
let opt = new Array(D + 1).fill(Infinity);
opt[0] = 0;

for(let i=0; i<D+1; i++)
{
    if (i > 0)
        opt[i] = Math.min(opt[i - 1] + 1, opt[i]);

    for (let [start, end, dist] of shortcut)
    {
        if (end > D) continue;
        if (start == i)
            opt[end] = Math.min(opt[end], opt[i] + dist);
    }
}

// output
console.log(opt[D]);