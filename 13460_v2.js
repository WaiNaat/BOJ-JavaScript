/*
상하좌우 기울였을 때 두 구슬의 위치를 계산하는 함수 구현
    구현 시 빨간공 파란공 안겹치는거 확실하게 하기
    누가 먼저 움직일지 모르니까 빨>파>빨 순서로 움직이기

최대 깊이 10의 백트래킹으로 경우의 수 계산
    base case: 구멍에 공이 빠졌을 때 또는 재귀 깊이가 11 이상일 때

state
    0: 특별한 사건 없음
    1: 빨간 구슬이 구멍에 들어감
    2: 파란 구슬이 구멍에 들어감
*/

// 큐 구현
class Node
{
    constructor(turn, state, red, blue)
    {
        this.turn = turn;
        this.state = state;
        this.red = red;
        this.blue = blue;
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

    enqueue(turn, state, red, blue)
    {
        const newNode = new Node(turn, state, red, blue);

        if (this.length === 0)
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
        if (this.isEmpty()) return [-1, -1, -1, -1];

        const ret = [this.first.turn, this.first.state, this.first.red, this.first.blue];

        this.first = this.first.next;
        this.length--;

        if (this.isEmpty())
        {
            this.first = null;
            this.last = null;
        }

        return ret;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [row, col] = input[0].trim().split(' ').map(Number);
const board = [];
for (let i=1; i<=row; i++)
    board.push(input[i].split(''));

// process
let sol = -1;
let blue_initial, red_initial;
// 파란공 빨간공 초기위치 검색
for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (board[r][c] === 'R')
        {
            red_initial = [r, c];
            board[r][c] = '.';
        }
        else if (board[r][c] == 'B')
        {
            blue_initial = [r, c];
            board[r][c] = '.';
        }
    }
}

// BFS
const q = new Queue();
q.enqueue(0, 0, red_initial, blue_initial);

while (!q.isEmpty())
{
    const [turn, cur_state, red_cur, blue_cur] = q.dequeue();

    // base case
    if (turn > 10) break;
    if (cur_state === 1)
    {
        sol = turn;
        break;
    }
    else if (cur_state === 2)
        continue;

    // 4방향 이동시켜 보고 큐에 넣음
    let state, red_next, blue_next;
    for (let func of [lean_left, lean_right, lean_up, lean_down])
    {
        // 두 공 제자리에 위치시킴
        board[red_cur[0]][red_cur[1]] = 'R';
        board[blue_cur[0]][blue_cur[1]] = 'B';

        // 움직임
        [state, red_next, blue_next] = func(red_cur, blue_cur);
        
        // 큐에 삽입: 단, 움직임이 있었을 경우에만
        if (state != 0 || is_different(red_cur, red_next) || is_different(blue_cur, blue_next))
            q.enqueue(turn + 1, state, red_next, blue_next);

        // 움직임 취소
        board[red_next[0]][red_next[1]] = '.';
        board[blue_next[0]][blue_next[1]] = '.';
    }
}

// output
console.log(sol === Infinity? -1 : sol);

// functions
function is_different(cur, next)
{
    if (cur[0] != next[0] || cur[1] != next[1]) return true;
    return false;
}

function lean_left(red, blue)
{
    let r, c, red_next, blue_next, state = 0;
    // 빨강 왼쪽으로
    r = red[0];
    for (c=red[1]; c>0 && board[r][c-1]=='.'; c--)
    {
        board[r][c - 1] = board[r][c];
        board[r][c] = '.';
    }
    // 빨간 공이 구멍에 빠지는지 확인
    if (board[r][c - 1] === 'O')
    {
        state = 1;
        board[r][c] = '.';
    }
    red_next = [r, c];
    // 파랑 왼쪽으로
    r = blue[0];
    for (c=blue[1]; c>0 && board[r][c-1]=='.'; c--)
    {
        board[r][c - 1] = board[r][c];
        board[r][c] = '.';
    }
    // 파란 공이 구멍에 빠지는지 확인
    if (board[r][c - 1] === 'O')
        return [2, red_next, [r, c]]
    blue_next = [r, c];
    // 빨강 왼쪽으로
    r = red_next[0];
    for (c=red_next[1]; c>0 && board[r][c-1]=='.'; c--)
    {
        board[r][c - 1] = board[r][c];
        board[r][c] = '.';
    }
    red_next = [r, c];

    return [state, red_next, blue_next];
}

function lean_right(red, blue)
{
    let r, c, red_next, blue_next, state = 0;
    // 빨강 오른쪽
    r = red[0];
    for (c=red[1]; c+1<col && board[r][c+1]=='.'; c++)
    {
        board[r][c + 1] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r][c + 1] === 'O')
    {
        state = 1;
        board[r][c] = '.';
    }
    red_next = [r, c];
    // 파랑 오른쪽
    r = blue[0];
    for (c=blue[1]; c+1<col && board[r][c+1]=='.'; c++)
    {
        board[r][c + 1] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r][c + 1] === 'O')
        return [2, red_next, [r, c]]
    blue_next = [r, c];
    // 빨강 오른쪽
    r = red_next[0];
    for (c=red_next[1]; c+1<col && board[r][c+1]=='.'; c++)
    {
        board[r][c + 1] = board[r][c];
        board[r][c] = '.';
    }
    red_next = [r, c];

    return [state, red_next, blue_next];
}

function lean_up(red, blue)
{
    let r, c, red_next, blue_next, state = 0;
    // 빨강 위쪽
    c = red[1];
    for (r=red[0]; r>0 && board[r-1][c]=='.'; r--)
    {
        board[r - 1][c] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r - 1][c] === 'O')
    {
        state = 1;
        board[r][c] = '.';
    }
    red_next = [r, c];
    // 파랑 위쪽
    c = blue[1];
    for (r=blue[0]; r>0 && board[r-1][c]=='.'; r--)
    {
        board[r - 1][c] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r - 1][c] === 'O')
        return [2, red_next, [r, c]]
    blue_next = [r, c];
    // 빨강 위쪽
    c = red_next[1];
    for (r=red_next[0]; r>0 && board[r-1][c]=='.'; r--)
    {
        board[r - 1][c] = board[r][c];
        board[r][c] = '.';
    }
    red_next = [r, c];

    return [state, red_next, blue_next];
}

function lean_down(red, blue)
{
    let r, c, red_next, blue_next, state = 0;
    // 빨강 아래쪽
    c = red[1];
    for (r=red[0]; r+1<row && board[r+1][c]=='.'; r++)
    {
        board[r + 1][c] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r + 1][c] === 'O')
    {
        state = 1;
        board[r][c] = '.';
    }
    red_next = [r, c];
    // 파랑 아래쪽
    c = blue[1];
    for (r=blue[0]; r+1<row && board[r+1][c]=='.'; r++)
    {
        board[r + 1][c] = board[r][c];
        board[r][c] = '.';
    }
    if (board[r + 1][c] === 'O')
        return [2, red_next, [r, c]]
    blue_next = [r, c];
    // 빨강 아래쪽
    c = red_next[1];
    for (r=red_next[0]; r+1<row && board[r+1][c]=='.'; r++)
    {
        board[r + 1][c] = board[r][c];
        board[r][c] = '.';
    }
    red_next = [r, c];

    return [state, red_next, blue_next];
}