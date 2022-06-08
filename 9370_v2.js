/*
다익스트라로 계산
s -> g -> h -> x
s -> h -> g -> x
경로의 최솟값이 s -> x와 같으면 O, 아니면 X.

이때 g->h는 중간지점 없이 바로 가야 함.
*/

// 최소 힙 구현
class Heap
{
    constructor(start)
    { // 힙에 저장되는 값: [거리, 도착지점]
        this.list = [undefined, [0, start]];
        this.size = 1;
    }

    isEmpty()
    {
        return this.size === 0;
    }

    push(tuple)
    {
        this.list.push(tuple);
        this.size++;

        let i;
        for (i = this.size;
             i != 1 && tuple[0] < this.list[Math.floor(i / 2)][0];
             i = Math.floor(i / 2)
        )
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

            if (2 * i <= this.size && last[0] > this.list[2 * i][0])
                c1 = this.list[2 * i][0];
            if (2 * i + 1 <= this.size && last[0] > this.list[2 * i + 1][0])
                c2 = this.list[2 * i + 1][0];

            if (c1 === Infinity && c2 === Infinity) break;

            const child = c1 <= c2? 2 * i : 2 * i + 1;
            this.list[i] = this.list[child];
            i = child;
        }

        if (!this.isEmpty()) this.list[i] = last;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const T = Number(input[0]);
const sol = [];
let i = 1;
for (let test=0; test<T; test++)
{
    const [V, E, t] = input[i++].split(' ').map(Number);
    const [s, g, h] = input[i++].split(' ').map(Number);
    const G = Array.from(new Array(V + 1), () => []);
    for (let e=0; e<E; e++)
    {
        const [a, b, dist] = input[i++].split(' ').map(Number);
        G[a].push([b, dist]);
        G[b].push([a, dist]);
    }

    const dest = [];
    for (let j=0; j<t; j++)
        dest.push(Number(input[i++]));

// process
    const start_s = dijkstra(s, V, G);
    const start_g = dijkstra(g, V, G);
    const start_h = dijkstra(h, V, G);
    let gh_dist;

    for (let [adj, dist] of G[g])
    {
        if (adj == h)
        {
            gh_dist = dist;
            break;
        }
    }

    const sol_testcase = [];
    for (let x of dest)
    {
        // s -> x 거리
        const sx = start_s[x];
        // s -> g -> h -> x 거리
        const sghx = start_s[g] + gh_dist + start_h[x];
        // s -> h -> g -> x 거리
        const shgx = start_s[h] + gh_dist + start_g[x];

        if (sx != Infinity && (sx == sghx || sx == shgx))
            sol_testcase.push(x);        
    }

    sol_testcase.sort((a, b) => a - b);
    sol.push(sol_testcase.join(' '));
}

// output
console.log(sol.join('\n'));

// function
function dijkstra(start, V, G)
{
    const heap = new Heap(start);
    const visited = new Array(V + 1);
    const dist = new Array(V + 1).fill(Infinity);
    dist[start] = 0;

    while (!heap.isEmpty())
    {
        [curdist, cur] = heap.pop();

        if (visited[cur]) continue;
        visited[cur] = true;

        for (let [next, d] of G[cur])
        {
            if (visited[next]) continue;
            if (curdist + d < dist[next])
            {
                dist[next] = curdist + d;
                heap.push([curdist + d, next]);
            }
        }
    }

    return dist;
}