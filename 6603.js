/*
visited를 이용해서 고른 숫자 피하기
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');

const sols = [];
let sol;
for (let i=0; input[i]!='0'; i++)
{
    const [k, ... S] = input[i].split(' ').map(Number);

// process
    sol = [];
    lotto(k, S, [], new Array(S.length));
    sols.push(sol.join('\n'));
}

// output
console.log(sols.join('\n\n'));

// function
function lotto(k, S, lotto_case, visited)
{
    if (lotto_case.length == 6)
    {
        sol.push(lotto_case.join(' '));
        return;
    }

    for (let i=0; i<S.length; i++)
    {
        if (visited[i] || lotto_case[lotto_case.length - 1] > S[i]) continue;
        visited[i] = true;
        lotto_case.push(S[i]);
        lotto(k, S, lotto_case, visited);
        visited[i] = false;
        lotto_case.pop();
    }
}