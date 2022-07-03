/*
선의 위치를 2차원 배열로 표현
가로선 양옆으론 선을 놓을 수 없다는 표시 확실히 하기
선을 놓을 수 있는 애들 집합 생성하고
거기서 백트래킹으로 3개까지 골라 사다리타기 진행
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [col, M, H] = input[0].trim().split(' ').map(Number);

// 보드판에 가로선 위치 표시
const board = Array.from(new Array(H + 1), () => new Array(col + 1).fill(0));
for (let i=1; i<=M; i++)
{
    let [r, c] = input[i].trim().split(' ').map(Number);
    board[r][c] = 1;
    if (c > 1) board[r][c - 1] = -1;
    if (c < col) board[r][c + 1] = -1;
}

// 가로선을 놓을 수 있는 위치 표시
const can_put_horizontal_line = [];
for (let r=1; r<=H; r++)
{
    for (let c=1; c<col; c++)
    {
        if (board[r][c] === 0)
            can_put_horizontal_line.push([r, c]);
    }
}

// process
const picked_horizontal_line_idx = [];
let sol = Infinity;
put_horizontal_line(0, 0);

// output
console.log(sol > 3? -1 : sol);

// functions
function put_horizontal_line(depth, idx)
{
    ladder();
    
    if (depth === 3 || sol === 0)
        return;

    for (let i=idx; i<can_put_horizontal_line.length; i++)
    {
        picked_horizontal_line_idx.push(i);
        put_horizontal_line(depth + 1, i + 1);
        picked_horizontal_line_idx.pop();
    }
}

function ladder()
{
    let success = true;

    // 가로선 놓기
    for (let idx of picked_horizontal_line_idx)
    {
        let [r, c] = can_put_horizontal_line[idx];
        
        if (board[r][c] != 0)
            success = false;

        board[r][c] = 1;
        if (c > 1) board[r][c - 1] -= 1;
        if (c < col) board[r][c + 1] -= 1;
    }
    
    // 사다리타기
    if (success)
    {
        for (let v=1; v<=col; v++)
        {
            let c = v;
            for (let r=1; r<=H; r++)
            {
                // 오른쪽으로 움직이나?
                if (board[r][c] === 1)
                    c++;

                // 왼쪽으로 움직이나?
                else if (c > 1 && board[r][c - 1] === 1)
                    c--;
            }
            
            if (c != v)
            {
                success = false;
                break;
            }
        }
    }

    // 통과
    if (success)
    {
        sol = Math.min(picked_horizontal_line_idx.length, sol);
    }
    
    // 가로선 놓은거 지우기
    for (let idx of picked_horizontal_line_idx)
    {
        let [r, c] = can_put_horizontal_line[idx];

        board[r][c] = 0;
        if (c > 1) board[r][c - 1] = 0;
        if (c < col) board[r][c + 1] = 0;
    }
}