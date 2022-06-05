/*
그래프는 인접리스트로 만든다
다익스트라로 풀면 되는데
1 -> v1 -> v2 -> N
이렇게 이동하는 경우랑
1 -> v2 -> v1 -> N
이렇게 이동하는 경우로 나눠서 계산.
*/

// 최소 힙 구현
class Heap
{
    constructor(size, start)
    { // 힙 내부에 저장되는 값: [거리, 도착정점]
        this.list = [undefined, [0, start]];
        for (let i=1; i<=size; i++) this.list.push([Infinity, i]);
        this.size = size + 1;
    }

    isEmpty()
    {
        return this.size === 0;
    }

    push(tuple)
    {
        this.size++;
        this.list.push(tuple);

        let i;
        for(i = this.size;
            i != 1 && tuple[0] < this.list[Math.floor(i / 2)][0];
            i = Math.floor(i / 2)
        )// 부모가 본인보다 크면 끌어내림
            this.list[i] = this.list[Math.floor(i / 2)];
        
        this.list[i] = tuple;
    }

    pop()
    {
        if (this.isEmpty()) return [-1, -1];

        const del = this.list[1];
        const last = this.list.pop();
        this.size--;

        let i = 1;
        while (i <= this.size)
        {
            let c1 = Infinity;
            let c2 = Infinity;
            // 왼쪽 자식이 본인보다 작은 경우
            if (i * 2 <= this.size && this.list[i * 2][0] < last[0])
                c1 = this.list[i * 2][0];
            // 오른쪽 자식이 본인보다 작은 경우
            if (i * 2 + 1 <= this.size && this.list[i * 2 + 1][0] < last[0])
                c2 = this.list[i * 2 + 1][0];
            // 본인이 자식 둘보다 작은 경우 중지
            if (c1 === Infinity && c2 === Infinity) break;
            // 자식 중 더 작은 애와 교체
            let child = c1 <= c2? i * 2 : i * 2 + 1;
            this.list[i] = this.list[child];
            i = child;
        }
        
        this.list[i] = last;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, E] = input[0].split(' ').map(Number);
let G = Array.from(new Array(N + 1), () => []);
for (let i=1; i<=E; i++)
{
    let [v1, v2, dist] = input[i].split(' ').map(Number);
    G[v1].push([v2, dist]);
    G[v2].push([v1, dist]);
}
let [v1, v2] = input[E + 1].split(' ').map(Number);

// process
let dist_v1_v2 = dijkstra(v1, v2);
let sol1 = dijkstra(1, v1) + dist_v1_v2 + dijkstra(v2, N);
let sol2 = dijkstra(1, v2) + dist_v1_v2 + dijkstra(v1, N);

// output
let sol = Math.min(sol1, sol2);
console.log(sol != Infinity? sol : -1);

// function
function dijkstra(start, end)
{
    let visited = new Array(N + 1);
    let h = new Heap(N, start);
    let dist = new Array(N + 1).fill(Infinity);
    dist[start] = 0;

    while (!h.isEmpty())
    {
        let [_, cur] = h.pop();

        if (cur === end)
            return dist[cur];

        if (visited[cur] === true) continue;
        visited[cur] = true;
        
        for (let [adj, d] of G[cur])
        {
            if (visited[adj] === true) continue;
            if (dist[cur] + d < dist[adj])
            {
                dist[adj] = dist[cur] + d;
                h.push([dist[adj], adj]);
            }
        }
    }
    
    return dist[end];
}