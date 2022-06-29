/*
순수 구현 문제
*/

// 주사위 구현
class Dice
{
    constructor()
    {
        this.top = 0;
        this.bottom = 0;
        this.north = 0;
        this.south = 0;
        this.east = 0;
        this.west = 0;
    }

    move(direction)
    {
        let tmp_top, tmp_bottom, tmp_north, tmp_south, tmp_east, tmp_west;
        
        switch(direction)
        {
            // 동
            case 1:
                tmp_top = this.west;
                tmp_bottom = this.east;
                tmp_north = this.north;
                tmp_south = this.south;
                tmp_east = this.top;
                tmp_west = this.bottom;
                break;

            // 서
            case 2:
                tmp_top = this.east;
                tmp_bottom = this.west;
                tmp_north = this.north;
                tmp_south = this.south;
                tmp_east = this.bottom;
                tmp_west = this.top;
                break;

            // 북
            case 3:
                tmp_top = this.south;
                tmp_bottom = this.north;
                tmp_north = this.top;
                tmp_south = this.bottom;
                tmp_east = this.east;
                tmp_west = this.west;
                break;

            // 남
            default:
                tmp_top = this.north;
                tmp_bottom = this.south;
                tmp_north = this.bottom;
                tmp_south = this.top;
                tmp_east = this.east;
                tmp_west = this.west;
        }
        
        this.top = tmp_top;
        this.bottom = tmp_bottom;
        this.north = tmp_north;
        this.south = tmp_south;
        this.east = tmp_east;
        this.west = tmp_west;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col, x, y, K] = input[0].trim().split(' ').map(Number);
const map = [];
for (let i=1; i<=row; i++)
    map.push(input[i].trim().split(' ').map(Number));
const commands = input[row + 1].trim().split(' ').map(Number);

// process
const sol = [];
const directions = [undefined, [0, 1], [0, -1], [-1, 0], [1, 0]];
const dice = new Dice();
let r = x;
let c = y;

for (let cmd of commands)
{
    let [dr, dc] = directions[cmd];
    let r2 = r + dr;
    let c2 = c + dc;

    if (0 > r2 || r2 >= row || 0 > c2 || c2 >= col)
        continue;
    
    dice.move(cmd);
    sol.push(dice.top);
    
    r = r2;
    c = c2;

    if (map[r][c] === 0)
        map[r][c] = dice.bottom;
    else
    {
        dice.bottom = map[r][c];
        map[r][c] = 0;
    }
}

// output
console.log(sol.join('\n'));