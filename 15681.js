/*
일단 그래프를 인접리스트 형태로 표현
힌트에서 준 makeTree, countSubtreeNode 그대로 구현
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, R, Q]  = input[0].split(' ').map(Number);

let G = Array.from(new Array(N + 1), () => []);
for (let i=1; i<=N-1; i++)
{
    let [a, b] = input[i].split(' ').map(Number);
    G[a].push(b);
    G[b].push(a);
}

let U = [];
for (let i=N; i<N+Q; i++)
    U.push(parseInt(input[i]));

input = null;

// process
let parent = new Array(N + 1).fill(-1);
let size = new Array(N + 1).fill(1);

makeTree(R);
countSubtreeNode(R);

let sol = [];
for (let u of U)
    sol.push(size[u]);

// output
console.log(sol.join('\n'));

// functions
function makeTree(cur)
{
    for (let next of G[cur])
    {
        if (next != parent[cur])
        {
            parent[next] = cur;
            makeTree(next);
        }
    }
}

function countSubtreeNode(cur)
{
    for (let next of G[cur])
    {
        if (next != parent[cur])
        {
            countSubtreeNode(next);
            size[cur] += size[next];
        }
    }
}