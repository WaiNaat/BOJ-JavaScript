/*
백트래킹으로 선거구를 두 구역으로 나눔
dfs로 각 구역이 정상적으로 연결되어 있는지 조사

어차피 모든 도시는 A 또는 B 선거구에 속함
첫 번째 도시를 무조건 A에 속한다 치고 계산하면 시간 절약 가능
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const population = input[1].trim().split(' ').map(Number);
const adj = new Array(N);
for (let i=2; i<2+N; i++)
{
    let [_, ... adj_list] = input[i].trim().split(' ').map(x => Number(x) - 1);
    adj[i - 2] = adj_list;
}

// process
let sol = Infinity;
let district = new Array(N).fill(0);
district[0] = 1;

divide(1, 1);

// output
console.log(sol === Infinity? -1 : sol);

// functions
function divide(idx, depth)
{
    // base case
    if (depth === N)
        return;

    // recursive step
    calc_population(depth);

    for (let i=idx; i<N; i++)
    {
        district[i] = 1;
        divide(i + 1, depth + 1);
        district[i] = 0;
    }
}

function calc_population(depth)
{
    let a = dfs(1, depth);
    if (a === -1) return;

    let b = dfs(0, N - depth);
    if (b === -1) return;

    sol = Math.min(sol, Math.abs(a - b));
}

function dfs(district_name, depth)
{
    // 구역이 연결되어 있는지 조사
    let stack = [];
    let visited = new Array(N);

    // 구역에 속한 곳 아무거나 찾아서 시작점으로 지정
    for (let i=0; i<N; i++)
    {
        if (district[i] === district_name)
        {
            stack.push(i);
            break;
        }
    }

    // dfs로 시작점과 연결된 구역 찾기
    let ret = 0;
    let cnt = 0;
    while (stack.length > 0)
    {
        cur = stack.pop();

        if (visited[cur]) continue;
        visited[cur] = true;
        ret += population[cur];
        cnt++;

        for (let next of adj[cur])
        {
            if (!visited[next] && district[next] == district_name)
                stack.push(next);
        }
    }

    // 구역이 전부 연결되었는지 확인
    if (depth === cnt)
        return ret;
    else return -1;
}