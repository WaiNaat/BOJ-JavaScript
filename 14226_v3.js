/*
opt(i, j) := 현재 화면에 임티가 i개고, 클립보드에 j개가 저장돼있음
opt(i, j)가 주어졌을 때 총 세 가지를 바꿀 수 있다.
    opt(i, i) = opt(i, j) + 1        (1번 연산)
    opt(i+j, j) = opt(i, j) + 1      (2번 연산)
    opt(i-1, j) = opt(i, j) + 1      (3번 연산)

배열 채우는 순서?
    opt[1][1]부터 BFS로 위 점화식대로 방문.

bfs + 연산 한번에 하나씩 하는 방법으로 opt배열에 접근
    >> opt[i][j]에 맨 처음 저장되는 값이 곧 opt[i][j]의 최솟값.
*/

// Queue 구현
class Node
{
    constructor(display, clipboard)
    {
        this.display = display;
        this.clipboard = clipboard;
        this.next = null;
    }
}

class Queue
{
    constructor()
    {
        this.size = 0;
        this.first = null;
        this.last = null;
    }

    isEmpty()
    {
        return this.size == 0;
    }

    enqueue(display, clipboard)
    {
        let newNode = new Node(display, clipboard);

        if (this.size == 0)
        {
            this.first = newNode;
            this.last = newNode;
        }
        else
        {
            this.last.next = newNode;
            this.last = newNode;
        }
        
        this.size++;
    }

    dequeue()
    {
        if (this.size == 0) return [-1, -1];

        let display = this.first.display;
        let clipboard = this.first.clipboard;
        this.first = this.first.next;

        this.size--;
        if (this.size == 0)
            this.last = null;

        return [display, clipboard];
    }

    print()
    {
        if (this.size == 0)
        {
            console.log('empty\n');
            return;
        }

        for (let node=this.first; node!=null; node=node.next)
            console.log(`(${node.display}, ${node.clipboard})`);
        console.log('');        
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const S = parseInt(require('fs').readFileSync(inputFile).toString().trim());

// process
let opt = Array.from(Array(S + 1), () => new Array(S + 1).fill(Infinity));
let q = new Queue();
opt[1][1] = 1;
q.enqueue(1, 1);

while (!q.isEmpty())
{
    let [i, j] = q.dequeue();
    let val = opt[i][j] + 1;
    
    // 1번 연산
    if (opt[i][i] == Infinity)
    {
        opt[i][i] = val;
        q.enqueue(i, i);
    }

    // 2번 연산
    if (i + j <= S && opt[i + j][j] == Infinity)
    {
        opt[i + j][j] = val;
        q.enqueue(i + j, j);
    }

    // 3번 연산
    if (i > 1 && opt[i - 1][j] == Infinity)
    {
        opt[i - 1][j] = val;
        q.enqueue(i - 1, j);
    }
}

// output
console.log(Math.min(...opt[S]));