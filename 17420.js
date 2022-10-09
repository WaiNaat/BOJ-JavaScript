/// 시간 초과 ///

/*
항상 기한이 가장 적게 남은것만 쓸수있음
>> 써야 할 때 자기보다 기한이 적게 남은애들이 있으면 안됨
>> 그런 애들은 전부 기한을 늘려야 함

기프티콘을 힙에 넣는다 (남은기한, 사용계획)
사용계획을 오름차순으로 정렬한다

현재 i일차에 사용할 사용계획을 보고있다고 할때
힙 꼭대기 깊콘의 사용계획 != i 이면 꺼내서 기한연장 후 다시 힙에 넣는다
*/
// 힙 구현
class Heap
{
    constructor()
    {
        this.list = [undefined];
        this.length = 0;
    }

    _is_smaller(x, y)
    {
        if (x[0] < y[0])
            return true;
        else if (x[0] > y[0])
            return false;
        else if (x[1] < y[1])
            return true;
        else
            return false;
    }

    push(val)
    {
        this.length++;
        this.list.push(val);

        let i = this.length;
        for (i = this.length;
             i > 1 && this._is_smaller(val, this.list[parseInt(i / 2)]);
             i = parseInt(i / 2))
        {
            this.list[i] = this.list[parseInt(i / 2)];
        }
        this.list[i] = val;
    }

    pop()
    {
        const [a, b] = this.list[1];
        this.length--;
        const last = this.list.pop();
        
        if (this.length == 0)
            return [a, b];

        let i = 1;
        while (i * 2 <= this.length)
        {
            let c1 = this.list[i * 2];
            let c2 = i * 2 + 1 <= this.length? this.list[i * 2 + 1] : [Infinity, Infinity];
            
            let child;
            if (this._is_smaller(c1, c2))
                child = i * 2;
            else
                child = i * 2 + 1;
            
            if (this._is_smaller(last, this.list[child]))
                break;
            
            this.list[i] = this.list[child];
            i = child;
        }

        this.list[i] = last;

        return [a, b];
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[N], [...A], [...B]] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => x.trim().split(' ').map(Number));

// process
h = new Heap();
for (let i=0; i<N; i++)
    h.push([A[i], B[i]]);

B.sort((a, b) => a - b);

let cnt = 0;
for (let day of B)
{
    let [a, b] = h.pop();
    
    while (b != day || a < day)
    {
        h.push([a + 30, b]);
        cnt++;
        [a, b] = h.pop();
    }
}

// output
console.log(cnt);