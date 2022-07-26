/*
https://yabmoons.tistory.com/284
이거랑 같은풀인데 왜 시간초과?
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const info = input.slice(1).map(x => x.trim().split(' ').map(Number));

// process
let sol = 0;
const batters = new Array(9);
const visited = new Array(9);

batters[3] = 0;
visited[3] = true;

batting_order(1);

// output
console.log(sol);

// functions
function batting_order(player)
{
    // base case
    if (player === 9)
    {
        play_game();
        return;
    }

    // recursive step
    for (let i=0; i<9; i++)
    {
        if (visited[i]) continue;

        visited[i] = true;
        batters[i] = player;

        batting_order(player + 1);

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
        let next_inning;
        let base = new Array(4);

        while (true)
        {
            for (let i=batter_idx; i<9; i++)
            {
                let batter_result = info[inning][batters[i]];

                if (batter_result == 0)
                    out++;
                else if (batter_result == 1)
                {
                    for (let b=3; b>=1; b--)
                    {
                        if (base[b] == 1)
                        {
                            if (b == 3)
                            {
                                base[b] = 0;
                                score++;
                            }
                            else
                            {
                                base[b + 1] = 1;
                                base[b] = 0;
                            }
                        }
                    }
                    base[1] = 1;
                }
                else if (batter_result == 2)
                {
                    for (let b=3; b>=1; b--)
                    {
                        if (base[b] == 1)
                        {
                            if (b == 3 || b == 2)
                            {
                                base[b] = 0;
                                score++;
                            }
                            else
                            {
                                base[b + 2] = 1;
                                base[b] = 0;
                            }
                        }
                    }
                    base[2] = 1;
                }
                else if (batter_result == 3)
                {
                    for (let b=3; b>=1; b--)
                    {
                        if (base[b] == 1)
                        {
                            base[b] = 0;
                            score++;
                        }
                    }
                    base[3] = 1;
                }
                else
                {
                    for (let b=3; b>=1; b--)
                    {
                        if (base[b] == 1)
                        {
                            base[b] = 0;
                            score++;
                        }
                    }
                    score++;
                }

                if (out == 3)
                {
                    batter_idx = i + 1;
                    if (batter_idx == 9) batter_idx = 0;

                    next_inning = true;
                    break;
                }
            }

            if (next_inning) break;

            batter_idx = 0;
        }
    }

    sol = Math.max(sol, score);
}