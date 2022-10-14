/*
물웅덩이를 시작점 오름차순으로 정렬
현재 마지막 널빤지의 위치를 보고 현재 물웅덩이가 덮였는지 아닌지 확인
    아예 안덮었으면 현재 물웅덩이 시작점부터 덮음
    덮다 말았으면 마지막 널빤지 다음 위치부터 덮음
    다 덮여있으면 패스

참고) 웅덩이 시작은 물에 덮여있고 끝은 아님
>> 계산편하게 덮여있게 만들어줌
*/
// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [[N, L], ...puddle] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(line => line.split(' ').map(Number));

// process
let total_cnt = 0;
let board_end = -1;

puddle.sort((a, b) => a[0] - b[0]);

for (let [start, end] of puddle)
{
    end--;
    
    if (board_end >= end)
        continue;
    else if (board_end < start)
    {
        let cnt = Math.ceil((end - start + 1) / L);
        total_cnt += cnt;
        board_end = start + L * cnt - 1;
    }
    else
    {
        let cnt = Math.ceil((end - board_end) / L);
        total_cnt += cnt;
        board_end = board_end + L * cnt;
    }
}

// output
console.log(total_cnt);