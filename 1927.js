// heap
class Heap
{
    constructor()
    {
        this.list = [undefined];
        this.size = 0;
    }

    push(value)
    {
        this.list.push(value);
        this.size++;

        let i;
        for(i = this.size; 
            i != 1 && value < this.list[Math.floor(i / 2)]; 
            i = Math.floor(i / 2)
        )
            this.list[i] = this.list[Math.floor(i / 2)];

        this.list[i] = value;
    }

    pop()
    {
        if (this.size === 0) return 0;

        const del = this.list[1];
        const val = this.list.pop();
        this.size--;

        let i = 1;
        let child;
        while (i <= this.size)
        {
            let c1 = Infinity;
            let c2 = Infinity;
            // 왼쪽 자식이 본인보다 작은지 확인
            child = 2 * i;
            if (child <= this.size && val > this.list[child])
                c1 = this.list[child];
            // 오른쪽 자식이 본인보다 작은지 확인
            child++;
            if (child <= this.size && val > this.list[child])
                c2 = this.list[child];
            
            // 본인이 제일 작으면 루프 탈출
            if (c1 == Infinity && c2 == Infinity) break;
            
            // 두 자식 중 더 작은 자식과 교체
            if (c1 <= c2) child--;
            this.list[i] = this.list[child];
            i = child;
        }

        this.list[i] = val;

        return del;
    }
}

// input
const inputFile = process.platform ==='linux'? '/dev/stdin' : './input';
const [N, ... oper] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(Number);

// process
let sol = [];
let h = new Heap();
for (let o of oper)
{
    if (o === 0)
        sol.push(h.pop());
    else
        h.push(o);
}

// output
if (sol.length > 0) console.log(sol.join('\n'));