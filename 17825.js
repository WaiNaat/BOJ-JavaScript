/*
각 주사위마다 4개 말 중 하나를 이동시킴
    >> 총 경우의 수 2^20가지라 완전탐색 가능

백트래킹으로 조합을 구해서 이동하면 됨
    일단 아무렇게나 조합한 다음에 조합 끝나면 가능 여부 계산하기
    또는
    재귀식에 각 말들의 위치정보를 넘겨서 가능한 조합만 짜기 <<<

게임판은 4개의 배열로 표현한다.
    둘레길 1개와 10, 20, 30에서 시작하는 지름길 3개
*/
// constant
const board = [
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40],
    [10, 13, 16, 19, 25, 30, 35, 40],
    [undefined, 20, 22, 24, 25, 30, 35, 40],
    [30, 28, 27, 26, 25, 30, 35, 40]
];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const dice = require('fs').readFileSync(inputFile).toString().trim().split(' ').map(Number);

// process
let sol = -1;
const piece = [[0,0], [0,0], [0,0], [0,0]];
move(0, 0);

// output
console.log(sol);

// functions
function move(dice_no, score)
{
    // base case
    if (dice_no === 10)
    {
        sol = Math.max(sol, score);
        return;
    }

    // recursive step
    for (let p=0; p<4; p++)
    {        
        let [r, c] = piece[p];

        if (r == -1) continue;

        // 도착 위치 계산
        let [r2, c2] = [r, c];

        c2 += dice[dice_no];

        if (c2 >= board[r2].length)
            [r2, c2] = [-1, -1];
        else if (r2 == 0 && board[r2][c2] == 10)
            [r2, c2] = [1, 0];
        else if (r2 == 0 && board[r2][c2] == 20)
            [r2, c2] = [2, 1];
        else if (r2 == 0 && board[r2][c2] == 30)
            [r2, c2] = [3, 0];

        // 이동 가능하면 이동
        if (!piece_on_pos(r2, c2))
        {
            piece[p] = [r2, c2];
            move(dice_no + 1, r2 >= 0? score + board[r2][c2] : score);
            piece[p] = [r, c];
        }
    }
}

function piece_on_pos(r, c)
{
    // 좌표 보정: board에서 25, 30, 35, 40은 모두 같은 칸임
    if (r > 1 && c > 3)
        r = 1;

    if (r > 0 && board[r][c] == 40)
    {
        r = 0;
        c = board[0].length - 1;
    }

    // 이동을 마치는 칸에 다른 말이 있는지 확인
    for (let [r2, c2] of piece)
    {
        if (r2 === -1) continue;

        //좌표 보정
        if (r2 > 1 && c2 > 3)
            r2 = 1;
        
        if (board[r2][c2] == 40)
        {
            r2 = 0;
            c2 = board[0].length - 1;
        }

        if (r == r2 && c == c2)
            return true;
    }
    return false;
}