/*
opt(start, end) := start부터 end까지의 수가 팰린드롬인지 여부
number(i) := i번째 수
opt(start, end) = 
    number(start) == number(end) 이고
    opt(start+1, end-1) == True 면 True

처음에 opt(i, i)랑 opt(i, i+1) 이거먼저 채우고
질문들어올때 재귀로 해결

이러면 max(N)=2000이고 최악의경우 N^2칸을 전부 채우는경우라 얼마 안됨
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const N = Number(input[0]);
const number = input[1].split(' ').map(Number);
const M = Number(input[2]);
const question = input.slice(3).map(x => x.split(' ').map(x => Number(x) - 1));

// process
const opt = Array.from(new Array(N), () => new Array(N));
const sol = [];

for (let i=0; i<N; i++)
{
    opt[i][i] = true;
    if (i < N - 1)
        opt[i][i + 1] = number[i] === number[i + 1]? true : false;
}

for (let [start, end] of question)
    sol.push(is_palindrome(start, end)? 1 : 0);

// output
console.log(sol.join('\n'));

// function
function is_palindrome(start, end)
{
    // base case
    if (opt[start][end] !== undefined)
        return opt[start][end];

    // recursive step
    if (number[start] === number[end] && is_palindrome(start + 1, end - 1))
        opt[start][end] = true;
    else
        opt[start][end] = false;

    return opt[start][end];
}