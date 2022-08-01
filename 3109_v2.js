/*
dfs 돌리면 가능 불가능 판단은 쉽게 가능

마지막행~0행 순서로 찾아보고
탐색할 때 우하 > 우 > 우상 순서로 탐색하면
가능한 아래쪽길을 전부 고르고 가능한 위쪽길을 남기기때문에
최대 개수 계산 가능?

dfs에서
체크 > 방문 > 체크 해제 순서인데
체크 해제를 할 필요가 없었음

왜? dfs 특성상 정답(연결가능 통로)을 찾았으면 즉시 종료라 쓸데없는 곳 방문 안함
만약 정답을 찾지 못하고 이전 단계로 돌아오더라도 하나는 명확함:
    다른 행에서 출발해서 해당 위치로 다시 도착하더라도 정답은 찾을 수 없음
    따라서 굳이 체크 해제를 할 필요가 없음
    즉 아래쪽 탐색의 고생을 줄여줌

이러면 굳이 dfs를 재귀형식으로 구현하지 않아도 편하게 가능
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
for (let r=row-1; r>=0; r--)
{
    // dfs
    let stack = [[r, 0]];

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (map[r][c] != '.') continue;
        map[r][c] = 'o';

        if (c == col - 1)
        {
            cnt++;
            break;
        }
        
        for (let dr of directions)
        {
            let r2 = r + dr;
            let c2 = c + 1;

            if (0 <= r2 && r2 < row && map[r2][c2] == '.')
                stack.push([r2, c2]);
        }
    }
}

// output
console.log(cnt);