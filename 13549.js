/*
다익스트라 알고리즘 사용
위치를 정점으로, 다음 위치까지 이동 시간을 가중치로
*/

// 최소 힙 구현
class Heap
{
    constructor(start)
    { // 힙에 저장하는 값은 [시간, 위치]
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
        for( i = this.size;
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

            if (2 * i <= this.size && this.list[2 * i][0] < last[0])
                c1 = this.list[2 * i][0];
            
            if (2 * i + 1 <= this.size && this.list[2 * i + 1][0] < last[0])
                c2 = this.list[2 * i + 1][0];

            if (c1 == Infinity && c2 == Infinity) break;

            let child = c1 > c2? 2 * i + 1 : 2 * i;
            this.list[i] = this.list[child];
            i = child;
        }
        
        if (!this.isEmpty()) this.list[i] = last;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [start, end] = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(Number);

// process
const h = new Heap(start);
const time = new Array(100001).fill(Infinity);
const visited = new Array(100001);
const maxPos = start < end? Math.abs(start - end) + end : start;
time[start] = 0;

while (!h.isEmpty())
{
    const [curtime, cur] = h.pop();

    if (cur === end) break;
    if (visited[cur]) continue;
    visited[cur] = true;

    for (let [next, t] of [[cur - 1, curtime + 1], [cur + 1, curtime + 1], [cur * 2, curtime]])
    {
        if (visited[next] || next < 0 || next > maxPos) continue;

        if (t < time[next])
        {
            time[next] = t;
            h.push([t, next]);
        }
    }
}

// output
console.log(time[end]);