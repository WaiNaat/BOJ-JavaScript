/*
백트래킹으로 궁수 위치 정하기
bfs로 궁수 사거리 안쪽의 적 찾을 수 있음
*/

// 큐 대충 구현
class Queue
{
    constructor()
    {
        this.list = [];
        this.first = 0;
        this.length = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(val)
    {
        this.list.push(val);
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return false;
        let val = this.list[this.first++];
        this.length--;
        return val;
    }
}

// constant
const directions = [[0, -1], [-1, 0], [0, 1]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, D] = input[0].trim().split(' ').map(Number);
const grid = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
let sol = 0;
const archer = [];
set_archer(0);

// output
console.log(sol);

// functions
function set_archer(idx)
{
    // base case
    if (archer.length === 3)
    {
        sol = Math.max(play_game(), sol);
        return;
    }

    // recursive step
    for (let i=idx; i<col; i++)
    {
        archer.push(i);
        set_archer(i + 1);
        archer.pop();
    }
}

function play_game()
{
    let cnt = 0;
    let tmp_grid = Array.from(grid, row => Array.from(row));
    
    for (let wall=row-1; wall>=0; wall--)
    {
        // 궁수별로 쏠 적 찾기
        let enemy = [];
        for (let a of archer)
        {
            let e = bfs(wall, a, tmp_grid);
            if (e) enemy.push(e);
        }

        // 사격
        for (let [r, c] of enemy)
        {
            if (tmp_grid[r][c] == 1)
            {
                tmp_grid[r][c] = 0;
                cnt++;
            }
        }

        // 적 이동
        for (let c=0; c<col; c++)
        {
            if (tmp_grid[wall][c] == 1)
                tmp_grid[wall][c] = 0;
        }
    }

    return cnt;
}

function bfs(r, c, grid)
{
    const q = new Queue();
    const visited = Array.from(new Array(row), () => new Array(col));

    q.enqueue([r, c, 1]);

    while (!q.isEmpty())
    {
        let [r, c, d] = q.dequeue();

        if (visited[r][c]) continue;
        if (d > D) return false;

        visited[r][c] = true;
        if (grid[r][c] == 1)
            return [r, c];
        
        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || 0 > c2 || c2 >= col) continue;

            if (!visited[r2][c2])
                q.enqueue([r2, c2, d + 1]);
        }
    }

    return false;
}