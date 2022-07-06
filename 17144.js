/*
일단 무식하게 구현해보기
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [R, C, T] = input[0].trim().split(' ').map(Number);
const A = [];
for (let i=1; i<=R; i++)
    A.push(input[i].trim().split(' ').map(Number));

// process
// 공기청정기 위치 찾기
let airPurifier_pos;
for (let r=0; r<R; r++)
{
    if (A[r][0] === -1)
    {
        airPurifier_pos = r;
        break;
    }
}

// 시뮬레이션 시작
for (let t=0; t<T; t++)
{
    let newDust = spread();
    update(newDust);
    wind();
}

// 결과 계산
let sol = 0;
for (let r=0; r<R; r++)
{
    for (let c=0; c<C; c++)
    {
        if (A[r][c] > 0)
            sol += A[r][c];
    }
}

// output
console.log(sol);

// functions
function spread()
{
    /* 먼지가 퍼질 위치와 양을 저장한 배열 반환 */
    const ret = [];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let r=0; r<R; r++)
    {
        for (let c=0; c<C; c++)
        {
            if (A[r][c] < 1) continue;

            let amount = Math.floor(A[r][c] / 5);
            let cnt = 0;

            for (let [dr, dc] of directions)
            {
                let r2 = r + dr;
                let c2 = c + dc;

                if (0 > r2 || r2 >= R || 0 > c2 || c2 >= C || 
                    (r2 == airPurifier_pos && c2 == 0) || (r2 == airPurifier_pos + 1 && c2 == 0))
                    continue;

                if (amount > 0) ret.push([r2, c2, amount]);
                cnt++;
            }

            A[r][c] -= amount * cnt;
        }
    }

    return ret;
}

function update(dust)
{
    for (let [r, c, amount] of dust)
        A[r][c] += amount;
}

function wind()
{
    const direction_clockwise = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const direction_anticlockwise = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    let dirIdx, r, c, dr, dc, prev;

    // 반시계방향
    dirIdx = 0;
    r = airPurifier_pos;
    c = 1;
    [dr, dc] = direction_anticlockwise[0];
    prev = 0;

    while (A[r][c] !== -1)
    {
        [prev, A[r][c]] = [A[r][c], prev];

        if ((r == airPurifier_pos && c == C - 1) || (r == 0 && c == C - 1) || (r == 0 && c == 0))
            [dr, dc] = direction_anticlockwise[++dirIdx];
        
        r += dr;
        c += dc;
    }
    
    // 시계방향
    dirIdx = 0;
    r = airPurifier_pos + 1;
    c = 1;
    [dr, dc] = direction_clockwise[0];
    prev = 0;

    while (A[r][c] !== -1)
    {
        [prev, A[r][c]] = [A[r][c], prev];

        if ((r == airPurifier_pos + 1 && c == C - 1) || (r == R - 1 && c == C - 1) || (r == R - 1 && c == 0))
            [dr, dc] = direction_clockwise[++dirIdx];
        
        r += dr;
        c += dc;
    }
}