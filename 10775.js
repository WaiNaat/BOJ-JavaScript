/*
각 비행기를 본인이 도킹할 수 있는 게이트 중
가장 번호가 높은 게이트에 도킹

단순히 구현하면 O(GP)라 너무 오래 걸림

이게 순서가 상관이 있나? ㅇㅇ
    가능 불가능 판단이 아니라 개수를 구해야 함

open(i) := 1번~i번 게이트에서 빈 게이트 중 가장 번호가 큰거
*/

// input
const inputFile = process.platform === 'linux'? '/dev/stdin' : './input';
const [G, P, ... g] = require('fs').readFileSync(inputFile).toString().trim().split('\n').map(Number);

// process
const open = new Array(G + 1);
for (let i=0; i<=G; i++)
    open[i] = i;
    
let cnt = 0;

for (let i of g)
{
    // 1번~g번 중 남아있는 게이트가 있는지 조사
    let gate = find(i);

    // 없으면 즉시 종료
    if (gate === 0) break;

    // 있으면 해당 게이트를 닫음 -> open[i]는 open[i-1]과 값이 같아짐
    open[i] = open[gate] = find(gate - 1);
    cnt++;
}

// output
console.log(cnt);

// functions
function find(i)
{
    if (open[i] == i) return i;
    else if (open[i] == 0) return 0;

    open[i] = find(open[i]);
    return open[i];
}