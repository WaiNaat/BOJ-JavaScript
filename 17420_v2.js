/*
사용계획(B) 오름차순으로 정렬

i일에 깊콘을 쓰려면 두 가지 조건을 만족해야 함
1. 유통기한이 남았을 것
2. i-1일에 쓴 깊콘들보다 유통기한이 길 것 (그래야 i-1일에 깊콘들을 쓸 수 있음)
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[N], [...A], [...B]] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(x => x.trim().split(' ').map(Number));

// process
let gift = [[0, 0]];
for (i=0; i<N; i++)
    gift.push([A[i], B[i]]);
gift.sort((a, b) => a[1] - b[1]);

let sol = 0;
let cur_date = 0;
let cur_max = 0;
let prev_max = 0;

for (i=1; i<=N; i++)
{
    // 유통기한이 모자라면 늘림
    if (gift[i][0] < gift[i][1])
    {
        let cnt = Math.ceil((gift[i][1] - gift[i][0]) / 30);
        gift[i][0] += cnt * 30;
        sol += cnt;
    }

    // 날짜가 바뀌었을 경우
    if (gift[i][1] != cur_date)
    {
        prev_max = cur_max;
        cur_date = gift[i][1];
        cur_max = 0;
    }

    // 이전 날에 쓴 깊콘보다 유통기한이 짧으면 늘림
    if (gift[i][0] < prev_max)
    {
        let cnt = Math.ceil((prev_max - gift[i][0]) / 30);
        gift[i][0] += cnt * 30;
        sol += cnt;
    }
    cur_max = Math.max(cur_max, gift[i][0]);
}

// output
console.log(sol);