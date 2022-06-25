/*
벽은 무조건 3개 새워야 함
>> 백트래킹으로 3개 고른다

bfs << 큐 구현하기 귀찮음
dfs 사용해서 바이러스 퍼뜨림

안전 영역을 구하는 게 문제
    입력값 주어졌을 때 초기 빈칸 개수 세고
    바이러스 퍼질때마다 뺌

입력값 전처리
    빈칸 개수
    바이러스 위치
    빈칸의 위치를 저장한 배열
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().split('\n');

const [row, col] = input[0].split(' ').map(Number);
const initial_lab = [];
for (let i=1; i<=row; i++)
    initial_lab.push(input[i].split(' ').map(Number));

// process
// 전처리
const initial_virus = [];
let empty_num = 0;
const empty_coord = [];

for (let r=0; r<row; r++)
{
    for (let c=0; c<col; c++)
    {
        if (initial_lab[r][c] === 0)
        {
            empty_num++;
            empty_coord.push([r, c]);
        }
        else if (initial_lab[r][c] == 2)
        {
            initial_virus.push([r, c]);
            initial_lab[r][c] = 0;
        }
    }
}

// 계산
let sol = 0;
const wall = [];
put_wall(0, 0);

// output
console.log(sol);

// functions
function put_wall(wall_cnt, idx)
{
    // base case
    if (wall_cnt === 3)
    {
        sol = Math.max(dfs(), sol);
        return;
    }

    // recursive step
    for (let i=idx; i<empty_num; i++)
    {
        wall.push(i);
        put_wall(wall_cnt + 1, i + 1)
        wall.pop();
    }
}

function dfs()
{    
    let lab = [];
    for (let i=0; i<row; i++)
        lab.push(Array.from(initial_lab[i]));
    
    // 벽 세우기
    for (let i of wall)
        lab[empty_coord[i][0]][empty_coord[i][1]] = 1;
    
    // dfs
    let cnt = 0;
    let stack = Array.from(initial_virus);
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (lab[r][c] != 0) continue;
        lab[r][c] = 2;
        cnt++;

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (!(0 <= r2 && r2 < row && 0 <= c2 && c2 < col))
                continue;
            
            if (lab[r2][c2] == 0)
            {
                stack.push([r2, c2]);
            }
        }
    }

    return empty_num + initial_virus.length - cnt - 3;
}