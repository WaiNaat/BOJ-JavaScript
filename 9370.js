// 틀렸습니다

/*
다익스트라로 계산
prev를 통해 경로 역추적
    단, 같은 거리지만 g-h경로가 있을 수 있으니까
    경로 업데이트 시 같은 거리인데 g-h가 있으면 업데이트, 아님 말고
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
        while (i < this.size)
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
let sol = []
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
    const heap = new Heap(s);
    const dist = new Array(V + 1).fill(Infinity);
    const visited = new Array(V + 1);
    const prev = new Array(V + 1);
    dist[s] = 0;

    // 다익스트라
    while (!heap.isEmpty())
    {
        [curdist, cur] = heap.pop();
        
        if (visited[cur]) continue;
        visited[cur] = true;

        for (const [next, d] of G[cur])
        {
            // 현재 gh 사이를 지났는지 파악
            let has_gh_path = false;
            if ((cur == g && prev[cur] == h)
                || (cur == h && prev[cur] == g))
                has_gh_path == true;
            
            if ((dist[cur] + d < dist[next]) || 
                (dist[cur] + d == dist[next] && !has_gh_path)
            )
            {
                dist[next] = dist[cur] + d;
                heap.push([dist[next], next]);
                prev[next] = cur;
            }
        }
    }

    // 후보들이 최단 이동 경로가 gh를 포함하고 있는지 파악
    let testcase_sol = [];

    for (let candidate of dest)
    {
        let backtrack = candidate;
        let has_gh_path;

        while (backtrack !== undefined)
        {
            if ((backtrack == g && prev[backtrack] == h) || (backtrack == h && prev[backtrack] == g))
                has_gh_path = true;
            backtrack = prev[backtrack];
        }

        if (has_gh_path)
            testcase_sol.push(candidate);
    }

    testcase_sol.sort((a, b) => a - b);
    sol.push(testcase_sol.join(' '));
}

// output
console.log(sol.join('\n'));