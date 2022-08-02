/*
그리디
각 날에 할 수 있는 강연들 중 가장 돈 많이 주는거

강연을 날짜 오름차순으로 정렬
날짜를 하나씩 줄이면서
    해당 날에 마감인 강연을 배열에서 pop하고 강연료를 힙에 넣음
    힙에서 최대 강연료인 강연을 뽑아서 진행
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
        this.list.push(undefined);
        this.length++;

        let i;
        for (i = this.length;
             i > 1 && val > this.list[Math.floor(i / 2)];
             i = Math.floor(i / 2))
            this.list[i] = this.list[Math.floor(i / 2)];
        
        this.list[i] = val;
    }

    pop()
    {
        const del = this.list[1];
        const val = this.list.pop();
        this.length--;

        let i = 1;
        while (i <= this.length)
        {
            let c1 = -Infinity;
            let c2 = -Infinity;

            let child = i * 2;
            if (child <= this.length && val < this.list[child])
                c1 = this.list[child];
            
            child++;
            if (child <= this.length && val < this.list[child])
                c2 = this.list[child];

            if (c1 === -Infinity && c2 === -Infinity)
                break;
            
            if (c1 >= c2) child--;
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
const N = Number(input[0]);
const lectures = input.slice(1).map(x => x.trim().split(' ').map(Number));

// process
lectures.sort((a, b) => a[1] - b[1]);

const heap = new Heap();
let sol = 0;

if (N > 0)
{
    for (let day=lectures[N-1][1]; day>0; day--)
    {
        while (lectures.length > 0 && lectures[lectures.length - 1][1] === day)
            heap.push(lectures.pop()[0]);
    
        if (heap.length > 0)
            sol += heap.pop();
    }
}

// output
console.log(sol);