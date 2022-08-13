/// 런타임에러 /// 

// 색깔이 제한이 2000이 아니라 200000이었음

/*
공을 색깔별로 분리해서 누적합을 구한다.
누적합 배열은 공의 크기와 색을 기준으로 2000*2000짜리를 만든다.
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const balls = [];
const prefix_sum = Array.from(new Array(2001), () => new Array(2001).fill(0));
for (let i=1; i<=N; i++)
{
    let [color, size] = input[i].trim().split(' ').map(Number);
    balls.push([color, size]);
    prefix_sum[color][size] += size;
}

// process
// 색깔별 누적합 계산
for (let color=1; color<=2000; color++)
{
    for (let size=1; size<=2000; size++)
        prefix_sum[color][size] += prefix_sum[color][size - 1];
}

// 공별로 먹을 수 있는 공들 계산
let sol = [];
for (let [color, size] of balls)
{
    let cnt = 0;
    for (let c=1; c<=2000; c++)
    {
        // 같은 색은 먹지 못함
        if (c === color) continue;

        // 본인보다 작은 크기만 먹을 수 있음
        cnt += prefix_sum[c][size - 1];
    }
    sol.push(cnt);
}

// output
console.log(sol.join('\n'));