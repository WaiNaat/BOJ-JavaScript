/*
순수 구현

연파랑, 연초록은 항상 비어있음
    >> 빨간 보드는 구현하지 않고 바로 연파랑 연초록에 배치

이동 -> 점수획득 -> 연한색 처리 순서 지키기

파랑보드는 초록보드랑 같은 모양 되게 transpose해서 구현
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const block_info = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
const green = Array.from(new Array(6), () => new Array(4).fill(0));
const blue = Array.from(new Array(6), () => new Array(4).fill(0));
let score = 0;

for (let [t, x, y] of block_info)
{
    let greenTile = put_tile(t, x, y);
    let blueTile = put_tile(
        t == 1? 1 : (t == 2? 3 : 2), 
        y, x);
        
    move_tile(greenTile, green);
    move_tile(blueTile, blue);
    
    score += get_score(green);
    score += get_score(blue);

    empty_pale_area(green);
    empty_pale_area(blue);
    
    console.log(green);
    console.log();
    console.log(blue);
    console.log();
}

// 타일 수 세기
let cnt = 0;
cnt += count_tile(green);
cnt += count_tile(blue);

// output
console.log(`${score}\n${cnt}`);

// functions
function put_tile(t, r, c)
{
    let tile_pos;

    if (t == 1)
        tile_pos = [[1, c]];
    else if (t == 2)
        tile_pos = [[1, c], [1, c + 1]];    
    else
        tile_pos = [[0, c], [1, c]];
    
    return tile_pos;
}

function move_tile(tile, board)
{
    let cur = tile
    let canMove = true;

    while (canMove)
    {
        let next = [];
        for (let [r, c] of cur)
        {
            let [r2, c2] = [r + 1, c];
            if (r2 > 5 || board[r2][c2] == 1)
                canMove = false;
            next.push([r2, c2]);
        }

        if (canMove)
            cur = next;
    }

    for (let [r, c] of cur)
        board[r][c] = 1;
}

function get_score(board)
{
    let score = 0;

    for (let r=0; r<=5; r++)
    {
        if (board[r].reduce((prev, cur) => prev + cur, 0) === 4)
        {
            score++;
            for (let i=r; i>0; i--)
                board[i] = board[i - 1];
            board[0] = [0, 0, 0, 0];
        }
    }
    
    return score;
}

function empty_pale_area(board)
{
    let cnt = 0;

    for (let r of [0, 1])
    {
        if (board[r].reduce((prev, cur) => prev + cur, 0) > 0)
            cnt++;
    }

    for (let i=0; i<cnt; i++)
    {
        board.pop();
        board.unshift(new Array(4).fill(0));
    }
}

function count_tile(board)
{
    let cnt = 0;
    for (let line of board)
    {
        for (let val of line)
            if (val == 1) cnt++;
    }
    return cnt;
}