/*
어차피 볼륨은 0~1000 중 하나.
    >> 각 곡별로 연주 가능한 볼륨 집합을 만듦.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, S, M, ... V] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(x => parseInt(x));

// process
let prev = new Set([S]);

for (let i=0; i<N; i++)
{
    let cur = new Set();

    for (let vol of prev)
    {
        if (vol - V[i] >= 0)
            cur.add(vol - V[i]);
        if (vol + V[i] <= M)
            cur.add(vol + V[i]);
    }

    prev = cur;
}

// output
let sol = -1;
for (let vol of prev)
    if (vol > sol) sol = vol;
console.log(sol);