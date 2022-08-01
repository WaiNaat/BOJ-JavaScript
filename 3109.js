// 시간 초과

/*
dfs 돌리면 가능 불가능 판단은 쉽게 가능

0행~마지막행 순서로 찾아보고
탐색할 때 대각위 > 오른쪽 > 대각아래 순서로 탐색하면
가능한 위쪽길을 전부 고르고 가능한 아래쪽길을 남기기때문에
최대 개수 계산 가능?
*/

// constant
const directions = [-1, 0, 1];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col] = input[0].trim().split(' ').map(Number);
const map = input.slice(1).map(x => Array.from(x));

// process
let cnt = 0;

for (let r=0; r<row; r++)
{
    cnt += dfs(r, 0);
}

// output
console.log(cnt);

// functions
function dfs(r, c)
{
    if (c === col - 1)
        return 1;

    for (let dr of directions)
    {
        let r2 = r + dr;
        let c2 = c + 1;

        if (0 > r2 || r2 >= row) continue;

        if (map[r2][c2] == '.')
        {
            map[r2][c2] = 'o';
            if (dfs(r2, c2)) return 1;
            map[r2][c2] = '.';
        }
    }

    return 0;
}