/*
원판 하나는 덱 하나로 구성 가능.
    근데 어차피 원판의 각 요소에 바로 접근해야 함
    >> 연결리스트 형식으로 만든 덱으로 큰 이득 보기 힘듦, 배열 사용

같은 숫자가 인접에 인접에 인접... 한 걸 동시에 지워야 함
    원판 위의 모든 숫자에 대해 BFS를 돌리는 방법
    또는
    임시 원판을 만들어서 거기에 결과를 저장하고 바꾸는 방법 <<<
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, T] = input[0].trim().split(' ').map(Number);
let disc = Array.from(input.slice(1, 1 + row), x => x.trim().split(' ').map(Number));
const rotation = Array.from(input.slice(1 + row), x => x.trim().split(' ').map(Number));

// process
for (let [x, d, k] of rotation)
{
    // 회전할 원판 선택
    for (let r=x-1; r<row; r+=x)
    {
        // 회전
        for (let rotate=0; rotate<k; rotate++)
        {
            if (d === 0)
                disc[r].unshift(disc[r].pop());
            else
                disc[r].push(disc[r].shift());
        }
    }

    let next = Array.from(disc, x => Array.from(x));
    
    // 지우기
    let erased = false;

    for (let r=0; r<row; r++)
    {
        for (let c=0; c<col; c++)
        {
            // 인접 좌표 계산
            let adj = get_adj_pos(r, c);
            
            // 지우기
            for (let [r2, c2] of adj)
            {
                if (disc[r][c] != 0 && disc[r][c] == disc[r2][c2])
                {
                    
                    next[r][c] = 0;
                    next[r2][c2] = 0;
                    erased = true;
                }
            }
        }
    }

    // 지워진 것이 하나도 없을 경우
    if (!erased)
    {
        let avg = getAvg();
        for (let r=0; r<row; r++)
        {
            for (let c=0; c<col; c++)
            {
                if (next[r][c] == 0) continue;
                else if (next[r][c] < avg) next[r][c]++;
                else if (next[r][c] > avg) next[r][c]--;
            }
        }
    }

    disc = next;
}

// output
let sol = 0;
for (let d of disc) sol += d.reduce((prev, cur) => prev + cur);
console.log(sol);

// functions
function getAvg()
{
    let sum = 0;
    let cnt = 0;
    for (let r=0; r<row; r++)
    {
        for (let c=0; c<col; c++)
        {
            if (disc[r][c] == 0) continue;
            cnt++;
            sum += disc[r][c];
        }
    }
    return sum / cnt;
}

function get_adj_pos(r, c)
{
    const directions = [[0, -1], [0, 1], [1, 0], [-1, 0]];
    const ret = [];

    for (let [dr, dc] of directions)
    {
        let r2 = r + dr;
        let c2 = c + dc;
        
        if (0 > r2 || r2 >= row) continue;

        if (c2 === -1) 
            c2 = col - 1;
        else if (c2 === col)
            c2 = 0;

        ret.push([r2, c2]);
    }
    return ret;
}