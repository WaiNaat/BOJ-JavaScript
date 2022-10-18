/*
슬라이딩 윈도우 응용?
'연속된 위치'의 시작점과 끝점을 기억하는 변수 둘
몇번 초밥을 몇개 먹는지 기억하는 배열
현재 먹을 수 있는 초밥의 종류를 기억하는 변수 하나
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, d, k, c, ...sushi] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let start = 1;
let end = k % N;
let sol;
let type_cnt = 0;
const sushi_count = new Array(d + 1).fill(0);

// 쿠폰 적용
sushi_count[c]++;
type_cnt++;

// 초기 '윈도우' 할당
for (let i=0; i<k; i++)
{
    if (sushi_count[sushi[i]] == 0)
        type_cnt++;
    sushi_count[sushi[i]]++;
}

sol = type_cnt;

// '윈도우' 이동
while (start != 0)
{
    // 안먹는 초밥 없애기
    sushi_count[sushi[start - 1]]--;
    if (sushi_count[sushi[start - 1]] == 0)
        type_cnt--;

    // 새롭게 먹어야 할 초밥 넣기
    if (sushi_count[sushi[end]] == 0)
        type_cnt++;
    sushi_count[sushi[end]]++;

    sol = Math.max(type_cnt, sol);

    start = (start + 1) % N;
    end = (end + 1) % N;
}

// output
console.log(sol);