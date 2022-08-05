/*
그리디 기준:
    n시간까지 받는 컵라면이 항상 최대

기준을 만족하려면?
    각 시간마다 풀 수 있는 문제들 중
    가장 컵라면을 많이 주는걸 푼다.

모든 문제는 동시에 주어진다:
    데드라인 내림차순 정렬
    n일부터 1일까지 거꾸로 세서 해당 시간에 무엇을 풀지 결정
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
        this.list.push(0);
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
        let del = this.list[1];
        let val = this.list.pop();
        this.length--;

        let i = 1;
        while (i * 2 <= this.length)
        {
            let child = i * 2;
            if (child + 1 <= this.length && this.list[child] < this.list[child + 1])
                child++;

            if (val > this.list[child])
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

const N = Number(input[0]);
const problems = input.slice(1).map(x => x.trim().split(' ').map(Number));

// process
problems.sort((a, b) => (b[0] - a[0]));

const heap = new Heap();
let sol = 0;
let i = 0;

for (let time=N; time>0; time--)
{
    while (i < N && problems[i][0] == time)
        heap.push(problems[i++][1]);
    
    if (heap.length > 0)
        sol += heap.pop();
}

// output
console.log(sol);