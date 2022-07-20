/*
벽 신경써서 구현하기

어떤 지점까지 바람이 오는지 확인하는 배열
    >> 이건 첫 사이클에만 만들고 나머지는 그걸 읽기만
벽 위치만 따로 저장한 배열
    >> 같은 위치에 위쪽 벽, 오른쪽 벽이 동시에 나타날 수 있음
*/

// constants
const RIGHT = 1;
const LEFT = 2;
const DOWN = 4;

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, K] = input[0].trim().split(' ').map(Number);

const room = Array.from(input.slice(1, 1 + row), x => x.trim().split(' ').map(Number));

const W = Number(input[1 + row]);
const UP_WALL = Array.from(new Array(row), () => new Array(col));
const RIGHT_WALL = Array.from(new Array(row), () => new Array(col));
for (let i=2+row; i<2+row+W; i++)
{
    let [r, c, w] = input[i].trim().split(' ').map(Number);
    if (w == 0) UP_WALL[r - 1][c - 1] = true;
    else RIGHT_WALL[r - 1][c - 1] = true;
}

// process
// 온풍기 위치 확인
const heater = [];
const check = [];
for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (room[r][c] > 0)
        {
            if (room[r][c] == 5)
                check.push([r, c]);
            else
                heater.push([r, c, room[r][c]]);
        }
    }
}

// 각 온풍기의 바람이 영향을 미치는 구역 계산
const up_temperature = Array.from(new Array(row), () => new Array(col).fill(0));
for (let [r, c, d] of heater)
{
    if (d == RIGHT) heater_right(r, c);
    else if (d == LEFT) heater_left(r, c);
    else if (d == DOWN) heater_down(r, c);
    else heater_up(r, c);
}

// 반복
let chocolate = 0;
let temperature = Array.from(new Array(row), () => new Array(col).fill(0));
while (chocolate < 101)
{
    // 온도 상승
    for (let r=0; r<row; r++)
    {
        for (let c=0; c<col; c++)
            temperature[r][c] += up_temperature[r][c];
    }
    
    // 온도 조절
    temperature = adjust_temperature(temperature);

    // 온도 감소
    for (let c=0; c<col; c++)
    {
        if (temperature[0][c] > 0)
            temperature[0][c]--;
        if (temperature[row - 1][c] > 0)
            temperature[row - 1][c]--;
    }

    for (let r=1; r<row-1; r++)
    {
        if (temperature[r][0] > 0)
            temperature[r][0]--;
        if (temperature[r][col - 1] > 0)
            temperature[r][col - 1]--;
    }
    
    // 초콜릿 먹기
    chocolate++;
    
    // 온도 조사
    let cnt = 0;
    for (let [r, c] of check)
    {
        if (temperature[r][c] >= K)
            cnt++;
    }

    if (cnt == check.length)
        break;
}

// output
console.log(chocolate);

// functions
function heater_right(r, c)
{
    const visited = Array.from(new Array(row), () => new Array(col));

    visited[r][c + 1] = true;
    up_temperature[r][c + 1] += 5;

    for (let i=1; i<=4; i++)
    {
        let c2 = c + i;
        if (c2 >= col) break;

        for (let r2=r-i+1; r2<=r+i-1; r2++)
        {
            // 우선 (r2, c2)는 바람이 오는지 확인
            if (out_of_bound(r2, c2) || !visited[r2][c2])
                continue;

            // 다음 세 곳을 확인 (위, 정면, 아래 순서)
            if (!out_of_bound(r2 - 1, c2 + 1) && 
                !visited[r2 - 1][c2 + 1] && 
                !UP_WALL[r2][c2] &&
                !RIGHT_WALL[r2 - 1][c2])
            {
                visited[r2 - 1][c2 + 1] = true;
                up_temperature[r2 - 1][c2 + 1] += 5 - i;
            }

            if (!out_of_bound(r2, c2 + 1) &&
                !visited[r2][c2 + 1] &&
                !RIGHT_WALL[r2][c2])
            {
                visited[r2][c2 + 1] = true;
                up_temperature[r2][c2 + 1] += 5 - i;
            }

            if (!out_of_bound(r2 + 1, c2 + 1) &&
                !visited[r2 + 1][c2 + 1] &&
                !UP_WALL[r2 + 1][c2] &&
                !RIGHT_WALL[r2 + 1][c2])
            {
                visited[r2 + 1][c2 + 1] = true;
                up_temperature[r2 + 1][c2 + 1] += 5 - i;
            }
        }
    }
}

function heater_left(r, c)
{
    const visited = Array.from(new Array(row), () => new Array(col));

    visited[r][c - 1] = true;
    up_temperature[r][c - 1] += 5;

    for (let i=1; i<=4; i++)
    {
        let c2 = c - i;
        if (0 > c2) break;

        for (let r2=r-i+1; r2<=r+i-1; r2++)
        {
            // (r2, c2)에 바람이 오는지 확인
            if (out_of_bound(r2, c2) || !visited[r2][c2])
                continue;

            // 다음 세 곳을 조사: 왼쪽 위, 왼쪽 중앙, 왼쪽 아래
            if (!out_of_bound(r2 - 1, c2 - 1) && 
                !visited[r2 - 1][c2 - 1] &&
                !UP_WALL[r2][c2]&&
                !RIGHT_WALL[r2 - 1][c2 - 1])
            {
                visited[r2 - 1][c2 - 1] = true;
                up_temperature[r2 - 1][c2 - 1] += 5 - i;
            }

            if (!out_of_bound(r2, c2 - 1) &&
                !visited[r2][c2 - 1] &&
                !RIGHT_WALL[r2][c2 - 1])
            {
                visited[r2][c2 - 1] = true;
                up_temperature[r2][c2 - 1] += 5 - i;
            }

            if (!out_of_bound(r2 + 1, c2 - 1) &&
                !visited[r2 + 1][c2 - 1] &&
                !RIGHT_WALL[r2 + 1][c2 - 1] &&
                !UP_WALL[r2 + 1][c2])
            {
                visited[r2 + 1][c2 - 1] = true;
                up_temperature[r2 + 1][c2 - 1] += 5 - i;
            }
        }
    }
}

