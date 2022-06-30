/*
길을 걸으면서 현재 높이가 몇 칸 동안 지속되는지 저장
높이가 높아졌을 때: 위에서 저장한 값 바탕으로 경사로 가능한지 판단
높이가 낮아졌을 때: 낮아진 높이의 지속 칸 수에 따라 경사로 가능 판단
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);
const map = [];
for (let i=1; i<=N; i++)
    map.push(input[i].trim().split(' ').map(Number));

// process
let sol = 0;
for (let i=0; i<N; i++)
    sol += can_cross(i);

// output
console.log(sol);

// functions
function can_cross(idx)
{
    let prev_height, prev_cnt;
    let cnt = 0;
    let ok = true;

    // 행 확인
    prev_height = map[idx][0];
    prev_cnt = 1;
    for (let i=1; i<N; i++)
    {
        if (prev_height === map[idx][i])
        {
            prev_cnt++;
        }
        // 높이차 발생
        // 높아지는 경우
        else if (prev_height < map[idx][i])
        {
            // 높이차가 1일 경우
            if (prev_height + 1 === map[idx][i])
            {
                // 경사로 놓을 수 있음
                if (prev_cnt >= L)
                {
                    prev_height = map[idx][i];
                    prev_cnt = 1;
                }
                // 경사로 놓을 수 없음
                else
                {
                    ok = false;
                    break;
                }
            }
            // 높이차가 너무 큼
            else
            {
                ok = false;
                break;
            }
        }
        // 낮아지는 경우
        else if (prev_height > map[idx][i])
        {
            // 높이차가 1일 경우
            if (prev_height - 1 === map[idx][i])
            {
                // 미래를 보고 경사로를 놓을 수 있는지 판단
                let next_cnt = 0;
                let next_height = map[idx][i];
                for (let j=i; j<N; j++)
                {
                    if (map[idx][j] === next_height)
                        next_cnt++;
                    else
                        break;
                }
                // 경사로를 놓을 수 있음
                if (next_cnt >= L)
                {
                    i = i + L - 1;
                    prev_height = next_height;
                    prev_cnt = 0;
                }
                // 없음
                else
                {
                    ok = false;
                    break;
                }
            }
            // 높이차가 너무 큼
            else
            {
                ok = false;
                break;
            }
        }
    }
    if (ok)
        cnt++;

    // 열 확인
    ok = true;
    prev_height = map[0][idx];
    prev_cnt = 1;
    for (let i=1; i<N; i++)
    {
        if (prev_height === map[i][idx])
        {
            prev_cnt++;
        }
        // 높이차 발생
        // 높아지는 경우
        else if (prev_height < map[i][idx])
        {
            // 높이차가 1일 경우
            if (prev_height + 1 === map[i][idx])
            {
                // 경사로 놓을 수 있음
                if (prev_cnt >= L)
                {
                    prev_height = map[i][idx];
                    prev_cnt = 1;
                }
                // 경사로 놓을 수 없음
                else
                {
                    ok = false;
                    break;
                }
            }
            // 높이차가 너무 큼
            else
            {
                ok = false;
                break;
            }
        }
        // 낮아지는 경우
        else if (prev_height > map[i][idx])
        {
            // 높이차가 1일 경우
            if (prev_height - 1 === map[i][idx])
            {
                // 미래를 보고 경사로를 놓을 수 있는지 판단
                let next_cnt = 0;
                let next_height = map[i][idx];
                for (let j=i; j<N; j++)
                {
                    if (map[j][idx] === next_height)
                        next_cnt++;
                    else
                        break;
                }
                // 경사로를 놓을 수 있음
                if (next_cnt >= L)
                {
                    i = i + L - 1;
                    prev_height = next_height;
                    prev_cnt = 0;
                }
                // 없음
                else
                {
                    ok = false;
                    break;
                }
            }
            // 높이차가 너무 큼
            else
            {
                ok = false;
                break;
            }
        }
    }
    if (ok)
        cnt++;
    
    return cnt;
}