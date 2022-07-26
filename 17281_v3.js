/// 시간 초과 ///

/*
8! = 40320 이므로 백트래킹으로 순열 짜서 계산
경기 진행은 그냥 구현
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const info = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
let sol = 0;
const batters = [];
const visited = new Array(9);

batting_order();

// output
console.log(sol);

// functions
function batting_order()
{
    // base case
    if (batters.length === 9)
    {
        let score = play_game();
        if (score == 89) console.log(batters);
        sol = Math.max(sol, score);
        return;
    }

    // recursive step
    if (batters.length == 3)
    {
        batters.push(0);
        batting_order();
        batters.pop();
        return;
    }

    for (let i=1; i<9; i++)
    {
        if (visited[i]) continue;

        visited[i] = true;
        batters.push(i);

        batting_order();

        batters.pop();
        visited[i] = false;
    }
}

function play_game()
{
    let score = 0;
    let batter_idx = 0;

    for (let inning=0; inning<N; inning++)
    {
        let out = 0;
        let base1, base2, base3;
        let inning_info = info[inning];

        while (out < 3)
        {
            let batter_result = inning_info[batters[batter_idx]];

            switch(batter_result)
            {
                case 0:
                    out++;
                    break;
                case 1:
                    if (base3) score++;
                    [base1, base2, base3] = [true, base1, base2];
                    break;
                case 2:
                    if (base3) score++;
                    if (base2) score++;
                    [base1, base2, base3] = [false, true, base1];
                    break;
                case 3:
                    if (base3) score++;
                    if (base2) score++;
                    if (base1) score++;
                    [base1, base2, base3] = [false, false, true];
                    break;
                default:
                    if (base3) score++;
                    if (base2) score++;
                    if (base1) score++;
                    score++;
                    base1 = base2 = base3 = false;
            }
            
            batter_idx = (batter_idx + 1) % 9;
        }
    }

    return score;
}