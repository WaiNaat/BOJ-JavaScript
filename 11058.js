// 맞긴 했는데 압도적 꼴등임

/*
opt(i, j) := 연산횟수 i번, 버퍼에 j개 있을 때 화면 A 최대 개수
opt(i, j)가 주어졌을 때
    opt(i+1, j) = opt(i, j) + 1      (1번)
    opt(i+2, opt(i, j)) = opt(i, j)  (2+3번)
    opt(i+1, j) = opt(i, j) + j      (4번)
이 세 가지 행동이 가능.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = Array.from(new Array(N + 1), () => new Map());
opt[0].set(0, 0);
for (let i=0; i<N; i++)
{
    for (let [j, val] of opt[i])
    {
        insert(i + 1, j, val + 1);
        insert(i + 1, j, val + j);
        if (i + 2 < N)
            insert(i + 2, val, val);
    }
}

// output
console.log(max(opt[N]));

// functions
function insert(i, j, val)
{
    if (!opt[i].has(j))
        opt[i].set(j, val);
    else
        opt[i].set(j, Math.max(opt[i].get(j), val));
}

function max(map)
{
    let ret = -Infinity;
    for (let val of map.values())
        if (ret < val) ret = val;
    return ret;
}