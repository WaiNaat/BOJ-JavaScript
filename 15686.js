/*
입력값 정리
    집 위치를 저장하는 배열
    치킨집 위치를 저장하는 배열
    이거 두개로 나눔

치킨집중에 M개 뽑아서 각 조합마다 치킨거리 계산
조합 계산에 백트래킹 사용
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const house = [];
const chicken = [];

for (let r=0; r<N; r++)
{
    const line = input[r + 1].split(' ');

    for (let c=0; c<N; c++)
    {
        if (line[c] == '1')
            house.push([r, c]);
        else if (line[c] == '2')
            chicken.push([r, c]);
    }
}

// process
let sol = Infinity;
const pick = [];
pick_chicken_place(0, 0);

// output
console.log(sol);

// functions
function pick_chicken_place(depth, next_index)
/*
M개의 치킨집을 고르는 조합을 계산해서 pick 배열에 저장함
pick에 저장하는 값은 치킨집의 좌표가 아니라 chicken 배열에서의 인덱스.
*/
{
    // base case
    if (depth === M)
    {
        sol = Math.min(sol, calc_chicken_distance());
        return;
    }

    // recursive step
    for (let i=next_index; i<chicken.length; i++)
    {
        pick.push(i);
        pick_chicken_place(depth + 1, i + 1);
        pick.pop();
    }
}

function calc_chicken_distance()
{
    let total_chicken_dist = 0;

    for (let [x1, y1] of house)
    {
        let chicken_dist = Infinity;

        for (let i of pick)
            chicken_dist = Math.min(chicken_dist, distance(x1, y1, ... chicken[i]));

        total_chicken_dist += chicken_dist
    }

    return total_chicken_dist;
}

function distance(x1, y1, x2, y2)
{
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}