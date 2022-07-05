/*
핵심: BFS 1회당 하나의 '연합'을 구할 수 있다.

visited 배열에 각 나라가 몇 번 연합인지 저장
모든 칸들에 대해 bfs 돌려서 각 칸이 몇 번 연합 소속인지 찾고
visited 돌면서 다시 인구할당 진행
만약에 연합 개수가 N^2개면 더 이상 인구이동 없는거임
*/

// 큐 구현
class Node
{
    constructor(row, col)
    {
        this.row = row;
        this.col = col;
        this.next = null;
    }
}

class Queue
{
    constructor()
    {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(row, col)
    {
        const newNode = new Node(row, col);
        if (this.isEmpty())
        {
            this.first = newNode;
            this.last = newNode;
        }
        else
        {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return [-1, -1];
        const ret = [this.first.row, this.first.col];
        this.length--;
        if (this.isEmpty())
        {
            this.first = null;
            this.last = null;
        }
        else
            this.first = this.first.next;
        return ret;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [N, L, R] = input[0].trim().split(' ').map(Number);
const land = [];
for (let i=1; i<=N; i++)
    land.push(input[i].trim().split(' ').map(Number));

// process
let day = 0;
let finished = false;
while (!finished)
{
    day++;
    const visited = Array.from(new Array(N), () => new Array(N).fill(0));
    let union_name = 0;
    const union_population = [undefined];

    // 연합 할당
    for (let r=0; r<N; r++)
    {
        for (let c=0; c<N; c++)
        {
            if (visited[r][c] > 0) continue;
            union_name++;
            union_population.push(BFS(r, c, union_name, visited));
        }
    }

    // 인구 이동
    if (union_name < N * N)
    {
        for (let r=0; r<N; r++)
        {
            for (let c=0; c<N; c++)
                land[r][c] = union_population[visited[r][c]];
        }
    }
    else
    {
        finished = true;
        day--;
    }
}

// output
console.log(day)

// functions
function BFS(row, col, union_name, visited)
{
    let population = 0;
    let nations = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const q = new Queue();
    q.enqueue(row, col);

    while (!q.isEmpty())
    {
        let [r, c] = q.dequeue();

        if (visited[r][c] > 0) continue;

        visited[r][c] = union_name;
        nations++;
        population += land[r][c];

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;
            
            if (visited[r2][c2] === 0 && can_open_border(r, c, r2, c2))
                q.enqueue(r2, c2);
        }
    }

    return Math.floor(population / nations);
}

function can_open_border(r, c, r2, c2)
{
    let diff = Math.abs(land[r][c] - land[r2][c2]);
    if (L <= diff && diff <= R)
        return true;
    return false;
}