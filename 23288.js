/*
주사위는 그냥 구현
점수계산은 dfs로 가능
*/
// constants
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];

// 주사위
class Dice
{
    constructor()
    {
        this.top = 1;
        this.bottom = 6;
        this.north = 2;
        this.south = 5;
        this.east = 3;
        this.west = 4;
    }

    move(direction)
    {
        if (direction == EAST)
        {
            [this.top, this.bottom, this.north, this.south, this.east, this.west] =
                [this.west, this.east, this.north, this.south, this.top, this.bottom];
        }
        else if (direction == WEST)
        {
            [this.top, this.bottom, this.north, this.south, this.east, this.west] = 
                [this.east, this.west, this.north, this.south, this.bottom, this.top];
        }
        else if (direction == SOUTH)
        {
            [this.top, this.bottom, this.north, this.south, this.east, this.west] = 
                [this.north, this.south, this.bottom, this.top, this.east, this.west];
        }
        else
        {
            [this.top, this.bottom, this.north, this.south, this.east, this.west] =
                [this.south, this.north, this.top, this.bottom, this.east, this.west];
        }
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, K] = input[0].trim().split(' ').map(Number);
const map = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
const dice = new Dice();
let d = EAST;
let r = 0;
let c = 0;
let [dr, dc] = directions[d];
let score = 0;

for (let k=0; k<K; k++)
{
    // 1
    let r2 = r + dr;
    let c2 = c + dc;

    if (out_of_bound(r2, c2))
    {
        d = (d + 2) % 4;
        [dr, dc] = directions[d];
        r2 = r + dr;
        c2 = c + dc;
    }

    dice.move(d);

    // 2
    r = r2;
    c = c2;
    score += dfs(r, c);

    // 3
    if (dice.bottom > map[r][c])
    {
        d = (d + 1) % 4;
        [dr, dc] = directions[d];
    }
    else if (dice.bottom < map[r][c])
    {
        d = (d + 3) % 4;
        [dr, dc] = directions[d];
    }
}

// output
console.log(score);

// functions
function out_of_bound(r, c)
{
    if (0 > r || r >= row || 0 > c || c >= col) return true;
    else return false;
}

function dfs(r, c)
{
    const stack = [[r, c]];
    const visited = Array.from(new Array(row), () => new Array(col));
    let val = map[r][c];
    let cnt = 0;

    while (stack.length > 0)
    {
        let [r, c] = stack.pop();

        if (visited[r][c]) continue;
        visited[r][c] = true;
        cnt++;

        for (let [dr, dc] of directions)
        {
            let r2 = r + dr;
            let c2 = c + dc;

            if (out_of_bound(r2, c2) || visited[r2][c2])
                continue;
            
            if (map[r2][c2] == val)
                stack.push([r2, c2]);
        }
    }

    return cnt * val;
}