/*
백트래킹으로 초기 활성바이러스 정하고
BFS로 시간 계산

모든 "빈 칸에" 바이러스가 퍼지는 시간 계산
*/

// 큐 대충 구현
class Queue
{
    constructor()
    {
        this.list = [];
        this.length = 0;
        this.first = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(row, col, time)
    {
        this.list.push([row, col, time]);
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return false;
        let del = this.list[this.first];
        this.first++;
        this.length--;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const lab = input.slice(1).map(line => line.trim().split(' ').map(Number));

// process
// 비활성 바이러스 위치 찾기
const sleeping_virus = [];
let empty_cnt = 0;
for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        if (lab[r][c] == 2)
        {
            sleeping_virus.push([r, c]);
        }
        else if (lab[r][c] == 0)
            empty_cnt++;
    }
}

// 비활성 바이러스 찾기 및 확산
let activated_virus = [];
let virus_name = 0;
let sol = Infinity;

activate(0, 0);

// output
console.log(sol === Infinity? -1 : sol);

// functions
function activate(depth, idx)
{
    if (depth === M)
    {
        virus_name--;
        let val = spread(virus_name);
        sol = Math.min(sol, val);
        return;
    }

    for (let i=idx; i<sleeping_virus.length; i++)
    {
        activated_virus.push(i);
        activate(depth + 1, i + 1);
        activated_virus.pop();
    }
}

function spread(virus_name)
{
    const directions = [[0, -1], [0, 1], [1, 0], [-1, 0]];

    const q = new Queue();
    for (let i of activated_virus)
        q.enqueue(... sleeping_virus[i], 0);

    let virus_cnt = 0;
    let time = 0;

    while (!q.isEmpty())
    {
        let [r, c, t] = q.dequeue();
        
        if (lab[r][c] === virus_name) continue;

        if (lab[r][c] != 2)
        {
            time = t;
            virus_cnt++;
        }
        lab[r][c] = virus_name;
        
        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;
            
            if (lab[r2][c2] != 1 && lab[r2][c2] != virus_name)
                q.enqueue(r2, c2, t + 1);
        }
    }
    
    for (let [r, c] of sleeping_virus)
        lab[r][c] = 2;
    
    if (virus_cnt < empty_cnt) return Infinity;
    else return time;
}