/*
각 cctv, 회전방향마다 감시하는 방향들 만들기
처음에 입력받고 각 cctv의 위치 확인
cctv 최대 8개니까 모든 회전방향 경우의 수를 골라서 시도해봄
    경우의 수 고르는건 백트래킹으로
*/

// constant
const cctv_directions_list = [ undefined,
    [
        [[0, 1]],
        [[1, 0]],
        [[-1, 0]], 
        [[0, -1]]
    ],
    [
        [[0, 1], [0, -1]],
        [[1, 0], [-1, 0]]
    ],
    [
        [[0, 1], [-1, 0]],
        [[-1, 0], [0, -1]],
        [[0, -1], [1, 0]],
        [[0, 1], [1, 0]]
    ],
    [
        [[0, -1], [1, 0], [-1, 0]],
        [[0, 1], [1, 0], [-1, 0]],
        [[0, 1], [0, -1], [-1, 0]],
        [[0, 1], [0, -1], [1, 0]]
    ],
    [
        [[0, 1], [0, -1], [1, 0], [-1, 0]]
    ]
];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [row, col] = input[0].trim().split(' ').map(Number);
const office = [];
for (let i=1; i<=row; i++)
    office.push(input[i].trim().split(' ').map(Number));

// process
// cctv 위치 파악
const cctv_number = [];
const cctv_pos = [];
let total_area = 0;

for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (office[r][c] === 0)
            total_area++;
        else if (office[r][c] != 6)
        {
            cctv_number.push(office[r][c]);
            cctv_pos.push([r, c]);
        }
    }
}

// 정답 계산
const cctv_directions = [];
let sol = Infinity;
make_direction_case(0);

// output
console.log(sol);

// functions
function make_direction_case(idx)
{
    // base case
    if (idx === cctv_number.length)
    {
        sol = Math.min(calc_blind_spot(), sol);
        return;
    }

    // recursive step
    let directions = cctv_directions_list[cctv_number[idx]];
    if (directions === undefined) console.log(cctv_number[idx]);
    for (let i=0; i<directions.length; i++)
    {
        cctv_directions.push(i);
        make_direction_case(idx + 1);
        cctv_directions.pop();
    }
}

function calc_blind_spot()
{
    const tmp_office = [];
    for (let i=0; i<row; i++)
        tmp_office.push(Array.from(office[i]));
    
    let not_blind_area = 0;
    
    // cctv 선택
    for (let i=0; i<cctv_number.length; i++)
    {
        // 해당 cctv가 보고 있는 방향 선택
        let directions = cctv_directions_list[cctv_number[i]][cctv_directions[i]];

        // 해당 cctv가 볼 수 있는 방향들을 봄
        for (let [dr, dc] of directions)
        {
            let [r, c] = cctv_pos[i];
            while (true)
            {
                r += dr;
                c += dc;

                // 범위 벗어남
                if (0 > r || r >= row || 0 > c || c >= col)
                    break
                
                // 봄
                if (tmp_office[r][c] === 0)
                {
                    tmp_office[r][c] = -1;
                    not_blind_area++;
                }
                else if (tmp_office[r][c] === -1 || tmp_office[r][c] < 6)
                    continue;
                
                // 벽에 막힘
                else
                    break;
            }
        }
        
    }

    return total_area - not_blind_area;
}