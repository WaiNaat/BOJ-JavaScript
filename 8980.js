/*
그리디
마을에 도착해서 택배를 고를 때 도착지가 가까운 순서대로 고른다.

이러면 안됨
반례
4 10
3
1 4 10
2 3 10
3 4 10
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const M = Number(input[1]);
const info = input.slice(2).map(x => x.trim().split(' ').map(Number));

// process
// 택배 정보들을 출발지/도착지 기준 오름차순으로 정렬
info.sort((a, b) => a[0] != b[0]? a[0] - b[0] : a[1] - b[1]);

// 트럭 이동
let sol = 0;
let box_cnt = 0;
let truck = new Array(N + 1).fill(0);
let i = 0;

for (let town=1; town<=N; town++)
{
    // 택배 전달
    sol += truck[town];
    box_cnt -= truck[town];
    truck[town] = 0;
    
    // 택배 싣기
    while (i < M && info[i][0] == town)
    {
        if (box_cnt < C)
        {
            if (info[i][2] + box_cnt <= C)
            {
                truck[info[i][1]] += info[i][2];
                box_cnt += info[i][2];
            }
            else
            {
                truck[info[i][1]] += C - box_cnt;
                box_cnt = C;
            }
        }
        i++;
    }

    console.log(truck.join(' '));
}

// output
console.log(sol);

