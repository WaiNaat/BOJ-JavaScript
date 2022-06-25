/*
움직임 순서
    일단 방향 맞춰서 빈틈없이 몰아넣음
    같은애들 있으면 합쳐줌
    다시 방향 맞춰서 빈틈없이 몰아넣음
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const N = Number(input[0]);
const initial_board = [];
for (let i=1; i<=N; i++)
    initial_board.push(input[i].split(' ').map(Number));

// process
let sol = 0;
for (let i=0; i<N; i++)
{
    for (let j=0; j<N; j++)
        sol = Math.max(sol, initial_board[i][j]);
}

move(0, initial_board);

// output
console.log(sol);

// functions
function move(move_cnt, board)
{
    if (move_cnt === 5) return;

    move(move_cnt + 1, moveLeft(board));
    move(move_cnt + 1, moveRight(board));
    move(move_cnt + 1, moveUp(board));
    move(move_cnt + 1, moveDown(board));
}

function moveLeft(board)
{
    let ret = [];
    for (let i=0; i<N; i++)
        ret.push(Array.from(board[i]));

    // 일단 왼쪽 끝으로 민다
    for (let r=0; r<N; r++)
    {
        for (let c=1; c<N; c++)
        {
            for (let idx=c; idx>0 && ret[r][idx - 1]==0 ; idx--)
            {
                ret[r][idx - 1] = ret[r][idx];
                ret[r][idx] = 0;
            }
        }
    }

    // 합친다
    for (let r=0; r<N; r++)
    {
        for (let c=1; c<N; c++)
        {
            if (ret[r][c] == ret[r][c - 1])
            {
                sol = Math.max(sol, ret[r][c] * 2);
                ret[r][c - 1] += ret[r][c];
                ret[r][c] = 0;
            }
        }
    }

    // 다시 왼쪽 끝으로 민다
    for (let r=0; r<N; r++)
    {
        for (let c=1; c<N; c++)
        {
            for (let idx=c; idx>0 && ret[r][idx - 1]==0 ; idx--)
            {
                ret[r][idx - 1] = ret[r][idx];
                ret[r][idx] = 0;
            }
        }
    }

    return ret;
}

function moveRight(board)
{
    let ret = [];
    for (let i=0; i<N; i++)
        ret.push(Array.from(board[i]));

    // 오른쪽으로 밀기
    for (let r=0; r<N; r++)
    {
        for (let c=N-2; c>=0; c--)
        {
            for (let idx=c; idx+1<N && ret[r][idx + 1]==0; idx++)
            {
                ret[r][idx + 1] = ret[r][idx];
                ret[r][idx] = 0;
            }
        }
    }
    // 합치기
    for (let r=0; r<N; r++)
    {
        for (let c=N-2; c>=0; c--)
        {
            if (ret[r][c] == ret[r][c + 1])
            {
                sol = Math.max(sol, ret[r][c] * 2);
                ret[r][c + 1] += ret[r][c];
                ret[r][c] = 0;
            }
        }
    }
    // 오른쪽으로 밀기
    for (let r=0; r<N; r++)
    {
        for (let c=N-2; c>=0; c--)
        {
            for (let idx=c; idx+1<N && ret[r][idx + 1]==0; idx++)
            {
                ret[r][idx + 1] = ret[r][idx];
                ret[r][idx] = 0;
            }
        }
    }
    
    return ret;
}

function moveUp(board)
{
    let ret = [];
    for (let i=0; i<N; i++)
        ret.push(Array.from(board[i]));

    //위로 밀기
    for (let c=0; c<N; c++)
    {
        for (let r=1; r<N; r++)
        {
            for (let idx=r; idx>0 && ret[idx - 1][c]==0; idx--)
            {
                ret[idx - 1][c] = ret[idx][c];
                ret[idx][c] = 0;
            }
        }
    }
    // 합치기
    for (let c=0; c<N; c++)
    {
        for (let r=1; r<N; r++)
        {
            if (ret[r][c] == ret[r - 1][c])
            {
                sol = Math.max(sol, ret[r][c] * 2);
                ret[r - 1][c] += ret[r][c];
                ret[r][c] = 0;
            }
        }
    }
    // 위로 밀기
    for (let c=0; c<N; c++)
    {
        for (let r=1; r<N; r++)
        {
            for (let idx=r; idx>0 && ret[idx - 1][c]==0; idx--)
            {
                ret[idx - 1][c] = ret[idx][c];
                ret[idx][c] = 0;
            }
        }
    }

    return ret;
}

function moveDown(board)
{
    let ret = [];
    for (let i=0; i<N; i++)
        ret.push(Array.from(board[i]));

    // 아래쪽으로 밀기
    for (let c=0; c<N; c++)
    {
        for (let r=N-2; r>=0; r--)
        {
            for (let idx=r; idx+1<N && ret[idx + 1][c]==0; idx++)
            {
                ret[idx + 1][c] = ret[idx][c];
                ret[idx][c] = 0;
            }
        }
    }
    // 합치기
    for (let c=0; c<N; c++)
    {
        for (let r=N-2; r>=0; r--)
        {
            if (ret[r][c] == ret[r + 1][c])
            {
                sol = Math.max(sol, ret[r][c] * 2);
                ret[r + 1][c] += ret[r][c];
                ret[r][c] = 0;
            }
        }
    }
    // 아래로 밀기    
    for (let c=0; c<N; c++)
    {
        for (let r=N-2; r>=0; r--)
        {
            for (let idx=r; idx+1<N && ret[idx + 1][c]==0; idx++)
            {
                ret[idx + 1][c] = ret[idx][c];
                ret[idx][c] = 0;
            }
        }
    }

    return ret;
}