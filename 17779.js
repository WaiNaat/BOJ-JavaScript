/*
순수 구현
1. x, y 정하기
2. d1, d2 정하기
3. 5번 선거구 경계선 표시    
4. 선거구 인구수 계산
    5번 인구수 세는 법
        현재 행이 5번 선거구 위쪽 경계와 아래쪽 경계 사이일 때
        경계선을 만난 횟수를 이용해서 안팎 구분 가능
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const city = Array.from(input.slice(1), x => x.trim().split(' ').map(Number));

// process
let sol = Infinity;

// x, y, d2, d1 정하기
for (let x=0; x<N-2; x++)
{
    for (let y=1; y<N-1; y++)
    {
        for (let d1=1; d1<N; d1++)
        {
            for (let d2=1; d2<N; d2++)
            {
                if (!(0<=y-d1 && y+d2<N && x+d1+d2<N)) continue;
    
                const population = [0, 0, 0, 0, 0];
                const border = Array.from(new Array(N), () => new Array(N).fill(false));

                // 5번 선거구 경계선 그리기
                for (let i=0; i<=d1; i++)
                {
                    if (!border[x + i][y - i])
                    {
                        border[x + i][y - i] = true;
                    }

                    if (!border[x + d2 + i][y + d2 - i])
                    {
                        border[x + d2 + i][y + d2 - i] = true;
                    }
                }

                for (let i=0; i<=d2; i++)
                {
                    if (!border[x + i][y + i])
                    {
                        border[x + i][y + i] = true;
                    }
                    
                    if (!border[x + d1 + i][y - d1 + i])
                    {
                        border[x + d1 + i][y - d1 + i] = true;
                    }
                }

                // 선거구 인구수 계산
                for (let r=0; r<N; r++)
                {
                    let border_cnt = 0;

                    for (let c=0; c<N; c++)
                    {
                        let area;

                        if ((r == x || r == x + d1 + d2) && border[r][c])
                            area = 4;
                        else
                        {
                            if (border[r][c])
                                border_cnt++;

                            if (border_cnt == 1 || (border_cnt == 2 && border[r][c]))
                                area = 4;
                            else if (0 <= r && r < x + d1 && 0 <= c && c <= y)
                                area = 0;
                            else if (0 <= r && r <= x + d2 && y < c && c < N)
                                area = 1;
                            else if (x + d1 <= r && r < N && 0 <= c && c < y - d1 + d2)
                                area = 2;
                            else
                                area = 3;
                        }
                        population[area] += city[r][c];
                    }
                }
                
                // 인구 차이 계산
                sol = Math.min(sol, Math.max(...population) - Math.min(...population));
            }
        }
    }
}

// output
console.log(sol);