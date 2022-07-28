/// 시간 초과 /// 

/*
임의의 한 구역을 정하고 dfs/bfs로 한 선거구를 만든다.
dfs/bfs로 반대쪽 선거구는 전부 연결되었는지 확인한다.
연결되었다면 인구수 차를 계산한다.

시간 초과 원인: (1,4)(2,3,5,6) 이거랑 (4,1)(2,3,5,6) 이거랑 중복됨
set으로 해결 시도
이래도 시간 초과
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
const visited = new Set();

for (let i=0; i<N; i++)
{
    let district = new Array(N).fill(0);
    dfs(0, district, i);
}

// output
console.log(sol === Infinity? -1 : sol);

// functions
function dfs(depth, district, cur)
{
    // base case
    if (depth === N)
        return;

    // recursive step
    // 계산
    let key1 = district.join('');
    let key2 = district.map(x => x === 1? 0 : 1).join('');
    if (!visited.has(key1) && !visited.has(key2))
    {
        visited.add(key1);
        visited.add(key2);
        calc_population(district);
    }

    // 탐색
    for (let next of adj[cur])
    {
        if (district[next] === 0)
        {
            district[next] = 1;
            dfs(depth + 1, district, next);
            district[next] = 0;
        }
    }
}

function calc_population(district)
{
    let area_1 = 0;
    let area_2 = 0;
    let visited = Array.from(district);
    let stack = [];

    // 구역B에 속한 임의의 구역 찾기
    for (let i=0; i<N; i++)
    {
        if (visited[i] === 0)
        {
            stack.push(i);
            break;
        }
    }

    // dfs로 해당 구역과 연결된 구역B 찾기
    while (stack.length > 0)
    {
        let cur = stack.pop();

        if (visited[cur] !== 0) continue;

        visited[cur] = 2;
        area_2 += population[cur];

        for (let next of adj[cur])
        {
            if (visited[next] === 0)
                stack.push(next);
        }
    }

    // 구역A 인구수 계산
    for (let i=0; i<N; i++)
    {
        if (visited[i] === 0) // 이러면 구역B가 끊어져 있다는 뜻
            return;
        else if (visited[i] === 1)
            area_1 += population[i];
    }

    sol = Math.min(sol, Math.abs(area_1 - area_2));
}