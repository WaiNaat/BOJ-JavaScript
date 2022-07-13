/*
백트래킹으로 상어가 어디로 이동할지 결정
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input =  require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

const fish_pos = new Array(17);
const board = Array.from(new Array(4), () => new Array(4));
let i = 0;
for (let r=0; r<4; r++)
{
    for (let c=0; c<4; c++)
    {
        let fish_name = input[i++]; 
        let fish_dir = input[i++] - 1;
        fish_pos[fish_name] = [r, c, fish_dir];
        board[r][c] = fish_name;
    }
}

// process
// 상어 초기화
const shark_pos = [0, 0, input[1] - 1];
const initial_score = board[0][0];
fish_pos[board[0][0]] = undefined;
board[0][0] = 0;

let sol = 0;
const directions = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
move_shark(initial_score, board, shark_pos, fish_pos);

// output
console.log(sol);

// functions
function move_shark(score, board, shark_pos, fish_pos)
{
    let [next_board, next_fish_pos] = move_fish(board, fish_pos);

    // 상어가 이동할 수 있는 위치들 찾기
    let candidate = [];
    let [r, c, d] = shark_pos;
    let [dr, dc] = directions[d];
    for (let [r2, c2] = [r + dr, c + dc];
        inside_board(r2, c2);
        [r2, c2] = [r2 + dr, c2 + dc])
        {
            if (next_board[r2][c2] != undefined)
                candidate.push([r2, c2]);
        }
        
    // 상어 이동
    if (candidate.length === 0)
    {
        sol = Math.max(sol, score);
        return;
    }
    else
    {
        for (let [r2, c2] of candidate)
        {
            let del_fish = next_board[r2][c2];
            let del_fish_pos = next_fish_pos[del_fish];
            next_board[r][c] = undefined;
            next_board[r2][c2] = 0;
            next_fish_pos[del_fish] = undefined;

            move_shark(score + del_fish, next_board, [r2, c2, del_fish_pos[2]], next_fish_pos);

            next_board[r][c] = 0;
            next_board[r2][c2] = del_fish;
            next_fish_pos[del_fish] = del_fish_pos;
        }
    }
}

function move_fish(board, fish_pos)
{
    const next_board = Array.from(board, line => Array.from(line));
    const next_fish_pos = Array.from(fish_pos);

    for (let i=1; i<=16; i++)
    {
        if (next_fish_pos[i] === undefined) continue;

        let [r, c, d] = next_fish_pos[i];
        let [dr, dc] = directions[d];

        let rotate_cnt = 0;
        let r2, c2;
        while (rotate_cnt < 9)
        {
            r2 = r + dr;
            c2 = c + dc;

            if (!inside_board(r2, c2) || next_board[r2][c2] == 0)
            {
                d = (d + 1) % 8;
                [dr, dc] = directions[d];
                rotate_cnt++;
            }
            else
                break;
        }
        
        if (rotate_cnt < 9)
        {
            let exchange_fish = next_board[r2][c2];
            [next_board[r][c], next_board[r2][c2]] = [next_board[r2][c2], i];
            next_fish_pos[i] = [r2, c2, d];
            if (exchange_fish != undefined)
                next_fish_pos[exchange_fish] = [r, c, next_fish_pos[exchange_fish][2]];
        }
    }
    return [next_board, next_fish_pos];
}

function inside_board(r, c)
{
    if (0 > r || r > 3 || 0 > c || c > 3) return false;
    return true;
}