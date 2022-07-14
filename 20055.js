/*
벨트를 덱으로 구현하면 회전이 편하지만
어차피 로봇 이동때문에 순회를 해야 해서
벨트를 일반 배열로 만들더라도 시간복잡도에 큰 차이가 없음
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, K, ... A] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/);

// process
const START = 0;
const END = N - 1;
const ROBOT = 1;

const belt = new Array(2 * N);
let zero_durability_cnt = 0;
let turn = 0;

while (zero_durability_cnt < K)
{
    turn++;

    // 1
    belt.unshift(belt.pop());
    A.unshift(A.pop());
    pop_robot();

    // 2
    for (let i=END-1; i>=START; i--)
    {
        if (belt[i] === ROBOT && belt[i + 1] !== ROBOT && A[i + 1] > 0)
        {
            belt[i] = null;
            belt[i + 1] = ROBOT;
            reduce_durability(i + 1);
        }
    }
    pop_robot();

    // 3
    if (A[START] > 0)
    {
        belt[START] = ROBOT;
        reduce_durability(START);
    }
}

// output
console.log(turn);

// function
function pop_robot()
{
    if (belt[END] === ROBOT)
        belt[END] = null;
}

function reduce_durability(i)
{
    A[i] -= 1;
    if (A[i] === 0)
        zero_durability_cnt++;
}