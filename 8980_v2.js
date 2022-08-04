/*
답지에서 그리디에 사용하는 '기준'이 뭐지?
'i번 마을에 도착했을 때 현재까지 배달한 박스 수'가 항상 최대.
    이걸 쓰려면 도착지 기준 오름차순 정렬을 해야 하는 건 맞음
    이걸 이루려면 i번 마을에 도착하는 택배들을 가능한 한 많이 실어야 함
    출발지를 j라 하면 j~i-1번 마을을 지가나는 트럭의 남은 용량을 줄여야 함

마을별 초기값이 C인 배열의 의미
    트럭이 해당 마을을 지나갈 때 남은 용량
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const M = Number(input[1]);
const info = input.slice(2).map(x => x.trim().split(' ').map(Number));

// process
// 택배 정보들을 도착지 오름차순 정렬
info.sort((a, b) => a[1] - b[1]);

// 트럭 이동
let sol = 0;
let truck = new Array(N).fill(C);

for (let [start, end, box] of info)
{
    // 출발지에서 도착지까지 최대 얼마나 실을 수 있는지 계산
    let max_box = C;
    for (let i=start; i<end; i++)
        max_box = Math.min(truck[i], max_box);

    if (max_box == 0) continue;
    
    // 박스 개수와 비교해서 실을 수 있는 양 계산
    if (box > max_box)
        box = max_box;
    
    // 박스 싣기
    sol += box;
    for (let i=start; i<end; i++)
        truck[i] -= box;
}

// output
console.log(sol);