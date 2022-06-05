// heap 구현
class Heap
{
    constructor(size, start)
    {
        /*
        다익스트라 전용 초기화:
            목적지까지 거리를 모름 -> 전부 무한대로 설정
            시작점~시작점 거리는 0
        
        힙에 들어가는 값: [거리, 정점 이름]
        */
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

const [V, E] = input[0].split(' ').map(Number);
const start = Number(input[1]);
let G = Array.from(new Array(V + 1), () => []);
for (let i=2; i<=E+1; i++)
{
    let [v1, v2, dist] = input[i].split(' ').map(Number);
    G[v1].push([v2, dist]);
}

// process
let result = dijkstra(start).map(x => x === Infinity? 'INF' : x);

// output
console.log(result.join('\n'));

// function
function dijkstra(start)
{
    let visited = new Array(V + 1);
    let h = new Heap(V, start);
    let dist = new Array(V + 1).fill(Infinity);
    dist[start] = 0;

    while (!h.isEmpty())
    {
        let [_, cur] = h.pop();

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
    
    return dist.slice(1, );
}