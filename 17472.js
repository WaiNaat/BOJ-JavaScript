/*
섬별로 이름을 붙임 (dfs)
각 섬의 경계들의 좌표를 찾기
해당 좌표들에서 다리로 연결할 수 있는 다른 섬들과의 거리 계산
    >> 각 섬별로 다른 섬까지의 최단거리 계산 가능

섬끼리의 연결 그래프를 이용해 MST 만드는 문제: 크루스칼
    (거리, 섬A, 섬B)쌍들을 거리순으로 오름차순 정렬
    union-find로 해당 다리를 건설해야 하는지 판단

*/

// constants
const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [row, col] = input[0].trim().split(' ').map(Number);
const map = input.slice(1).map(x => x.trim().split(' ').map(Number));

// process
// 섬 이름 붙이기
const visited = Array.from(new Array(row), () => new Array(col));
let island_cnt = 1;
for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (map[r][c] === 1)
            dfs(r, c, ++island_cnt);
    }
}

// 경계선 확인 및 거리 계산
island_cnt--;
const distance = Array.from(new Array(island_cnt), () => new Array(island_cnt).fill(Infinity));

for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (map[r][c] > 0)
        {
            for (let i=0; i<4; i++)
            {
                let r2 = r + dr[i];
                let c2 = c + dc[i];
                if (out_of_bound(r2, c2)) continue;

                // 해당 방향이 경계인지 확인
                if (map[r2][c2] != 0) continue;

                // 경계임이 확인되었으면 쭉 이동
                let d = 0;
                while (!out_of_bound(r2, c2) && map[r2][c2] == 0)
                {
                    r2 += dr[i];
                    c2 += dc[i];
                    d++;
                }

                if (out_of_bound(r2, c2) || d < 2) continue;

                // 섬과 섬 사이 거리 저장
                distance[map[r][c] - 2][map[r2][c2] - 2] = Math.min(d, distance[map[r][c] - 2][map[r2][c2] - 2]);
            }
        }
    }
}

// (거리, 섬A, 섬B) 쌍들의 배열 생성 및 정렬
const bridge_candidate = [];
for (let i=0; i<island_cnt; i++)
{
    for (let j=0; j<island_cnt; j++)
    {
        if (distance[i][j] != Infinity)
            bridge_candidate.push([distance[i][j], i, j]);
    }
}

bridge_candidate.sort((a, b) => a[0] - b[0]);

// 다리 건설
const parent = new Array(island_cnt);
for (let i=0; i<island_cnt; i++) parent[i] = i;
const card = new Array(island_cnt).fill(1);
let bridge_cnt = 0;
let total_distance = 0;

for (let [d, a, b] of bridge_candidate)
{
    if (bridge_cnt == island_cnt - 1)
        break;

    if (find(a) != find(b))
    {
        total_distance += d;
        bridge_cnt++;
        union(a, b);
    }
}

// output
console.log(bridge_cnt == island_cnt - 1? total_distance : -1);

// functions
function dfs(r, c, name)
{
    let stack = [[r, c]];

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (visited[r][c]) continue;
        visited[r][c] = true;
        map[r][c] = name;

        for (let i=0; i<4; i++)
        {
            let r2 = r + dr[i];
            let c2 = c + dc[i];

            if (!out_of_bound(r2, c2) && map[r2][c2] == 1 && !visited[r2][c2])
                stack.push([r2, c2]);
        }
    }
}

function out_of_bound(r, c)
{
    if (0 > r || r >= row || 0 > c || c >= col) return true;
    else return false;
}

function union(a, b)
{
    a = find(a);
    b = find(b);

    if (a == b) return;

    // cardinality가 더 작은 트리가 큰 트리 밑으로 들어감
    if (card[a] < card[b])
    {
        parent[a] = parent[b];
        card[b] += card[a];
    }
    else
    {
        parent[b] = parent[a];
        card[a] += card[b];
    }
}

function find(a)
{
    if (parent[a] == a) return a;
    parent[a] = find(parent[a]);
    return parent[a];
}