/*
[a, b]쌍들을 a 오름차순으로 정렬
책도 오름차순으로 정렬

책 나눠주는 방식
현재 나눠줄 책의 번호가 i라고 할때
a <= i 인 사람들의 b값을 전부 최소 힙에 넣음
최소 힙의 꼭대기 값 < i 면 그런 값들은 전부 꺼냄
최소 힙의 꼭대기 사람을 뽑아서 i번 책을 나눠줌
*/

// 최소 힙 구현
class Heap
{
    constructor()
    {
        this.list = [undefined];
        this.length = 0;
    }

    push(val)
    {
        this.list.push(0);
        this.length++;

        let i;
        for (i = this.length;
             i > 1 && val < this.list[Math.floor(i / 2)];
             i = Math.floor(i / 2))
            this.list[i] = this.list[Math.floor(i / 2)];

        this.list[i] = val;
    }

    pop()
    {
        let del = this.list[1];
        let val = this.list.pop();
        this.length--;

        let i = 1;
        while (i * 2 <= this.length)
        {
            let child = i * 2;
            
            if (child + 1 <= this.length && this.list[child] > this.list[child + 1])
                child++;
            
            if (val < this.list[child])
                break;
            
            this.list[i] = this.list[child];
            i = child;
        }

        if (this.length > 0)
            this.list[i] = val;

        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const TEST = Number(input[0]);

const sol = [];
let i = 1;
for (let t=0; t<TEST; t++)
{
    const [N, M] = input[i++].split(' ').map(Number);
    const applications = input.slice(i, i + M).map(x => x.trim().split(' ').map(Number));
    i += M;

    // process
    // 정렬
    applications.sort((a, b) => a[0] - b[0]);
    
    // 계산
    let cnt = 0;
    let j = 0;
    const heap = new Heap();
    for (let book=1; book<=N; book++)
    {
        while (j < M && applications[j][0] <= book)
            heap.push(applications[j++][1]);

        let b = 0;
        while (heap.length > 0 && b < book)
            b = heap.pop();

        if (b >= book) cnt++;
    }

    sol.push(cnt);
}

// output
console.log(sol.join('\n'));