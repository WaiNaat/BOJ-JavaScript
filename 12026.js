/*
opt(i) := i번 보도블록까지 오는 에너지 최솟값
block(i) := i번 보도블록에 쓰여 있는 글자

만약 block(i)=O 라고 하면
opt(i) = min(opt(j) + (i-j)^2)
    j는 j<i이고 block(j)=B
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [N, block] = require('fs').readFileSync(inputFile).toString().trim().split('\n');
N = parseInt(N);

// process
let opt = [0];

for (let i=1; i<N; i++)
{
    let val = Infinity;
    let prev_block;

    if (block[i] == 'B') prev_block = 'J';
    else if (block[i] == 'O') prev_block = 'B';
    else prev_block = 'O';

    for (let j=0; j<i; j++)
    {
        if (block[j] == prev_block)
            val = Math.min(opt[j] + (i - j) ** 2, val);
    }

    opt.push(val);
}

// output
console.log(opt[N - 1] == Infinity? -1 : opt[N - 1]);