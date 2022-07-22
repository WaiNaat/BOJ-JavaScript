/*
그냥 무식하게 구현해보기

어항 쌓기는 이차원 배열로 할거면 
밑으로 쌓고 반시계방향으로 돌리는 쪽으로
구현하는 게 편할듯?
*/

// constants
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
let [N, K, ... fish] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let cnt = 0;

while (Math.max(...fish) - Math.min(...fish) > K)
{
    cnt++;

    // 물고기 수가 최소인 어항에 물고기 넣기
    let min_idx = [];
    let min_val = Infinity;

    for (let i=0; i<N; i++)
    {
        if (fish[i] < min_val)
        {
            min_idx = [i];
            min_val = fish[i];
        }
        else if (fish[i] == min_val)
            min_idx.push(i);
    }

    for (let i of min_idx)
        fish[i]++;
        
    // 어항 쌓기
    fish = stack_fishbowl_90(fish);
    
    // 물고기 수 조절하기
    fish = control_fish_number(fish);
    
    // 어항 일렬로 늘어놓기
    fish = make_line(fish);
    
    // 어항 쌓기
    fish = stack_fishbowl_180([fish]);
    fish = stack_fishbowl_180(fish);
    
    // 물고기 수 조절하기
    fish = control_fish_number(fish);

    // 일렬로 늘어놓기
    fish = make_line(fish);
}


// output
console.log(cnt);

// functions
function stack_fishbowl_90(fish)
{
    let newFish = [fish.slice(1), [fish[0]]];

    while (newFish.length <= (newFish[0].length - newFish[newFish.length - 1].length))
    {
        // 회전해야 하는 어항들 따로 분리
        let rotate_fish = [newFish[0].slice(0, newFish[newFish.length - 1].length)];
        let floor_fish = [newFish[0].slice(newFish[newFish.length - 1].length)];

        for (let i=1; i<newFish.length; i++)
            rotate_fish.push(newFish[i]);

        // 90도 반시계 회전
        for (let c=rotate_fish[0].length-1; c>=0; c--)
        {
            let tmp = [];
            for (let r=0; r<rotate_fish.length; r++)
            {
                tmp.push(rotate_fish[r][c]);
            }

            floor_fish.push(tmp);
        }

        newFish = floor_fish;
    }

    return newFish;
}

function control_fish_number(fish)
{
    const newFish = Array.from(fish, row => new Array(row.length).fill(0));

    for (let r=0; r<fish.length; r++)
    {
        for (let c=0; c<fish[r].length; c++)
        {
            let self_fish = fish[r][c];

            for (let [dr, dc] of directions)
            {
                let r2 = r + dr;
                let c2 = c + dc;

                if (0 > r2 || r2 >= fish.length || 0 > c2 || c2 >= fish[r2].length)
                    continue;

                // 본인 주변 어항 중에 본인보다 물고기가 적으면 나눠줌
                if (fish[r][c] > fish[r2][c2])
                {
                    let val = Math.floor((fish[r][c] - fish[r2][c2]) / 5)
                    newFish[r2][c2] += val;
                    self_fish -= val;
                }
            }

            // 나눠주고 남은 물고기는 제자리에
            newFish[r][c] += self_fish;
        }
    }

    return newFish;
}

function make_line(fish)
{
    const newFish = [];

    for (let c=0; c<fish[fish.length - 1].length; c++)
    {
        for (let r=0; r<fish.length; r++)
            newFish.push(fish[r][c]);
    }

    for (let c=fish[fish.length - 1].length; c<fish[0].length; c++)
        newFish.push(fish[0][c]);

    return newFish;
}

function stack_fishbowl_180(fish)
{
    let rotate_fish = [];
    let floor_fish = [];

    // 돌릴 부분과 아닌 부분 나누기
    for (let r=0; r<fish.length; r++)
    {
        let rotate_tmp = [];
        let floor_tmp = [];

        for (let c=0; c<fish[r].length; c++)
        {
            if (c < fish[r].length / 2)
                rotate_tmp.push(fish[r][c]);
            else
                floor_tmp.push(fish[r][c]);
        }

        rotate_fish.push(rotate_tmp);
        floor_fish.push(floor_tmp);
    }

    // 돌리기
    for (let r=rotate_fish.length-1; r>=0; r--)
    {
        let tmp = [];

        for (let c=rotate_fish[0].length-1; c>=0; c--)
            tmp.push(rotate_fish[r][c]);
        
        floor_fish.push(tmp);
    }

    return floor_fish;
}