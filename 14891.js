/*
덱을 이용해서 톱니바퀴 1개 구현 가능
한 번의 회전에 대해 모두 동시에 돌아가는 것.
본인 왼쪽 어디까지, 오른쪽 어디까지 돌아가는지 봐야 함.
톱니바퀴 무조건 4개
    굳이 덱 구현 안하고 shift unshift로 해도
    시간복잡도 크게 증가 안할듯?
*/

// 톱니 구현
class Gear
{
    constructor(state)
    {
        this.state = state;
    }

    clockwise()
    {
        let val = this.state.pop();
        this.state.unshift(val);
    }

    anticlockwise()
    {
        this.state.push(this.state.shift());
    }

    getTop()
    {
        return this.state[0];
    }

    getLeft()
    {
        return this.state[6];
    }

    getRight()
    {
        return this.state[2];
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const gears = [undefined];
for (let i=0; i<4; i++)
    gears.push(new Gear(input[i].trim().split('').map(Number)));
const K = Number(input[4]);
const turn_commands = [];
for (let i=5; i<5+K; i++)
    turn_commands.push(input[i].trim().split(' ').map(Number));

// process
for (let [idx, turn] of turn_commands)
{
    let turns = [[idx, turn]];
    // 왼쪽으로 어디까지 도는지
    let prev_turn = turn;
    let prev_left = gears[idx].getLeft();
    for (let i=idx-1; i>=1; i--)
    {
        if (prev_left != gears[i].getRight())
        {
            turns.push([i, -prev_turn]);
            prev_turn = -prev_turn;
            prev_left = gears[i].getLeft();
        }
        else
            break;
    }

    // 오른쪽으로 어디까지 도는지
    prev_turn = turn;
    let prev_right = gears[idx].getRight();
    for (let i=idx+1; i<=4; i++)
    {
        if (prev_right != gears[i].getLeft())
        {
            turns.push([i, -prev_turn]);
            prev_turn = -prev_turn;
            prev_right = gears[i].getRight();
        }
        else
            break;
    }

    // 회전
    for (let [i, t] of turns)
    {
        if (t === 1)
            gears[i].clockwise();
        else
            gears[i].anticlockwise();
    }
}

// output
console.log(
    gears[1].getTop() + 
    gears[2].getTop() * 2 + 
    gears[3].getTop() * 4 +  
    gears[4].getTop() * 8
);