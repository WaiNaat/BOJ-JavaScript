/*
위상 정렬 문제
순서를 정하는 게 불가능할 경우도 고려
*/
// 큐 구현
class Node
{
    constructor(value)
    {
        this.value = value;
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

    enqueue(value)
    {
        let node = new Node(value);

        if (this.length == 0)
        {
            this.first = node;
            this.last = node;
        }
        else
        {
            this.last.next = node;
            this.last = node;
        }

        this.length++;
    }

    dequeue()
    {
        let ret = this.first.value;

        this.first = this.first.next;
        this.length--;

        if (this.length == 0)
            this.last = null;

        return ret;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[N, M], ... orders] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => x.split(' ').map(Number));

// process
// 그래프 만들기
const child = Array.from(new Array(N + 1), () => []);
const parent_cnt = new Array(N + 1).fill(0);

for (let order of orders)
{
    for (let i=1; i<order.length-1; i++)
    {
        child[order[i]].push(order[i + 1]);
        parent_cnt[order[i + 1]]++;
    }
}

// 위상 정렬
const q = new Queue();
const visited = new Array(N + 1);
const sol = [];

for (let singer=1; singer<=N; singer++)
{
    if (parent_cnt[singer] == 0)
        q.enqueue(singer);
}

while (q.length > 0)
{
    let cur = q.dequeue();

    if (visited[cur]) continue;
    sol.push(cur);

    for (let next of child[cur])
    {
        parent_cnt[next]--;
        if (parent_cnt[next] == 0 && !visited[next])
            q.enqueue(next);
    }
}

// output
console.log(sol.length == N? sol.join('\n') : 0);