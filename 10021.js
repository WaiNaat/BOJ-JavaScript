/*
각 밭별로 다른 모든 밭들까지의 수로 건설 비용을 계산
이때 비용이 C 미만이면 제외

위에서 만든 배열을 이용해서 크루스칼 알고리즘 사용
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [N, C] = input[0].trim().split(' ').map(Number);
const fields = input.slice(1).map(x => x.trim().split(' ').map(Number));

// process
// 수로 비용 계산
const pipe_costs = [];

for (let i=0; i<N-1; i++)
{
    let [xi, yi] = fields[i];
    for (let j=i+1; j<N; j++)
    {
        let [xj, yj] = fields[j];
        let cost = (xi - xj) ** 2 + (yi - yj) ** 2;
        if (cost >= C)
            pipe_costs.push([i, j, cost]);
    }
}

// 크루스칼
pipe_costs.sort((a, b) => a[2] - b[2]);

const parent = new Array(N).fill(-1);
let pipe_cnt = 0;
let total_cost = 0;

for (let [i, j, cost] of pipe_costs)
{
    if (pipe_cnt == N - 1)
        break

    if (find(i) != find(j))
    {
        union(i, j);
        pipe_cnt++;
        total_cost += cost;
    }
}

// output
console.log(pipe_cnt === N - 1? total_cost : -1);

// functinos
function union(a, b)
{
    a = find(a);
    b = find(b);
    parent[b] = a;
}

function find(a)
{
    if (parent[a] == -1)
        return a;
    parent[a] = find(parent[a]);
    return parent[a];
}