/*
남은 사용횟수가 가장 적은 플러그를 뺀다 <<< 틀렸습니다

남은 사용횟수가 가장 적은 플러그를 빼되
같을 경우 제품번호가 가장 작은 걸 뺀다 <<< 틀렸습니다

꽂혀 있는 플러그들 중 다음 사용하는 시점이 가장 나중인 걸 뽑는다
*/

// 힙 구현
class Heap
{
    constructor(compareFn)
    {
        this.list = [undefined];
        this.length = 0;
        this.compare = compareFn;
    }

    push(val) // [다음 사용 시점, 제품번호]
    {
        this.list.push(val);
        this.length++;

        let i;
        for (i = this.length;
             i != 1 && this.compare(val, this.list[Math.floor(i / 2)]);
             i = Math.floor(i / 2))
             this.list[i] = this.list[Math.floor(i / 2)];

        this.list[i] = val;
    }

    pop()
    {
        if (this.length == 0) return [-1, -1];

        let del = this.list[1];
        let val = this.list.pop();
        this.length--;

        let i = 1;
        let child;
        while (i <= this.length)
        {
            let c1 = [-Infinity, Infinity];
            let c2 = [-Infinity, Infinity];

            child = i * 2;
            if (child <= this.length && !this.compare(val, this.list[child]))
                c1 = this.list[child];
            
            child++;
            if (child <= this.length && !this.compare(val, this.list[child]))
                c2 = this.list[child];
            
            if (c1[0] == -Infinity && c2[0] == -Infinity)
                break;

            if (this.compare(c1, c2)) child--;
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
const [N, K, ... device] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
// 각 전기용품의 사용 시점 세기
const next_use = Array.from(new Array(K + 1), () => [Infinity]);
for (let i=K-1; i>=0; i--)
    next_use[device[i]].push(i);

// 멀티탭 사용
const heap = new Heap(function(a, b){
    if (a[0] != b[0])
        return a[0] > b[0]? true : false;
    else
        return a[1] <= b[1]? true : false;
});
const power_strip = new Set();
let sol = 0;

for (let d of device)
{
    next_use[d].pop();
    let next = next_use[d][next_use[d].length - 1];
    
    if (!power_strip.has(d))
    {
        if (power_strip.size < N)
            power_strip.add(d);
        else
        {
            let [_, d2] = heap.pop();
            while (heap.length > 0 && !power_strip.has(d2))
                [_, d2] = heap.pop();
            
            sol++;
            power_strip.delete(d2);
            power_strip.add(d);
        }
    }
    
    heap.push([next, d]);
}

// output
console.log(sol);