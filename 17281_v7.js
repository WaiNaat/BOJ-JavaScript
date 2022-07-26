/// 시간 초과 ///
// 왜 이닝 구현을 이렇게하면 1% 시간초과지?

/*
8! = 40320 이므로 백트래킹으로 순열 짜서 계산
경기 진행은 그냥 구현

여러 답과 여태까지 내 풀이의 차이:
    내 백트래킹은 깊이가 9인데
    답은 깊이가 8임

    내 백트래킹은 타순대로 채움
        타순1은 몇번선수, 타순2는 몇번선수, ... , 타순9는 몇번선수
        아직 타순이 정해지지 않은 선수를 찾아서 타순을 부여해줌
    답은 타자번호대로 채움
        1번선수는 타순4, 2번선수는 타순?, 3번선수는 타순?, ... , 9번선수는 타순?
        아직 해당 타순에 나갈 선수가 정해지지 않았으면 선수를 지정해줌
    
    이러면 1번은 타순4가 고정이라 깊이가 8이 됨
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
        let score = play_game();
        sol = Math.max(sol, score);
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