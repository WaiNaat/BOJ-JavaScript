/*
순수 구현 문제
max(K)=10 이므로 같은 칸의 체스말을 단순 배열로 구성해도 될듯?
*/

// 체스 말
class Piece
{
    constructor(id, r, c, d)
    {
        this.id = id;
        this.row = r;
        this.col = c;
        this.direction = d;
    }
}

// input
const inputFile = process.platform === 'linux' ? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, K] = input[0].trim().split(' ').map(Number);
const board_color = Array.from(input.slice(1, N + 1), x => x.trim().split(' ').map(Number));
const piece_info = [];
const board = Array.from(new Array(N), () => Array.from(new Array(N), () => []));
for (let i=N+1; i<N+K+1; i++)
{
    let [row, col, direction] = input[i].trim().split(' ').map(Number);
    piece_info.push(new Piece(i - N - 1, --row, --col, direction));
    board[row][col] = [i - N - 1];
}

// process
const directions = [undefined, [0, 1], [0, -1], [-1, 0], [1, 0]];
let turn;
let end = false;
for (turn=1; turn<=1000; turn++)
{
    // 말 선택
    for (let p=0; p<K; p++)
    {
        let cur = piece_info[p];
        let r = cur.row;
        let c = cur.col;

        // 말이 쌓여있는 높이 구함
        let h;
        for (h=0; h<3; h++)
            if (board[r][c][h] === cur.id) break;
        
        // 이동하려는 칸 확인
        let [r2, c2, color] = get_next_color(cur);
        
        // 칸에 따라 이동
        if (color === 0)
            move_white(h, r, c, r2, c2);
        else if (color === 1)
            move_red(h, r, c, r2, c2);
        else
            [r2, c2] = move_blue(cur.id, h, r, c);
        
        // 4개 쌓였는지 확인
        if (board[r2][c2].length >= 4)
        {
            end = true;
            break;
        }
    }

    if (end)
        break;
}

// output
console.log(turn > 1000? -1 : turn);

// functions
function change_direction(d)
{
    switch(d)
    {
        case 1:
            return 2;
        case 2:
            return 1;
        case 3:
            return 4;
        default:
            return 3;
    }
}

function get_next_color(piece)
{
    let color;
    let [dr, dc] = directions[piece.direction];
    let r2 = piece.row + dr;
    let c2 = piece.col + dc;

    if (0 > r2 || r2 >= N || 0 > c2 || c2 >= N)
        color = 2;
    else
        color = board_color[r2][c2];
    
    return [r2, c2, color];
}

function move_white(h, r, c, r2, c2)
{
    for (let i of board[r][c].slice(h))
    {
        board[r2][c2].push(i);
        piece_info[i].row = r2;
        piece_info[i].col = c2;
    }
    
    while (board[r][c].length > h)
        board[r][c].pop();
}

function move_red(h, r, c, r2, c2)
{
    while (board[r][c].length > h)
    {
        let id = board[r][c].pop();
        board[r2][c2].push(id);
        piece_info[id].row = r2;
        piece_info[id].col = c2;
    }
}

function move_blue(id, h, r, c)
{
    // 방향 전환
    piece_info[id].direction = change_direction(piece_info[id].direction);

    // 다음 칸 확인
    let [r2, c2, color] = get_next_color(piece_info[id]);

    // 이동
    if (color === 0)
        move_white(h, r, c, r2, c2);
    else if (color === 1)
        move_red(h, r, c, r2, c2);
    else
        [r2, c2] = [r, c];
    return [r2, c2];
}