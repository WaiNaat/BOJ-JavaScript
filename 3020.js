/*
길이 N인 배열을 만든다
종유석 또는 석순의 시작점에 1을 찍는다
종유석 또는 석순의 (끝나는 위치-1)에 -1을 찍는다
이걸로 부분합을 구한다
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, H, ...size] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
// 종유석과 석순의 시작점과 끝점 기록
const cave = new Array(H).fill(0);

let flag = true;
for (let s of size)
{
    if (flag) // 석순
    {
        cave[H - s] += 1;
    }
    else // 종유석
    {
        cave[0] += 1;
        cave[s] += -1;
    }

    flag = !flag;
}

// 부분합 계산
for (let i=1; i<H; i++)
    cave[i] = cave[i - 1] + cave[i];

// 정렬해서 정답 계산
cave.sort((a, b) => b - a);

let minVal = cave[H - 1];
let cnt = 0;
while (cave[cave.length - 1] === minVal)
{
    cnt++;
    cave.pop();
}

// output
console.log(minVal, cnt);