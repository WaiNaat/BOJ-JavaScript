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
const batters = new Array(9);
const visited = new Array(9);

batters[3] = 0;

batting_order(0);

// output
console.log(sol);

// functions
function batting_order(idx)
{
    // base case
    if (idx == 9)
    {
        let score = play_game();
        //if (score==46) console.log(batters);
        sol = Math.max(sol, score);
        return;
    }
    
    // recursive step
    if (idx == 3)
        batting_order(4);
    else
    {
        for (let i=1; i<9; i++)
        {
            if (visited[i]) continue;
    
            visited[i] = true;
            batters[idx] = i;
    
            batting_order(idx + 1);

            visited[i] = false;
        }
    }
}

function play_game()
{
    let score = 0;
    let batter_idx = 0;

    for (let inning=0; inning<N; inning++)
    {
        let out = 0;
        let base = new Array(4);
        let inning_info = info[inning];

        while (out < 3)
        {
            let batter_result = inning_info[batters[batter_idx]];

            if (batter_result == 0)
                out++;
            else
            {
                base[0] = true;

                for (let i=3; i>=0; i--)
                {
                    if (!base[i]) continue;

                    if (i + batter_result > 3)
                        score++;
                    else
                        base[i + batter_result] = true;
                    
                    base[i] = false;
                }
            }
                
            batter_idx = (batter_idx + 1) % 9;
        }
    }

    return score;
}