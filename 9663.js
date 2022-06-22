/*
백트래킹

체스판 가로/세로가 N칸이고 퀸이 N개이므로
각 행/열당 퀸은 무조건 하나씩 배치해야함

depth를 행 번호로 하고
해당 행에 있는 퀸의 열번호를 저장하는 배열 사용
이러면 일단 행은 처리 완료
배열을 이용해서 열과 대각선 안겹치게 하면 된다
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const N = Number(require('fs').readFileSync(inputFile).toString().trim());

// process
const queen_col = [];
const visited = new Array(N);
let count = 0;

n_queen(0);

// output
console.log(count);

// function
function n_queen(depth)
{
    // base case
    if (depth == N)
    {
        count++;
        return;
    }

    // recursive step
    for (let i=0; i<N; i++)
    {
        // 열이 겹치는지 확인
        if (visited[i]) continue;

        // 대각선이 겹치는지 확인
        let diag_ok = true;
        for (let j=0; j<depth; j++)
        {
            if (i == queen_col[j] - (depth - j) || i == queen_col[j] + (depth - j))
            {
                diag_ok = false;
                break;
            }
        }
        if (!diag_ok) continue;

        // 재귀
        queen_col.push(i);
        visited[i] = true;

        n_queen(depth + 1);

        visited[i] = false;
        queen_col.pop();
    }
}