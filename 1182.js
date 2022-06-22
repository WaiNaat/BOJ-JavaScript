/*
백트래킹
재귀 직후에 S인지 검사
아니면 추가 재귀
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [N, S, ... seq] = require('fs').readFileSync(inputFile).toString().trim().split(/\s/).map(Number);

// process
let count = 0;
let visited = new Array(N);

find_subseq_sum(0, 0, 0);

// output
console.log(count);

// function
function find_subseq_sum(current_index, current_sum, depth)
{
    if (depth > 0 && current_sum === S)
        count++;

    if (depth === N) return;

    for (let i=current_index; i<N; i++)
    {
        if (visited[i]) continue;

        visited[i] = true;
        current_sum += seq[i];
        
        find_subseq_sum(i, current_sum, depth + 1);

        current_sum -= seq[i];
        visited[i] = false;
    }
}