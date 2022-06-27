/*
단순 구현 문제
구현할 것:
    현재 위치 청소하기
    왼쪽 확인하기
    좌회전 후 직진하기
    좌회전하기
    뒤쪽 보기
    후진하기
*/

// 청소기 구현
class Cleaner
{
    /*
    0: 북
    1: 동
    2: 남
    3: 서
    */
    constructor(row, col, direction)
    {
        this.row = row;
        this.col = col;
        this.direction = direction;
    }

    get_position()
    {
        return [this.row, this.col];
    }

    look_left()
    {
        switch(this.direction)
        {
            case 0:
                return [this.row, this.col - 1];
            case 1:
                return [this.row - 1, this.col];
            case 2:
                return [this.row, this.col + 1];
            default:
                return [this.row + 1, this.col];
        }
    }

    look_back()
    {
        switch(this.direction)
        {
            case 0:
                return [this.row + 1, this.col];
            case 1:
                return [this.row, this.col - 1];
            case 2:
                return [this.row - 1, this.col];
            default:
                return [this.row, this.col + 1];
        }
    }

    turn_left()
    {
        this.direction = (this.direction + 3) % 4;
    }

    move_forward()
    {
        switch(this.direction)
        {
            case 0:
                this.row--;
                break;
            case 1:
                this.col++;
                break;
            case 2:
                this.row++;
                break;
            default:
                this.col--;
        }
    }

    move_backward()
    {
        switch(this.direction)
        {
            case 0:
                this.row++;
                break;
            case 1:
                this.col--;
                break;
            case 2:
                this.row--;
                break;
            default:
                this.col++;
        }
    }
}

// 청소 구역 관련
class Area
{
    constructor(room)
    {
        this.room = room;
        this.clean_cnt = 0;
    }

    clean(row, col)
    {
        if (this.room[row][col] == 0)
        {
            this.room[row][col] = 2;
            this.clean_cnt++;
        }
    }

    is_not_clean(row, col)
    {
        return this.room[row][col] === 0;
    }

    is_wall(row, col)
    {
        return this.room[row][col] === 1;
    }
}

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [row, col] = input[0].trim().split(' ').map(Number);
const [init_row, init_col, init_dir] = input[1].trim().split(' ').map(Number);
const room = [];
for (let i=2; i<=row+1; i++)
    room.push(input[i].trim().split(' ').map(Number));

// process
const cleaner = new Cleaner(init_row, init_col, init_dir);
const area = new Area(room);
let turn_cnt = 0;
let isEnd = false;
while (!isEnd)
{
    // 1
    area.clean(... cleaner.get_position());

    // 2
    turn_cnt = 0;
    while (true)
    {
        // 2a
        if (area.is_not_clean(... cleaner.look_left()))
        {
            cleaner.turn_left();
            cleaner.move_forward();
            break;
        }
        else
        {
            cleaner.turn_left();
        }
        turn_cnt++;

        // 2b
        if (turn_cnt === 4)
        {
            if (area.is_wall(... cleaner.look_back()))
            {
                isEnd = true;
                break;
            }
            else
            {
                cleaner.move_backward();
                break;
            }
        }
    }
}

// output
console.log(area.clean_cnt);