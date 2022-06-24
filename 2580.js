/*
백트래킹
recursive step 구성
    지금 보고 있는 빈칸에 채울 수 있는 수들의 배열 생성
    해당 수들에 대해 반복
        빈칸 채움
        재귀
        끝까지 채우는 데 성공했는지 확인
        채웠던 거 지움
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const sudoku = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => x.split(' ').map(Number));

// process
// 빈칸 위치 저장
const empty = [];
for (let i=0; i<9; i++)
{
    for (let j=0; j<9; j++)
    {
        if (sudoku[i][j] === 0)
            empty.push([i, j]);
    }
}

// 정답 계산
fill(0);

// output
const sol = sudoku.map(x => x.join(' '));
console.log(sol.join('\n'));

// functions
function fill(depth)
{
    // base case
    if (depth === empty.length)
        return true;

    // recursive step
    let success;
    let [r, c] = empty[depth];
    const candidate = make_candidate_list(r, c);

    for (let i=1; i<=9; i++)
    {
        if (candidate[i] === false) continue;

        sudoku[r][c] = i;
        success = fill(depth + 1);
        if (success) return true;
        sudoku[r][c] = 0;
    }
    return false;
}

function make_candidate_list(r, c)
{
    const ret = new Array(10).fill(true);

    // 행, 열 보고 안되는거 지움
    for (let i=0; i<9; i++)
    {
        ret[sudoku[r][i]] = false;
        ret[sudoku[i][c]] = false;
    }

    // 33 사각형 보고 안되는거 지움
    const start_row = Math.floor(r / 3) * 3;
    const start_col = Math.floor(c / 3) * 3;
    for (let i=start_row; i<start_row+3; i++)
    {
        for (let j=start_col; j<start_col+3; j++)
            ret[sudoku[i][j]] = false;
    }

    return ret;
}