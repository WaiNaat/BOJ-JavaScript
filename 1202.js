/*
그리디
가방별로 본인이 담을 수 있는 최대 가치의 보석 하나를 담음
큰 가방에 작은 보석이 들어가는 걸 방지하기 위해 작은 가방부터 채움

보석을 무게 오름차순으로 정렬
가방을 무게 오름차순으로 정렬

모든 가방을 채울 때까지 반복
    가방 무게 이하의 보석들을 전부 힙에 넣음
    힙 꼭대기의 보석을 가방에 넣음
*/

// 최대 힙 구현
class Heap
{
    constructor()
    {
        this.list = [undefined];
        this.length = 0;
    }

    push(val)
    {
        this.list.push(val);
        this.length++;

        let i;
        for (i = this.length;
            i != 1 && val > this.list[Math.floor(i / 2)];
            i = Math.floor(i / 2))
            this.list[i] = this.list[Math.floor(i / 2)];

        this.list[i] = val;
    }

    pop()
    {
        if (this.length == 0) return 0;

        let del = this.list[1];
        let val = this.list.pop();
        this.length--;

        let i = 1;
        while (i <= this.length)
        {
            let c1 = -Infinity;
            let c2 = -Infinity;

            // 왼쪽 자식
            let child = i * 2;
            if (child <= this.length && val < this.list[child])
                c1 = this.list[child];

            // 오른쪽 자식
            child++;
            if (child <= this.length && val < this.list[child])
                c2 = this.list[child];

            // 본인이 제일 클 경우 종료
            if (c1 == -Infinity && c2 == -Infinity)
                break;

            // 더 큰 자식과 교체
            if (c1 >= c2) child--;
            this.list[i] = this.list[child];
            i = child;
        }

        if (this.length > 0) this.list[i] = val;

        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [N, K] = input[0].trim().split(' ').map(Number);
const jewel = [];
for (let i=1; i<1+N; i++)
    jewel.push(input[i].trim().split(' ').map(Number));
const C = [];
for (let i=1+N; i<1+N+K; i++)
    C.push(Number(input[i]));

// process
// 정렬
jewel.sort((a, b) => a[0] - b[0]);
C.sort((a, b) => a - b);

// 가방 채우기
let jewel_idx = 0;
let sol = 0;
const heap = new Heap();

for (let c of C)
{
    // 가방 무게 이하의 보석을 힙에 넣음
    while (jewel_idx < N && jewel[jewel_idx][0] <= c)
        heap.push(jewel[jewel_idx++][1]);

    // 가장 비싼 보석을 가방에 넣음
    if (heap.length > 0)
        sol += heap.pop();
}

// output
console.log(sol);