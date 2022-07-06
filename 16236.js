/*
bfs로 가장 가까운 먹이를 찾을 수 있음
여러 개면 조건에 맞도록 정렬해서 선택

큐 크기는 최대 400이니까 연결리스트가 아니라
배열을 이용해서 간단하게 구현하는걸로 대체
*/

// 큐 대충 구현
class Queue
{
    constructor()
    {
        this.list = [];
        this.length = 0;
        this.front = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(value)
    {
        this.list.push(value);
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return false;

        const del = this.list[this.front];
        this.front++;
        this.length--;
        return del;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const area = [];
for (let i=1; i<=N; i++)
    area.push(input[i].trim().split(' ').map(Number));

// process
// 아기상어 초기위치
let shark_r, shark_c;
for (let r=0; r<N; r++)
{
    for (let c=0; c<N; c++)
    {
        if (area[r][c] === 9)
        {
            shark_r = r;
            shark_c = c;
            area[r][c] = 0;
        }
    }
}

// bfs 진행
let time = 0;
let shark_size = 2;
let finished = false;
let eat_cnt = 0;

while (!finished)
{
    let [r, c, t, eat] = BFS(shark_r, shark_c, shark_size);

    time += t;
    // 먹기 성공
    if (eat)
    {
        eat_cnt++;
        area[r][c] = 0;

        if (eat_cnt === shark_size)
        {
            shark_size++;
            eat_cnt = 0;
        }

        shark_r = r;
        shark_c = c;
    }
    // 먹기 실패
    else
        finished = true;
}

// output
console.log(time);

// functions
function BFS(r, c, shark_size)
{
    const q = new Queue();
    const visited = Array.from(new Array(N), () => new Array(N));
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    const food = [];
    let food_time = Infinity;
    q.enqueue([r, c, 0]); // [row, col, time]

    while (!q.isEmpty())
    {
        let [r, c, t] = q.dequeue();

        if (t > food_time) break;

        if (visited[r][c]) continue;
        visited[r][c] = true;

        // 먹을 수 있는지 확인
        if (0 < area[r][c] && area[r][c] < shark_size)
        {
            food.push([r, c]);
            food_time = t;
        }

        // 주변 둘러보고 이동
        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
                continue;

            if (area[r2][c2] <= shark_size)
                q.enqueue([r2, c2, t + 1]);
        }
    }

    // 음식 선정
    if (food.length === 0)
        return [r, c, 0, false];
    else if (food.length > 1)
        food.sort((x, y) => (x[0] * 100 + x[1]) - (y[0] * 100 + y[1]));
        
    return [food[0][0], food[0][1], food_time, true];
}