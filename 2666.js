/*
초기 문 2개
벽장을 사용할 때마다 두 문 중 하나를 움직임
>> 총 2^20가지 경우의 수: 완전탐색 가능
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [_, door1, door2, __, ... use] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let prev = [new State(door1, door2, 0)];

for (let u of use)
{
    const cur = [];

    for (let p of prev)
    {
        // door1을 움직임
        cur.push(new State(u, p.door2, p.move + Math.abs(u - p.door1)));
        // door2를 움직임
        cur.push(new State(p.door1, u, p.move + Math.abs(u - p.door2)));
    }

    prev = cur;
}

let sol = Infinity;
for (let state of prev)
    sol = Math.min(sol, state.move);

// output
console.log(sol);

// function
function State(door1, door2, move)
{
    this.door1 = door1;
    this.door2 = door2;
    this.move = move;
}