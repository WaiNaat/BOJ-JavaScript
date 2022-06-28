/*
보드를 만들고 사과를 위치시킴
큐로 뱀 몸통들의 좌표를 저장함
초 단위 시뮬레이션 구현
*/

// 큐 구햔
class Node
{
    constructor(row, col)
    {
        this.row = row;
        this.col = col;
        this.next = null;
    }
}

class Queue
{
    constructor()
    {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    isEmpty()
    {
        return this.length === 0;
    }

    enqueue(row, col)
    {
        const newNode = new Node(row, col);

        if (this.isEmpty())
        {
            this.first = newNode;
            this.last = newNode;
        }
        else
        {
            this.last.next = newNode;
            this.last = newNode;
        }
        
        this.length++;
    }

    dequeue()
    {
        if (this.isEmpty()) return [-1, -1];
        const ret = [this.first.row, this.first.col];

        this.first = this.first.next;
        this.length--;

        if (this.isEmpty())
            this.last = null;
        
        return ret;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);

const board = Array.from(new Array(N), () => new Array(N).fill(0)); // 빈 공간은 0으로 표시
for (let i=2; i<2+K; i++)
{
    const [appleR, appleC] = input[i].trim().split(' ').map(x => Number(x) - 1);
    board[appleR][appleC] = 1; // 사과는 1로 표시
}

const L = Number(input[2 + K]);
const direction_change_info = [];
for (let i=3+K; i<3+K+L; i++)
{
    let [X, C] = input[i].trim().split(' ');
    X = Number(X);
    direction_change_info.push([X, C]);
}

// process
// 뱀 위치 관련 변수
let r = 0;
let c = 0;
const snake = new Queue();
snake.enqueue(0, 0);

// 방향전환 관련 변수
let direction = 1; // 방향: 0123 상우하좌
const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let next_direction_change_time = direction_change_info[0][0];
let direction_change_idx = 0;
let [dr, dc] = move[direction];

// 이동 시작
let time;
board[0][0] = 2;

for (time = 1; true; time++)
{
    // 다음 칸 확인
    let r2 = r + dr;
    let c2 = c + dc;

    // 다음 칸이 벽 또는 본인 몸통일 경우 종료
    if (!(0 <= r2 && r2 < N && 0 <= c2 && c2 < N) || board[r2][c2] === 2)
        break;

    // 다음 칸에 사과가 없을 경우 몸통 줄임
    if (board[r2][c2] === 0)
    {
        let [endR, endC] = snake.dequeue();
        board[endR][endC] = 0;
    }

    // 몸길이 늘림
    board[r2][c2] = 2; // 몸통은 2로 표현
    snake.enqueue(r2, c2);
    r = r2;
    c = c2;

    // 방향전환이 있는지 확인
    if (time === next_direction_change_time)
    {
        if (direction_change_info[direction_change_idx][1] === 'L')
            direction = (direction + 3) % 4;
        else
            direction = (direction + 1) % 4;
        
        [dr, dc] = move[direction];

        direction_change_idx++;
        if (direction_change_idx >= L)
            next_direction_change_time = -1;
        else
            next_direction_change_time = direction_change_info[direction_change_idx][0];
    }
}

// output
console.log(time);