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

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [row, col] = input[0].trim().split(' ').map(Number);
const board = [];
for (let i=1; i<=row; i++)
    board.push(input[i].split(''));

// process
let sol = Infinity;
let blue_initial, red_initial;
// 파란공 빨간공 초기위치 검색
for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (board[r][c] === 'R')
            red_initial = [r, c];
        else if (board[r][c] == 'B')
            blue_initial = [r, c];
    }
}

play(1, red_initial, blue_initial);

// output
console.log(sol === Infinity? -1 : sol);

// functions
function play(turn, red_cur, blue_cur)
{
    if (turn > 10) return;

    let state, red_next, blue_next;

    for (let func of [lean_left, lean_right, lean_up, lean_down])
    {
        // 움직임
        [state, red_next, blue_next] = func(red_cur, blue_cur);

        // 아무 일도 없었으면 재귀
        if (state === 0)
            play(turn + 1, red_next, blue_next);
        // 빨간 공이 들어갔으면 성공
        else if (state === 1)
            sol = Math.min(sol, turn);

        // 움직임 취소
        board[red_next[0]][red_next[1]] = '.';
        board[blue_next[0]][blue_next[1]] = '.';
        board[red_cur[0]][red_cur[1]] = 'R';
        board[blue_cur[0]][blue_cur[1]] = 'B';
    }
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