function heater_down(r, c)
{
    const visited = Array.from(new Array(row), () => new Array(col));

    visited[r + 1][c] = true;
    up_temperature[r + 1][c] += 5;

    for (let i=1; i<=4; i++)
    {
        let r2 = r + i;
        if (r2 >= row) break;

        for (let c2=c-i+1; c2<=c+i-1; c2++)
        {
            // (r2, c2)에 바람이 오는지 확인
            if (out_of_bound(r2, c2) || !visited[r2][c2])
                continue;
            
            // 다음 세 곳을 조사: 아래 좌, 아래 중, 아래 우
            if (!out_of_bound(r2 + 1, c2 - 1) &&
                !visited[r2 + 1][c2 - 1] &&
                !RIGHT_WALL[r2][c2 - 1] &&
                !UP_WALL[r2 + 1][c2 - 1])
            {
                visited[r2 + 1][c2 - 1] = true;
                up_temperature[r2 + 1][c2 - 1] += 5 - i;
            }

            if (!out_of_bound(r2 + 1, c2) &&
                !visited[r2 + 1][c2] &&
                !UP_WALL[r2 + 1][c2])
            {
                visited[r2 + 1][c2] = true;
                up_temperature[r2 + 1][c2] += 5 - i;
            }

            if (!out_of_bound(r2 + 1, c2 + 1) &&
                !visited[r2 + 1][c2 + 1] &&
                !RIGHT_WALL[r2][c2]&& 
                !UP_WALL[r2 + 1][c2 + 1])
            {
                visited[r2 + 1][c2 + 1] = true;
                up_temperature[r2 + 1][c2 + 1] += 5 - i;
            }
        }
    }
}

function heater_up(r, c)
{
    const visited = Array.from(new Array(row), () => new Array(col));

    visited[r - 1][c] = true;
    up_temperature[r - 1][c] += 5;

    for (let i=1; i<=4; i++)
    {
        let r2 = r - i;
        if (0 > r2) break;

        for (let c2=c-i+1; c2<=c+i-1; c2++)
        {
            // (r2,c2)에 바람이 오는지 확인
            if (out_of_bound(r2, c2) || !visited[r2][c2])
                continue;

            // 다음 세 곳을 조사: 위 좌, 위 중, 위 우
            if (!out_of_bound(r2 - 1, c2 - 1) &&
                !visited[r2 - 1][c2 - 1] &&
                !RIGHT_WALL[r2][c2 - 1] &&
                !UP_WALL[r2][c2 - 1])
            {
                visited[r2 - 1][c2 - 1] = true;
                up_temperature[r2 - 1][c2 - 1] += 5 - i;
            }

            if (!out_of_bound(r2 - 1, c2) &&
                !visited[r2 - 1][c2] &&
                !UP_WALL[r2][c2])
            {
                visited[r2 - 1][c2] = true;
                up_temperature[r2 - 1][c2] += 5 - i;
            }

            if (!out_of_bound(r2 - 1, c2 + 1) &&
                !visited[r2 - 1][c2 + 1] &&
                !RIGHT_WALL[r2][c2] &&
                !UP_WALL[r2][c2 + 1])
            {
                visited[r2 - 1][c2 + 1] = true;
                up_temperature[r2 - 1][c2 + 1] += 5 - i;
            }
        }
    }
}

function adjust_temperature(temp)
{
    const next = Array.from(new Array(row), () => new Array(col).fill(0));

    for (let r=0; r<row; r++)
    {
        for (let c=0; c<col; c++)
        {
            if (temp[r][c] == 0)
                continue;

            let self_temp = temp[r][c];

            // 상
            if (!out_of_bound(r - 1, c) && 
                !UP_WALL[r][c] && 
                temp[r][c] > temp[r - 1][c])
            {
                let val = Math.floor((temp[r][c] - temp[r - 1][c]) / 4);
                self_temp -= val;
                next[r - 1][c] += val;
            }

            // 하
            if (!out_of_bound(r + 1, c) &&
                !UP_WALL[r + 1][c] &&
                temp[r][c] > temp[r + 1][c])
            {
                let val = Math.floor((temp[r][c] - temp[r + 1][c]) / 4);
                self_temp -= val;
                next[r + 1][c] += val;
            }

            // 좌
            if (!out_of_bound(r, c - 1) &&
                !RIGHT_WALL[r][c - 1] &&
                temp[r][c] > temp[r][c - 1])
            {
                let val = Math.floor((temp[r][c] - temp[r][c - 1]) / 4);
                self_temp -= val;
                next[r][c - 1] += val;
            }

            // 우
            if (!out_of_bound(r, c + 1) &&
                !RIGHT_WALL[r][c] &&
                temp[r][c] > temp[r][c + 1])
            {
                let val = Math.floor((temp[r][c] - temp[r][c + 1]) / 4);
                self_temp -= val;
                next[r][c + 1] += val;
            }

            next[r][c] += self_temp;
        }
    }

    return next;
}

function out_of_bound(r, c)
{
    if (0 > r || r >= row || 0 > c || c >= col) return true;
    else return false;
}